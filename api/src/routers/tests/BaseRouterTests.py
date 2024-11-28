from fastapi.testclient import TestClient


class BaseRouterTests(object):
    _client: TestClient
    _base_url: str

    def test_get_by_id_returns_no_content_status(self):
        result = self._client.get(f'{self._base_url}/9999999')

        self.assertEqual(204, result.status_code)
