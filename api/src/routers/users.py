from fastapi import APIRouter, Depends, HTTPException, status

from src.models.api.NewUserModel import NewUserModel
from src.repositories.abstract.IUsersRepository import IUsersRepository
from src.repositories.app_deps import get_users_repo
from src.deps import password_hasher


router = APIRouter(
    prefix='/users'
)


@router.post('')
def register(user: NewUserModel,
             users_repo: IUsersRepository = Depends(get_users_repo)
             ) -> int:
    if users_repo.count_users() == 0:
        user.password = password_hasher.hash_password(user.password)
        return users_repo.add(user)
    raise HTTPException(status.HTTP_400_BAD_REQUEST,
                        'Multiple user registration not allowed')
