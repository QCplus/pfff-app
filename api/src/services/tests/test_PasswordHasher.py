import unittest

from src.services.PasswordHasher import PasswordHasher


class TestPasswordHasher(unittest.TestCase):
    def test_validate_password_validates_successfully(self):
        hasher = PasswordHasher()
        password = "34567"
        password_hash = hasher.hash_password(password)

        self.assertTrue(hasher.validate_password(password_hash, password))
        