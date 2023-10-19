from datetime import datetime
from typing import Optional

from src.db.dto.NewPurchaseDto import NewPurchaseDto
from src.models.api.CamelModel import CamelModel


class PurchasePost(CamelModel):
    price: float
    name: str
    quantity: float
    payment_time: str
    shop: Optional[str]
    category: Optional[str]

    def to_db_model(self) -> NewPurchaseDto:
        return NewPurchaseDto(
            price=self.price,
            name=self.name,
            quantity=self.quantity,
            payment_time=datetime.fromisoformat(self.payment_time),
            shop=self.shop,
            category=self.category)
