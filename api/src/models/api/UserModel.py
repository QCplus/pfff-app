from src.db.entities.UserEntity import UserEntity
from src.models.api.CamelModel import CamelModel


class UserModel(CamelModel):
    id: int
    username: str

    @staticmethod
    def from_entity(e: UserEntity):
        return UserModel(id=e.id,
                         username=e.username)
    