from datetime import datetime
from dateutil.relativedelta import relativedelta

from src.repositories.PurchasesRepository import PurchasesRepository
from src.repositories.tests.RepositoryTestsBase import RepositoryTestsBase
from src.tests_helpers.helpers import create_purchase


class test_PurchasesRepository(RepositoryTestsBase):
    def setUp(self) -> None:
        super().setUp()

        self.repository = PurchasesRepository(self.db)

    def test_add(self):
        expected_purchase1 = create_purchase('FOOD1', 100, category='food')
        expected_purchase2 = create_purchase('FOOD2', 200)

        self.repository.add(expected_purchase1)
        self.repository.add(expected_purchase2)

        items = self.repository.get_by_interval(
            datetime.now() - relativedelta(days=1))
        
        self.assertEqual(2, len(items))
        self.assertEqual(expected_purchase1, items[0])
        self.assertEqual(expected_purchase2, items[1])

    def test_add_list(self):
        items = [
            create_purchase('FOOD1', 100),
            create_purchase('FOOD2', 200),
            create_purchase('BAG', 300)
        ]

        self.repository.add_list(items)

        actual_products = self.repository.get_by_interval(
            datetime.now() - relativedelta(days=1))
        
        self.assertListEqual(items, actual_products)

    def test_get_all_tags(self):
        items = [
            create_purchase('FOOD1', 100, category='food'),
            create_purchase('FOOD2', 200, category='food_extra'),
            create_purchase('BAG', 300, category='other')
        ]

        self.repository.add_list(items)
        
        tags = self.repository.get_all_tags()

        self.assertEqual(len(items), len(tags))
        for p in items:
            self.assertTrue(p.category in tags)

    def test_get_all_tags_items_with_same_tag_returns_one_tag(self):
        items = [
            create_purchase('FOOD1', 100, category='food'),
            create_purchase('FOOD2', 200, category='food')
        ]

        self.repository.add_list(items)

        tags = self.repository.get_all_tags()

        self.assertEqual(1, len(tags))
        self.assertEqual(items[0].category, tags[0])

    def test_add_insert_shop_null(self):
        self.repository.add(create_purchase('ITEM', 100, shop=None))

        items = self.repository.get_by_interval(
            datetime.now() - relativedelta(days=1))
        
        self.assertEqual(1, len(items))
