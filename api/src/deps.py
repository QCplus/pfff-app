import os
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from src.models.AppSettings import AppSettings
from src.repositories.abstract.IUsersRepository import IUsersRepository
from src.repositories.app_deps import get_users_repo
from src.services.PasswordHasher import PasswordHasher
from src.services.RepositoriesFactory import RepositoriesFactory
from src.services.TokenGenerator import TokenGenerator


def get_repos_factory():
    return RepositoriesFactory()


settings = AppSettings(os.path.join('.', 'data', 'appsettings.json'))
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='login')
password_hasher = PasswordHasher()
token_generator = TokenGenerator(settings.secret_key, settings.token_lifetime_mins)


async def get_current_user(token: str = Depends(oauth2_scheme),
                           users_repo: IUsersRepository = Depends(get_users_repo)
                           ):
    http_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                   detail='Invalid credentials',
                                   headers={'WWW-Authenticate': 'Bearer'})
    token_data = token_generator.decode(token)
    if token_data is None:
        raise http_exception
    
    user = users_repo.get_by_name(token_data.username)
    if user is None:
        http_exception.detail = 'User not found'
        raise http_exception
    
    return user
