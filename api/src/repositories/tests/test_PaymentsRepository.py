from datetime import datetime
from dateutil.relativedelta import relativedelta

from src.models.Payment import Payment
from src.repositories.PaymentsRepository import PaymentsRepository
from src.repositories.tests.RepositoryTestsBase import RepositoryTestsBase


class test_PaymentsRepository(RepositoryTestsBase):
    def setUp(self) -> None:
        super().setUp()

        self.repository = PaymentsRepository(self.db)

    def test_add(self) -> None:
        expected_payment = Payment(payment_date=datetime.now(), amount=100)

        self.repository.add(expected_payment)
        
        actual_payments = self.repository.get_by_interval(datetime.now() - relativedelta(days=1))

        self.assertEqual(expected_payment, actual_payments[0])

    def test_add_list(self) -> None:
        expected_payments = [
            Payment(payment_date=datetime.now(), amount=100),
            Payment(payment_date=datetime.now(), amount=200)
        ]

        self.repository.add_list(expected_payments)

        actual_payments = self.repository.get_by_interval(datetime.now() - relativedelta(days=1))

        self.assertEqual(expected_payments, actual_payments)
