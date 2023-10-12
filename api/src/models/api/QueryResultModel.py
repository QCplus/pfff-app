from src.models.api.CustomQueryModel import CustomQueryModel
from src.models.api.QueryResultTable import QueryResultTable


class QueryResultModel(CustomQueryModel):
    data: QueryResultTable
