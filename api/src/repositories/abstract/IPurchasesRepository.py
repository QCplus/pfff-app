from abc import ABC
from typing import List

from src.db.dto.NewPurchaseDto import NewPurchaseDto
from src.models.Purchase import Purchase
from src.repositories.abstract.ITransactionsRepository import ITransactionsRepository


class IPurchasesRepository(ITransactionsRepository[Purchase], ABC):
    def add(self, entity: NewPurchaseDto) -> int:
        raise NotImplementedError()
    
    def add_list(self, entities: List[NewPurchaseDto]) -> None:
        raise NotImplementedError()
