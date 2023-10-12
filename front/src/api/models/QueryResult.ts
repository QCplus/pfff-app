import CustomQuery from "./CustomQuery";
import QueryResultTable from "./QueryResultTable";

type QueryResult = {
    data: QueryResultTable
} & CustomQuery

export default QueryResult;