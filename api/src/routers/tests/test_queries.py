from src.enums.CustomQueryType import CustomQueryType
from src.models.api.queries.NewCustomQueryModel import NewCustomQueryModel
from src.routers.tests.BaseRouterTests import BaseRouterTests
from src.routers.tests.RouterTestCase import RouterTestCase


class test_queries(RouterTestCase, BaseRouterTests):
    def __init__(self, methodName='runTest') -> None:
        super().__init__(methodName, '/queries')

    def test_add_query_adds_successfully(self):
        expected = NewCustomQueryModel(
            title='TITLE1', q='SELECT * FROM purchase', view_type=CustomQueryType.HISTOGRAM.value)

        self.assert_creation(expected)
