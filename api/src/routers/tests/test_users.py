from fastapi import Depends, Request
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
import unittest

from main import app
from src.db.orm_db import Base, get_session
from src.models.api.NewUserModel import NewUserModel
from src.repositories.abstract.IUsersRepository import IUsersRepository
from src.repositories.app_deps import get_users_repo
from src.routers.tests.test_db import engine, override_get_db
from src.deps import oauth2_scheme


class TestUsers(unittest.TestCase):
    def setUp(self) -> None:
        Base.metadata.create_all(bind=engine)

        app.dependency_overrides[get_session] = override_get_db
        def oauth(request: Request):
            return "456789"
        app.dependency_overrides[oauth2_scheme] = oauth

    def tearDown(self) -> None:
        app.dependency_overrides = {}

        Base.metadata.drop_all(bind=engine)

    @classmethod
    def setUpClass(cls):
        cls.__client = TestClient(app)

    def test_register_returns_user_id(self):
        new_user = NewUserModel(username='abc',
                                password='123')

        response = self.__client.post('/users', json=new_user.__dict__)
        
        self.assertEqual(200, response.status_code)
        
        assert response.content.decode().isdigit()

    def test_register_error_on_second_registration(self):
        self.__client.post('/users', json=NewUserModel(username='abc', password='123').__dict__)
        response = self.__client.post('/users', json=NewUserModel(username='zxc', password='654').__dict__)

        self.assertEqual(400, response.status_code)

    def test_register_hashes_password(self):
        new_user = NewUserModel(username='abc',
                                password='123')
        def get_mocked_repo(db: Session = Depends(get_session)):
            mocked_repo = IUsersRepository()
            mocked_repo.add = lambda user: 0 if new_user.password == user.password else 1    # type: ignore
            mocked_repo.count_users = lambda: 0
            return mocked_repo
        app.dependency_overrides[get_users_repo] = get_mocked_repo

        response = self.__client.post('/users', json=new_user.__dict__)

        assert response.content.decode() == '1'
