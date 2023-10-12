from typing import List

from src.models.api.CamelModel import CamelModel


class AppOptionsModel(CamelModel):
    first_run: bool
    plugins: List[str]
