import secrets
from datetime import datetime, timedelta
from typing import Union
from jose import JWTError, jwt

from src.models.TokenData import TokenData


class TokenGenerator:
    TOKEN_PART_USERNAME = 'sub'
    TOKEN_PART_EXPIRATION = 'exp'

    def __init__(self, secret_key: str, token_expire_mins: int, algorithm: str = 'HS256') -> None:
        self.__secret_key = secret_key
        self.token_expire_mins = token_expire_mins
        self.__algorithm = algorithm

    @staticmethod
    def generate_secret_key() -> str:
        return secrets.token_urlsafe(32)

    def generate(self, username: str) -> str:
        data = {
            self.TOKEN_PART_USERNAME: username,
            self.TOKEN_PART_EXPIRATION: datetime.now() + timedelta(minutes=self.token_expire_mins)
        }

        return jwt.encode(data, self.__secret_key, algorithm=self.__algorithm)
    
    def decode(self, token: str) -> Union[TokenData, None]:
        try:
            payload = jwt.decode(token, self.__secret_key, algorithms=[self.__algorithm])

            username: Union[str, None] = payload.get(self.TOKEN_PART_USERNAME)

            return TokenData(username=username) if username else None
        except JWTError:
            return None
