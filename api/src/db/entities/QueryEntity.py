from sqlalchemy.orm import Mapped, mapped_column

from src.db.orm_db import Base


class QueryEntity(Base):
    __tablename__ = "query"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str]
    q: Mapped[str]
    view_type: Mapped[int] = mapped_column(server_default='1')
