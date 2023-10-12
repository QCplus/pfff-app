from datetime import datetime
from typing import Optional
from pydantic import BaseModel

from src.models.Purchase import Purchase as DbPurchase


class PurchasePost(BaseModel):
    price: float
    name: str
    quantity: float
    payment_time: datetime
    shop: Optional[str]
    category: Optional[str]

    def to_db_model(self) -> DbPurchase:
        return DbPurchase(price=self.price,
                        name=self.name,
                        quantity=self.quantity,
                        payment_time=self.payment_time,
                        shop=self.shop,
                        category=self.category)