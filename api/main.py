import os
import uvicorn
import datetime as dt
from typing import List
from dateutil.relativedelta import relativedelta
from calendar import monthrange
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from src.db.orm_db import get_session, Base, engine
from src.models.api.AppOptionsModel import AppOptionsModel
from src.models.api.BalanceModel import BalanceModel
from src.models.api.TokenModel import TokenModel
from src.repositories.abstract.IUsersRepository import IUsersRepository
from src.repositories.app_deps import get_users_repo
from src.routers import queries, purchases, payments, users
from src.services.BudgetCalculator import BudgetCalculator
from src.services.RepositoriesFactory import RepositoriesFactory
from src.deps import settings, password_hasher, get_repos_factory, token_generator, oauth2_scheme


Base.metadata.create_all(bind=engine)

app = FastAPI()
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

budget_calculator = BudgetCalculator()


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


@app.get('/balance/monthly')
def last_monthly_balancies(factory: RepositoriesFactory = Depends(get_repos_factory),
                           session: Session = Depends(get_session),
                           token: str = Depends(oauth2_scheme)
                           ) -> List[BalanceModel]:
    start_date = dt.datetime.today() + relativedelta(months=-5)
    start_date = dt.datetime(start_date.year, start_date.month, 1)

    purchases = factory.get_purchases_repository(
        session).get_by_interval(start_date)
    payments = factory.get_payments_repository(
        session).get_by_interval(start_date)

    return budget_calculator.calc_balance_monthly(purchases, payments)


@app.get('/balance/monthly/{year}/{month}')
def monthly_balance(year: int, month: int,
                    factory: RepositoriesFactory = Depends(get_repos_factory),
                    session: Session = Depends(get_session),
                    token: str = Depends(oauth2_scheme)
                    ) -> BalanceModel:
    start_date = dt.datetime(year, month, 1)
    end_date = dt.datetime(start_date.year, month, monthrange(
        start_date.year, month)[1], 23, 59, 59)

    purchases = factory.get_purchases_repository(
        session).get_by_interval(start_date, end_date)
    payments = factory.get_payments_repository(
        session).get_by_interval(start_date, end_date)

    return budget_calculator.calc_balance(purchases, payments)


@app.get("/")
def read_root(users_repo: IUsersRepository = Depends(get_users_repo)) -> AppOptionsModel:
    return AppOptionsModel(
        first_run=users_repo.count_users() == 0,
        plugins=[])


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=settings.port)
