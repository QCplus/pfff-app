from passlib.context import CryptContext


class PasswordHasher:
    def __init__(self) -> None:
        self.__pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    def hash_password(self, password: str) -> str:
        return self.__pwd_context.hash(password)
    
    def validate_password(self, hash: str, password: str) -> bool:
        return self.__pwd_context.verify(password, hash)
