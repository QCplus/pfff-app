import unittest
from fastapi import Request
from fastapi.testclient import TestClient

from main import app
from src.db.orm_db import Base, get_session
from src.models.api.CamelModel import CamelModel
from src.routers.tests.test_db import engine, override_get_db
from src.deps import oauth2_scheme


class RouterTestCase(unittest.TestCase):
    def __init__(self, methodName='runTest', base_url='') -> None:
        self._base_url = base_url

        super().__init__(methodName)

    def setUp(self) -> None:
        Base.metadata.create_all(bind=engine)

        app.dependency_overrides[get_session] = override_get_db

        def oauth(request: Request):
            return "456789"
        app.dependency_overrides[oauth2_scheme] = oauth

    @classmethod
    def setUpClass(cls):
        cls._client = TestClient(app)

    def assert_creation(self, new_model: CamelModel):
        expected = new_model.as_dict()
        result = self._client.post(self._base_url, json=expected)
        self.assertEqual(200, result.status_code)

        new_entity_id = result.content.decode()
        result = self._client.get(f'{self._base_url}/{new_entity_id}')
        actual: dict = result.json()

        self.assertIsNotNone(actual)
        for key in expected:
            if key in actual:
                self.assertEqual(expected[key], actual[key],
                                 f'Fields "{key}" are not equal')
