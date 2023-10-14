from dataclasses import dataclass
from datetime import datetime
from typing import Optional

from src.db.entities.PurchaseEntity import PurchaseEntity


@dataclass
class Purchase:
    id: int
    price: float
    name: str
    quantity: float
    payment_time: datetime
    shop: Optional[str]
    category: Optional[str]

    def total_cost(self) -> float:
        return self.price * self.quantity
    
    @staticmethod
    def from_db(entity: PurchaseEntity):
        return Purchase(id=entity.id,
                        price=entity.price,
                        name=entity.name,
                        quantity=entity.quantity,
                        payment_time=entity.payment_time,
                        shop=entity.shop,
                        category=entity.category)
