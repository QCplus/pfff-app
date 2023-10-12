from pydantic import BaseModel


class QueryInfoModel(BaseModel):
    id: int
    title: str
