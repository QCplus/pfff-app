import datetime as dt
import pandas as pd
from typing import List, Optional, TypeVar, Generic

T = TypeVar('T')


class ITransactionsRepository(Generic[T]):
    def get_by_interval(self, start_date: dt.datetime, end_date: Optional[dt.datetime] = None) -> List[T]:
        raise NotImplementedError()

    def add(self, entity: T) -> None:
        raise NotImplementedError()
    
    def add_df(self, df: pd.DataFrame) -> None:
        raise NotImplementedError()

    def add_list(self, entities: List[T]) -> None:
        raise NotImplementedError()

    def get_all_tags(self) -> List[str]:
        raise NotImplementedError()
