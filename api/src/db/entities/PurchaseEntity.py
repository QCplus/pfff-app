import datetime as dt
from sqlalchemy.orm import Mapped, mapped_column

from src.db.orm_db import Base


class PurchaseEntity(Base):
    __tablename__ = "purchase"

    id: Mapped[int] = mapped_column(primary_key=True)
    price: Mapped[float]
    name: Mapped[str]
    quantity: Mapped[float]
    payment_time: Mapped[dt.datetime]
    shop: Mapped[str] = mapped_column(nullable=True)
    category: Mapped[str] = mapped_column(nullable=True)
