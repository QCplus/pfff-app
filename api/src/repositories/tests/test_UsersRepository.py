from src.models.api.NewUserModel import NewUserModel
from src.repositories.UsersRepository import UsersRepository
from src.repositories.tests.RepositoryTestsBase import RepositoryTestsBase


class test_UsersRepository(RepositoryTestsBase):
    def setUp(self) -> None:
        super().setUp()

        self.repository = UsersRepository(self.db)

    def test_add(self) -> None:
        new_user = NewUserModel(username='add_test_user',
                                password='123456')
        user_id = self.repository.add(new_user)

        actual_user = self.repository.get_by_id(user_id)

        self.assertEqual(user_id, actual_user.id)
        self.assertEqual(new_user.username, actual_user.username)
        self.assertEqual(new_user.password, actual_user.password_hash)

    def test_get_by_name(self):
        self.repository.add(NewUserModel(username='extra_user',
                                         password='456789'))
        new_user = NewUserModel(username='get_by_name_test',
                                password='12345')
        self.repository.add(new_user)
        self.repository.add(NewUserModel(username='another_user',
                                         password='18765'))

        actual_user = self.repository.get_by_name(new_user.username)

        self.assertEqual(new_user.username, actual_user.username)
        self.assertEqual(new_user.password, actual_user.password_hash)

    def test_count_users(self):
        self.repository.add(NewUserModel(username='user1', password='123'))
        self.repository.add(NewUserModel(username='user2', password='456'))

        self.assertEqual(2, self.repository.count_users())
