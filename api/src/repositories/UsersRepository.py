from sqlalchemy.orm import Session

from src.db.entities.UserEntity import UserEntity
from src.models.api.NewUserModel import NewUserModel
from src.repositories.abstract.IUsersRepository import IUsersRepository


class UsersRepository(IUsersRepository):
    def __init__(self, db: Session) -> None:
        self.__db = db

    def add(self, user: NewUserModel) -> int:
        user = UserEntity(username=user.username,
                          password_hash=user.password)

        self.__db.add(user)
        self.__db.commit()

        return user.id

    def get_by_id(self, id: int) -> UserEntity:
        return self.__db.query(UserEntity).where(UserEntity.id == id).first()
    
    def get_by_name(self, username: str) -> UserEntity:
        return self.__db.query(UserEntity).where(UserEntity.username == username).first()
    
    def count_users(self) -> int:
        return self.__db.query(UserEntity).count()
