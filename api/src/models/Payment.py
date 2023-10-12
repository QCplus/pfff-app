from dataclasses import dataclass
from datetime import datetime


@dataclass
class Payment:
    payment_date: datetime
    amount: float
