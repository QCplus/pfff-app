from dataclasses import dataclass
from datetime import datetime
from typing import Optional

from src.db.entities.PurchaseEntity import PurchaseEntity


@dataclass
class NewPurchaseDto:
    price: float
    name: str
    quantity: float
    payment_time: datetime
    shop: Optional[str]
    category: Optional[str]

    def to_entity(self) -> PurchaseEntity:
        return PurchaseEntity(price=self.price,
                              name=self.name,
                              quantity=self.quantity,
                              payment_time=self.payment_time,
                              shop=self.shop,
                              category=self.category)
