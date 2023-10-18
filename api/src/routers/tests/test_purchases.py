import random
from datetime import datetime
from typing import Optional

from src.models.api.PurchaseModel import PurchaseModel
from src.models.api.PurchasePost import PurchasePost
from src.routers.tests.RouterTestsBase import RouterTestsBase
from src.tests_helpers.common import random_str
from src.tests_helpers.purchase import random_purchase_model


class TestPurchases(RouterTestsBase):
    def _random_purchase_post(self, category: Optional[str] = None) -> PurchasePost:
        return PurchasePost(price=random.randrange(1, 999),
                            name=random_str(12),
                            quantity=random.randrange(1, 10),
                            payment_time=datetime.now().isoformat(),
                            shop=f'SHOP {random_str(10)}',
                            category=f'CATEGORY {random_str(4)}' if category is None else category
                            )
    
    def _add_purchase(self, category: Optional[str] = None) -> PurchaseModel:
        purchase = self._random_purchase_post(category=category)
        result = self._client.post('/purchases', json=purchase.__dict__)

        result = self._client.get(f'/purchases/{result.content.decode()}')
        
        return PurchaseModel(**result.json())
    

    def assert_models(self, expected: PurchaseModel, actual: dict):
        self.assertEquals(expected.id, actual['id'])
        self.assertEquals(expected.price, actual['price'])
        self.assertEquals(expected.name, actual['name'])
        self.assertEquals(expected.quantity, actual['quantity'])
        self.assertEquals(expected.payment_time, actual['payment_time'])
        self.assertEquals(expected.shop, actual['shop'])
        self.assertEquals(expected.category, actual['category'])        
        

    def test_add_inserts_successfully(self):
        expected = PurchasePost(price=100,
                                name='PRODUCT',
                                quantity=2,
                                payment_time='2023-10-14T15:17:04',
                                shop='SHOP1',
                                category='CATEGORY1')
        result = self._client.post('/purchases', json=expected.__dict__)

        self.assertEquals(200, result.status_code)

        result = self._client.get(f'/purchases/{result.content.decode()}')
        actual: dict = result.json()

        self.assertIsNotNone(actual)
        self.assertEquals(expected.price, actual['price'])
        self.assertEquals(expected.name, actual['name'])
        self.assertEquals(expected.quantity, actual['quantity'])
        self.assertEquals(expected.payment_time, actual['payment_time'])
        self.assertEquals(expected.shop, actual['shop'])
        self.assertEquals(expected.category, actual['category'])


    def test_update_saves_successfully(self):
        expected = self._add_purchase()
        expected = random_purchase_model(expected.id)

        result = self._client.put('/purchases', json=expected.__dict__)
        self.assertEquals(200, result.status_code)
        result = self._client.get(f'/purchases/{expected.id}')

        actual = result.json()
        self.assertIsNotNone(actual)
        self.assert_models(expected, actual)

    
    def test_get_all_tags_returns_not_empty_list(self):
        purchase = self._add_purchase()

        result = self._client.get('/purchases/tags')

        self.assertEquals(200, result.status_code)
        tags = result.json()
        self.assertEquals(1, len(tags))
        self.assertEquals(purchase.category, tags[0])
