from fastapi import Request
from fastapi.testclient import TestClient
import unittest
import random
import string

from main import app
from src.db.orm_db import Base, get_session
from src.routers.tests.test_db import engine, override_get_db
from src.deps import oauth2_scheme


class RouterTestsBase(unittest.TestCase):
    def setUp(self) -> None:
        Base.metadata.create_all(bind=engine)

        app.dependency_overrides[get_session] = override_get_db

        def oauth(request: Request):
            return "456789"
        app.dependency_overrides[oauth2_scheme] = oauth

    @classmethod
    def setUpClass(cls):
        cls._client = TestClient(app)
