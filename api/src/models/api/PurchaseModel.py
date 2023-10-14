from datetime import datetime
from dataclasses import dataclass
from typing import Optional

from src.models.Purchase import Purchase


@dataclass
class PurchaseModel:
    id: int
    price: float
    name: str
    quantity: float
    payment_time: str
    shop: Optional[str]
    category: Optional[str]

    @staticmethod
    def from_db(p: Purchase):
        return PurchaseModel(id=p.id,
                             price=p.price,
                             name=p.name,
                             quantity=p.quantity,
                             payment_time=p.payment_time.isoformat(),
                             shop=p.shop,
                             category=p.category)
    
    def to_dto(self) -> Purchase:
        return Purchase(id=self.id,
                        price=self.price,
                        name=self.name,
                        quantity=self.quantity,
                        payment_time=datetime.fromisoformat(self.payment_time),
                        shop=self.shop,
                        category=self.category)
