from typing import List
from pydantic import BaseModel


class QueryResultTable(BaseModel):
    columns: List[str]
    rows: List[List[str]]
