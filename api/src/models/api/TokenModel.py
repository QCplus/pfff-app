from datetime import datetime

from src.models.api.CamelModel import CamelModel


class TokenModel(CamelModel):
    access_token: str
    token_type: str
    expire_at: datetime
