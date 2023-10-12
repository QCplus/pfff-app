from typing import Dict, List

from src.models.Payment import Payment
from src.models.Purchase import Purchase
from src.models.api.BalanceModel import BalanceModel


class BudgetCalculator:
    def calc_balance(self, purchases: List[Purchase], payments: List[Payment]) -> BalanceModel:
        spent_sum = sum([p.price * p.quantity for p in purchases])
        received_sum = sum([p.amount for p in payments])

        return BalanceModel(change=received_sum - spent_sum, interval_value=None)
    
    def calc_balance_monthly(self, purchases: List[Purchase], payments: List[Payment]) -> List[BalanceModel]:
        changes: Dict[int, float] = {}

        def add_change(month: int, change: float):
            if month in changes:
                changes[month] += change
            else:
                changes[month] = change

        for p in purchases:
            add_change(p.payment_time.month, -p.total_cost())
        for p in payments:
            add_change(p.payment_date.month, p.amount)

        return [BalanceModel(change=changes[k], interval_value=k) for k in changes]
