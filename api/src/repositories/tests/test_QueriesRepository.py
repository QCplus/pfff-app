from src.db.entities.QueryEntity import QueryEntity
from src.models.api.CustomQueryModel import CustomQueryModel
from src.repositories.QueriesRepository import QueriesRepository
from src.repositories.tests.RepositoryTestsBase import RepositoryTestsBase


class test_QueriesRepository(RepositoryTestsBase):
    def setUp(self) -> None:
        super().setUp()

        self.repository = QueriesRepository(self.db)

    def test_add(self):
        title = 'TEST Q'
        q = 'SELECT * FROM payment'
        query_id = self.repository.add(title, q)

        actual_query = self.repository.get(query_id)

        self.assertIsNotNone(actual_query)
        self.assertEqual(title, actual_query.title) # type: ignore
        self.assertEqual(q, actual_query.q) # type: ignore

    def test_update(self):
        expected_query = CustomQueryModel(title='UPDATE TEST',
                                          q='SELECT * FROM query')
        expected_query.id = self.repository.add(expected_query.title, expected_query.q)

        expected_query.title = 'NEW UPDATE TEST TITLE'
        expected_query.q = 'SELECT * FROM payment'
        self.repository.update(expected_query)

        actual_query = self.repository.get(expected_query.id)

        self.assertEqual(expected_query, actual_query)

    def test_get_on_invalid_id_returns_none(self):
        q = self.repository.get(7666)

        self.assertIsNone(q)

    def test_get_all(self):
        q1 = CustomQueryModel(title='GET TEST1',
                              q='SELECT * FROM query')
        q1.id = self.repository.add(q1.title, q1.q)

        q2 = CustomQueryModel(title='GET TEST2',
                              q='SELECT * FROM query')
        q2.id = self.repository.add(q2.title, q2.q)

        self.assertListEqual([q1, q2], self.repository.get_all_queries())

    def test_delete(self):
        query_id = self.repository.add('TEST Q', 'SELECT * FROM query')
        self.repository.delete(query_id)

        self.assertIsNone(self.repository.get(query_id))

    def test_exec_by_id(self):
        query = CustomQueryModel(title='EXEC TEST',
                                 q=f'SELECT * FROM {QueryEntity.__tablename__}')
        query.id = self.repository.add(query.title, query.q)

        result = self.repository.exec_by_id(query.id, 10)

        self.assertEqual(query.id, result.id)
        self.assertEqual(query.title, result.title)
        self.assertEqual(query.q, result.q)
        self.assertListEqual(['id', 'title', 'q'], result.data.columns)
        self.assertListEqual([[str(query.id), query.title, query.q]], result.data.rows)

    def test_exec_by_id_on_columns_were_specified_returns_them(self):
        query = CustomQueryModel(title='EXEC TEST',
                                 q=f'SELECT id, q FROM {QueryEntity.__tablename__}')
        query.id = self.repository.add(query.title, query.q)

        result = self.repository.exec_by_id(query.id, 10)

        self.assertEqual(query.id, result.id)
        self.assertEqual(query.title, result.title)
        self.assertEqual(query.q, result.q)
        self.assertListEqual(['id', 'q'], result.data.columns)
        self.assertListEqual([[str(query.id), query.q]], result.data.rows)

        
