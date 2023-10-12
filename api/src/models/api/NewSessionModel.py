from src.models.api.CamelModel import CamelModel


class NewSessionModel(CamelModel):
    expires_in_days: int
    user_id: int
    token: str
