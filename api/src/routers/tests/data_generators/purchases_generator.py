import random
from datetime import datetime
from typing import Optional

from src.models.api.PurchasePost import PurchasePost
from src.tests_helpers.common import random_str


def random_purchase_post(category: Optional[str] = None) -> PurchasePost:
    return PurchasePost(price=random.randrange(1, 999),
                        name=random_str(12),
                        quantity=random.randrange(1, 10),
                        payment_time=datetime.now().isoformat(),
                        shop=f'SHOP {random_str(10)}',
                        category=f'CATEGORY {random_str(
                            4)}' if category is None else category
                        )
