from unittest import TestCase
from datetime import datetime
from src.models.api.BalanceModel import BalanceModel

from src.services.BudgetCalculator import BudgetCalculator
from src.models.Purchase import Purchase
from src.models.Payment import Payment
from src.tests_helpers.helpers import create_purchase


class TestBudgetCalculator(TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.calculator = BudgetCalculator()

    def test_calc_balance(self):
        purchases = [
            Purchase(quantity=1,
                     category='',
                     payment_time=datetime.now(),
                     price=1000,
                     name='TEST',
                     shop='SHOP'),
            Purchase(quantity=1,
                     category='',
                     payment_time=datetime.now(),
                     price=2000,
                     name='TEST',
                     shop='SHOP'),
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
            Purchase(quantity=1,
                     category='',
                     payment_time=datetime.now(),
                     price=1000,
                     name='TEST',
                     shop='SHOP'),
            Purchase(quantity=0.5,
                     category='',
                     payment_time=datetime.now(),
                     price=2000,
                     name='TEST',
                     shop='SHOP'),
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
            create_purchase(name='ITEM1',
                            price=100,
                            payment_time=datetime(2022, 10, 1)),
            create_purchase(name='ITEM2',
                            price=50,
                            payment_time=datetime(2022, 10, 5)),
            
            create_purchase(name='ITEM1',
                            price=100,
                            payment_time=datetime(2022, 11, 4)),
            
            create_purchase(name='ITEM3',
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
