from dataclasses import dataclass
from datetime import datetime
from typing import Optional

from src.db.entities.PurchaseEntity import PurchaseEntity


@dataclass
class Purchase:
    price: float
    name: str
    quantity: float
    payment_time: datetime
    shop: Optional[str]
    category: str

    def total_cost(self) -> float:
        return self.price * self.quantity
    
    @staticmethod
    def from_db(entity: PurchaseEntity):
        return Purchase(price=entity.price,
                        name=entity.name,
                        quantity=entity.quantity,
                        payment_time=entity.payment_time,
                        shop=entity.shop,
                        category=entity.category)
    
    def for_db(self):
        return PurchaseEntity(price=self.price,
                              name=self.name,
                              quantity=self.quantity,
                              payment_time=self.payment_time,
                              shop=self.shop,
                              category=self.category)
