from abc import ABC

from src.db.entities.UserEntity import UserEntity
from src.models.api.NewUserModel import NewUserModel
from src.models.api.UserModel import UserModel


class IUsersRepository(ABC):
    def add(self, user: NewUserModel) -> int:
        raise NotImplementedError()

    def get_by_id(self, id: int) -> UserEntity:
        raise NotImplementedError()
    
    def get_by_name(self, username: str) -> UserEntity:
        raise NotImplementedError()
    
    def count_users(self) -> int:
        raise NotImplementedError()
