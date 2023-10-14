import random

from src.models.Purchase import Purchase
from src.models.api.PurchaseModel import PurchaseModel
from src.tests_helpers.common import random_str, random_datetime


def random_purchase(id: int) -> Purchase:
    return Purchase(id=id,
                    price=random.randrange(1, 10000),
                    name=random_str(12),
                    quantity=random.randrange(1, 10),
                    payment_time=random_datetime(),
                    shop=random_str(8),
                    category=random_str(4)
                    )


def random_purchase_model(id: int) -> PurchaseModel:
    return PurchaseModel(id=id,
                         price=random.randrange(1, 10000),
                         name=random_str(12),
                         quantity=random.randrange(1, 10),
                         payment_time=random_datetime().isoformat(),
                         shop=random_str(8),
                         category=random_str(4)
                         )
