from datetime import datetime, timedelta
from typing import List, Optional
from dateutil.relativedelta import relativedelta

from src.db.dto.NewPurchaseDto import NewPurchaseDto
from src.models.Purchase import Purchase
from src.repositories.PurchasesRepository import PurchasesRepository
from src.repositories.tests.RepositoryTestsBase import RepositoryTestsBase
from src.tests_helpers.purchase import random_purchase


class test_PurchasesRepository(RepositoryTestsBase):
    @staticmethod
    def new_purchase(name: str,
                     price: float,
                     quantity: int = 1,
                     shop: Optional[str] = 'SHOP',
                     category: Optional[str] = '',
                     payment_time: Optional[datetime] = None
                     ) -> NewPurchaseDto:
        if payment_time is None:
            payment_time = datetime.now()
            payment_time -= timedelta(microseconds=payment_time.microsecond)

        return NewPurchaseDto(
            quantity=quantity,
            category=category,
            payment_time=payment_time,
            price=price,
            name=name,
            shop=shop)

    def setUp(self) -> None:
        super().setUp()

        self.repository = PurchasesRepository(self.db)

    def assertPurchase(self, expected: NewPurchaseDto, actual: Purchase) -> None:
        self.assertEqual(expected.category, actual.category)
        self.assertEqual(expected.name, actual.name)
        self.assertEqual(expected.payment_time, actual.payment_time)
        self.assertEqual(expected.price, actual.price)
        self.assertEqual(expected.shop, actual.shop)
        self.assertEqual(expected.quantity, actual.quantity)

    def assertPurchases(self, expected: List[NewPurchaseDto], actual: List[Purchase]) -> None:
        self.assertEqual(len(expected), len(actual))
        for i in range(len(expected)):
            self.assertPurchase(expected[i], actual[i])

    def test_add(self):
        expected_purchase1 = self.new_purchase('FOOD1', 100, category='food')
        expected_purchase2 = self.new_purchase('FOOD2', 200)

        self.repository.add(expected_purchase1)
        self.repository.add(expected_purchase2)

        items = self.repository.get_by_interval(
            datetime.now() - relativedelta(days=1))

        self.assertPurchases([expected_purchase1, expected_purchase2], items)

    def test_add_list(self):
        items = [
            self.new_purchase('FOOD1', 100),
            self.new_purchase('FOOD2', 200),
            self.new_purchase('BAG', 300)
        ]

        self.repository.add_list(items)

        actual_products = self.repository.get_by_interval(
            datetime.now() - relativedelta(days=1))

        self.assertPurchases(items, actual_products)

    def test_get_all_tags(self):
        items = [
            self.new_purchase('FOOD1', 100, category='food'),
            self.new_purchase('FOOD2', 200, category='food_extra'),
            self.new_purchase('BAG', 300, category='other')
        ]

        self.repository.add_list(items)

        tags = self.repository.get_all_tags()

        self.assertEqual(len(items), len(tags))
        for p in items:
            self.assertTrue(p.category in tags)

    def test_get_all_tags_items_with_same_tag_returns_one_tag(self):
        items = [
            self.new_purchase('FOOD1', 100, category='food'),
            self.new_purchase('FOOD2', 200, category='food')
        ]

        self.repository.add_list(items)

        tags = self.repository.get_all_tags()

        self.assertEqual(1, len(tags))
        self.assertEqual(items[0].category, tags[0])

    def test_add_insert_shop_null(self):
        self.repository.add(self.new_purchase('ITEM', 100, shop=None))

        items = self.repository.get_by_interval(
            datetime.now() - relativedelta(days=1))

        self.assertEqual(1, len(items))

    def test_update(self):
        id = self.repository.add(self.new_purchase('ITEM', 100))
        expected = random_purchase(id)

        self.repository.update(expected)
        actual = self.repository.get_by_id(id)

        self.assertEqual(expected, actual)

    def test_get_all_tags_no_empty_tags(self):
        purchase = self.new_purchase('ITEM', 100, category='CATEGORY')
        self.repository.add(purchase)
        self.repository.add(self.new_purchase('ITEM', 100, category=''))
        self.repository.add(self.new_purchase('ITEM', 100, category=None))

        tags = self.repository.get_all_tags()

        self.assertEqual(1, len(tags))
        self.assertEqual(purchase.category, tags[0])
