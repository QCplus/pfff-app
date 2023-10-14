import random
from calendar import monthrange
from datetime import datetime
import string


def random_str(len: int) -> str:
    return ''.join(random.choices(string.ascii_uppercase, k=len))


def random_datetime(min_year=2000) -> datetime:
    year = random.randrange(min_year, datetime.today().year)
    month = random.randrange(1, 12)
    day = monthrange(year, month)[-1]

    return datetime(
        year=year,
        month=month,
        day=day
    )
