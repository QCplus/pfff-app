import QueryViewType from "../../enums/QueryViewType";

type CustomQuery = {
    id?: number;
    title: string;
    q: string;
    viewType: QueryViewType;
};

export default CustomQuery;
