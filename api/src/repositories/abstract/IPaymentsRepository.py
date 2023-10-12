from abc import ABC
from src.models.Payment import Payment
from src.repositories.abstract.ITransactionsRepository import ITransactionsRepository


class IPaymentsRepository(ITransactionsRepository[Payment], ABC):
    pass
