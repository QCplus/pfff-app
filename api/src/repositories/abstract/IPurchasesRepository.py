from abc import ABC
from src.models.Purchase import Purchase

from src.repositories.abstract.ITransactionsRepository import ITransactionsRepository


class IPurchasesRepository(ITransactionsRepository[Purchase], ABC):
    pass
