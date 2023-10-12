import unittest
from abc import ABC
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from src.repositories.tests.db_test import SQLALCHEMY_DATABASE_URL
from src.db.orm_db import Base


class RepositoryTestsBase(unittest.TestCase, ABC):
    def setUp(self) -> None:
        self.engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)
        Base.metadata.create_all(bind=self.engine)
        self.db = Session(self.engine)

        # apply_db_migrations(self.engine.connect())

    def tearDown(self) -> None:
        self.db.close()

        Base.metadata.drop_all(bind=self.engine)
        Base.metadata.create_all(bind=self.engine)
