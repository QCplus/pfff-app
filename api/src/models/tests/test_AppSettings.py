import unittest
import os
import json

from src.models.AppSettings import AppSettings


class test_AppSettings(unittest.TestCase):
    CONFIG_FILE_PATH = "test_config.json"

    def tearDown(self) -> None:
        if os.path.exists(self.CONFIG_FILE_PATH):
            os.remove(self.CONFIG_FILE_PATH)

    def __write_config(self, config: dict) -> dict:
        with open(self.CONFIG_FILE_PATH, 'w+') as fin:
            fin.write(json.dumps(config))
        return config

    def assertIsNotEmpty(self, s: str):
        self.assertIsNotNone(s)
        self.assertNotEqual('', s.strip())

    def test_construct_reads_all_fields_from_file(self):
        config = self.__write_config({
            AppSettings.FIELD_HOST: '128.0.0.1',
            AppSettings.FIELD_PORT: 12345,
            AppSettings.FIELD_SECRET_KEY: '3784egnid',
            AppSettings.FIELD_TOKEN_LIFETIME: 20
        })

        settings = AppSettings(self.CONFIG_FILE_PATH)

        self.assertEqual(config[AppSettings.FIELD_HOST], settings.host)
        self.assertEqual(config[AppSettings.FIELD_PORT], settings.port)
        self.assertEqual(
            config[AppSettings.FIELD_SECRET_KEY], settings.secret_key)
        self.assertEqual(
            config[AppSettings.FIELD_TOKEN_LIFETIME], settings.token_lifetime_mins)

    def test_construct_creates_config_with_def_values_if_not_exists(self):
        self.__write_config({})

        settings = AppSettings(self.CONFIG_FILE_PATH)

        self.assertIsNotEmpty(settings.host)
        self.assertIsNotNone(settings.port)
        self.assertNotEqual(0, settings.port)
        self.assertIsNotNone(settings.token_lifetime_mins)
        self.assertNotEqual(0, settings.token_lifetime_mins)

    def test_construct_generates_secret_key_if_not_exists(self):
        config = self.__write_config({
            AppSettings.FIELD_HOST: '128.0.0.1',
            AppSettings.FIELD_PORT: 3456
        })

        settings = AppSettings(self.CONFIG_FILE_PATH)

        self.assertIsNotEmpty(settings.secret_key)
        self.assertGreaterEqual(len(settings.secret_key), 32)

    def test_construct_creates_file_if_not_exists(self):
        settings = AppSettings(self.CONFIG_FILE_PATH)

        self.assertTrue(os.path.exists(self.CONFIG_FILE_PATH))
