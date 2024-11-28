import random
from datetime import datetime
from typing import Optional

from src.models.api.PurchaseModel import PurchaseModel
from src.models.api.PurchasePost import PurchasePost
from src.routers.tests.RouterTestCase import RouterTestCase
from src.tests_helpers.common import random_str
from src.tests_helpers.purchase import random_purchase_model


class TestPurchases(RouterTestCase):
    def __init__(self, methodName='runTest') -> None:
        super().__init__(methodName=methodName, base_url='')

    def _random_purchase_post(self, category: Optional[str] = None) -> PurchasePost:
        return PurchasePost(price=random.randrange(1, 999),
                            name=random_str(12),
                            quantity=random.randrange(1, 10),
                            payment_time=datetime.now().isoformat(),
                            shop=f'SHOP {random_str(10)}',
                            category=f'CATEGORY {random_str(
                                4)}' if category is None else category
                            )

    def _add_purchase(self, category: Optional[str] = None) -> PurchaseModel:
        purchase = self._random_purchase_post(category=category)
        result = self._client.post('/purchases', json=purchase.as_dict())

        result = self._client.get(f'/purchases/{result.content.decode()}')

        return PurchaseModel(**result.json())

    def assert_models(self, expected: PurchaseModel, actual: dict):
        self.assertEqual(expected.id, actual['id'])
        self.assertEqual(expected.price, actual['price'])
        self.assertEqual(expected.name, actual['name'])
        self.assertEqual(expected.quantity, actual['quantity'])
        self.assertEqual(expected.payment_time, actual['paymentTime'])
        self.assertEqual(expected.shop, actual['shop'])
        self.assertEqual(expected.category, actual['category'])

    def test_add_inserts_successfully(self):
        expected = PurchasePost(price=100,
                                name='PRODUCT',
                                quantity=2,
                                payment_time='2023-10-14T15:17:04',
                                shop='SHOP1',
                                category='CATEGORY1')
        result = self._client.post('/purchases', json=expected.as_dict())

        self.assertEqual(200, result.status_code)

        result = self._client.get(f'/purchases/{result.content.decode()}')
        actual: dict = result.json()

        self.assertIsNotNone(actual)
        self.assertEqual(expected.price, actual['price'])
        self.assertEqual(expected.name, actual['name'])
        self.assertEqual(expected.quantity, actual['quantity'])
        self.assertEqual(expected.payment_time, actual['paymentTime'])
        self.assertEqual(expected.shop, actual['shop'])
        self.assertEqual(expected.category, actual['category'])

    def test_update_saves_successfully(self):
        expected = self._add_purchase()
        expected = random_purchase_model(expected.id)

        result = self._client.put('/purchases', json=expected.as_dict())
        self.assertEqual(200, result.status_code)
        result = self._client.get(f'/purchases/{expected.id}')

        actual = result.json()
        self.assertIsNotNone(actual)
        self.assert_models(expected, actual)

        result = self._client.get(f'/purchases/{expected.id + 1}')
        self.assertEqual(204, result.status_code)

    def test_get_by_id_returns_no_content_status(self):
        result = self._client.get('/purchases/9999999')

        self.assertEqual(204, result.status_code)

    def test_get_all_tags_returns_not_empty_list(self):
        purchase = self._add_purchase()

        result = self._client.get('/purchases/tags')

        self.assertEqual(200, result.status_code)
        tags = result.json()
        self.assertEqual(1, len(tags))
        self.assertEqual(purchase.category, tags[0])
