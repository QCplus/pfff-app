import os
from contextlib import asynccontextmanager
import datetime as dt
import uvicorn
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from alembic import command
from alembic.config import Config

from src.models.api.AppOptionsModel import AppOptionsModel
from src.models.api.TokenModel import TokenModel
from src.repositories.abstract.IUsersRepository import IUsersRepository
from src.repositories.app_deps import get_users_repo
from src.routers import queries, purchases, payments, users
from src.deps import settings, password_hasher, token_generator


@asynccontextmanager
async def lifespan(app: FastAPI):
    alembic_cfg = Config('alembic.ini')

    command.upgrade(alembic_cfg, revision='head')
    yield

app = FastAPI(lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("REACT_APP_URL", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(queries.router)
app.include_router(purchases.router)
app.include_router(payments.router)
app.include_router(users.router)


@app.post('/login', response_model=TokenModel)
async def login(form_data: OAuth2PasswordRequestForm = Depends(),
                users_repo: IUsersRepository = Depends(get_users_repo)
                ) -> TokenModel:
    user = users_repo.get_by_name(form_data.username)
    if not user:
        raise HTTPException(status_code=400, detail='Incorrect username')
    if not password_hasher.validate_password(user.password_hash, form_data.password):
        raise HTTPException(status_code=400, detail='Invalid password')

    token = token_generator.generate(user.username)

    return TokenModel(access_token=token,
                      token_type='bearer',
                      expire_at=dt.datetime.now() + dt.timedelta(minutes=token_generator.token_expire_mins))


@app.get("/")
def read_root(users_repo: IUsersRepository = Depends(get_users_repo)) -> AppOptionsModel:
    return AppOptionsModel(
        first_run=users_repo.count_users() == 0,
        plugins=[])


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=settings.port)
