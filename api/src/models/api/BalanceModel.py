from typing import Optional

from src.models.api.CamelModel import CamelModel


class BalanceModel(CamelModel):
    change: float
    interval_value: Optional[int]
    # interval: str # month, year, quartet