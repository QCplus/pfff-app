from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from src.db.orm_db import Base


SQLALCHEMY_DATABASE_URL = "sqlite+pysqlite:///"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, echo=True
)
TestingSessionLocal = sessionmaker(bind=engine)


Base.metadata.create_all(bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()  # type: ignore
