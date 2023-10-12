from dataclasses import dataclass


@dataclass
class NewUserModel:
    username: str
    password: str
