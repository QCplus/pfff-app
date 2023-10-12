import datetime as dt
from sqlalchemy.orm import Mapped, mapped_column

from src.db.orm_db import Base


class PaymentEntity(Base):
    __tablename__ = 'payment'

    id: Mapped[int] = mapped_column(primary_key=True)
    payment_time: Mapped[dt.datetime]
    amount: Mapped[float]
