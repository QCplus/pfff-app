from datetime import datetime, timedelta
from typing import Optional

from src.models.Purchase import Purchase


def create_purchase(name: str, price: float, quantity: int = 1, shop: Optional[str] = 'SHOP', category: str = '', payment_time: Optional[datetime] = None) -> Purchase:
    if payment_time is None:
        payment_time = datetime.now()
        payment_time -= timedelta(microseconds=payment_time.microsecond)

    return Purchase(quantity=quantity,
                    category=category,
                    payment_time=payment_time,
                    price=price,
                    name=name,
                    shop=shop)