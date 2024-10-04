from typing import List, Optional
from datetime import datetime

from src.models.api.PurchaseModel import PurchaseModel
from src.models.api.PurchasePost import PurchasePost
from src.routers.tests.RouterTestsBase import RouterTestsBase
from src.routers.tests.data_generators.purchases_generator import random_purchase_post
from src.tests_helpers.purchase import random_purchase_model


class TestPurchases(RouterTestsBase):
    def _add_purchase(self, category: Optional[str] = None) -> PurchaseModel:
        purchase = random_purchase_post(category=category)
        result = self._client.post('/purchases', json=purchase.as_dict())

        result = self._client.get(f'/purchases/{result.content.decode()}')

        return PurchaseModel(**result.json())

    def _assert_models(self, expected: PurchaseModel, actual: dict):
        self.assertEqual(expected.id, actual['id'])
        self.assertEqual(expected.price, actual['price'])
        self.assertEqual(expected.name, actual['name'])
        self.assertEqual(expected.quantity, actual['quantity'])
        self.assertEqual(expected.payment_time, actual['paymentTime'])
        self.assertEqual(expected.shop, actual['shop'])
        self.assertEqual(expected.category, actual['category'])

    def _get_filter_params(self, start: datetime, end: datetime) -> List:
        return [('start', start.isoformat()), ('end', end.isoformat())]

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
        self._assert_models(expected, actual)

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

    def test_get_by_interval_returns_ordered_by_desc(self):
        expected = [self._add_purchase(), self._add_purchase(),
                    self._add_purchase()][::-1]

        actual = self._client.get('purchases', params=self._get_filter_params(
            datetime.min, datetime.max)).json()

        self.assertEqual(len(expected), len(actual),
                         'Length of the expected list is not equal to actual')

        for (e, a) in zip(expected, actual):
            self._assert_models(e, a)

    def test_get_by_interval_not_returns_old_rows(self):
        expected = self._add_purchase()

        old_purchase = random_purchase_post()
        old_purchase.payment_time = datetime.min.isoformat()
        self._client.post('/purchases', json=old_purchase.as_dict())

        actual = self._client.get('purchases', params=self._get_filter_params(
            datetime.fromisoformat(expected.payment_time), datetime.max)).json()

        self.assertEqual(1, len(actual),
                         'Length of the expected list is not equal to actual')
        self._assert_models(expected, actual[0])
