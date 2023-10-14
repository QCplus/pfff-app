from unittest import TestCase
from datetime import datetime

from src.models.api.BalanceModel import BalanceModel
from src.services.BudgetCalculator import BudgetCalculator
from src.models.Purchase import Purchase
from src.models.Payment import Payment


class TestBudgetCalculator(TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.calculator = BudgetCalculator()

    @staticmethod
    def create_purchase(id: int, price: float, quantity: float = 1, payment_time: datetime = datetime.now(), name: str = 'ITEM') -> Purchase:
        return Purchase(id=id,
                        price=price,
                        name=name,
                        quantity=quantity,
                        payment_time=payment_time,
                        shop='SHOP',
                        category=None
                        )

    def test_calc_balance(self):
        purchases = [
            self.create_purchase(id=1, price=1000, quantity=1),
            self.create_purchase(id=2, price=2000, quantity=1),
        ]

        payments = [
            Payment(payment_date=datetime.now(),
                    amount=1000)
        ]

        self.assertEqual(
            -2000,
            self.calculator.calc_balance(purchases, payments).change
        )

    def test_calc_balance_if_quantity_not_one(self):
        purchases = [
            self.create_purchase(id=1, price=1000, quantity=1),
            self.create_purchase(id=1, price=2000, quantity=0.5),
        ]

        payments = [
            Payment(payment_date=datetime.now(),
                    amount=1000)
        ]

        self.assertEqual(
            -1000,
            self.calculator.calc_balance(purchases, payments).change
        )

    def test_calc_balance_monthly(self):
        purchases = [
            self.create_purchase(id=1,
                                 name='ITEM1',
                                 price=100,
                                 payment_time=datetime(2022, 10, 1)),
            self.create_purchase(id=2,
                                 name='ITEM2',
                                 price=50,
                                 payment_time=datetime(2022, 10, 5)),
            self.create_purchase(id=3,
                                 name='ITEM1',
                                 price=100,
                                 payment_time=datetime(2022, 11, 4)),
            self.create_purchase(id=4,
                                 name='ITEM3',
                                 price=400,
                                 payment_time=datetime(2022, 12, 3))
        ]

        payments = [
            Payment(payment_date=datetime(2022, 10, 4),
                    amount=200)
        ]

        self.assertListEqual(
            [
                BalanceModel(change=50, interval_value=10),
                BalanceModel(change=-100, interval_value=11),
                BalanceModel(change=-400, interval_value=12)
            ],
            self.calculator.calc_balance_monthly(purchases, payments)
        )
