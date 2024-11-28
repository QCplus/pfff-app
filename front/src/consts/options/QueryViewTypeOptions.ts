import { DefaultOptionType } from "antd/es/select";
import QueryViewType from "../../enums/QueryViewType";

const QueryViewTypeOptions: DefaultOptionType[] = [
    {
        value: QueryViewType.Table,
        label: "Table",
    },
    {
        value: QueryViewType.Histogram,
        label: "Histogram",
    },
];

export default QueryViewTypeOptions;
