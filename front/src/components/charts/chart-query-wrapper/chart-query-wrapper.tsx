import React from "react";
import QueryResultTable from "../../../api/models/QueryResultTable";
import QueryViewType from "../../../enums/QueryViewType";
import HistogramQueryPanel from "../histogram-query-panel/histogram-query-panel";
import { convertToChartData } from "../../../helpers/chart-helpers";

export type ChartQueryWrapperProps = {
    viewType: QueryViewType;
    queryResult: QueryResultTable;
};

const ChartQueryWrapper = (props: ChartQueryWrapperProps) => {
    const chartData = React.useMemo(
        () => convertToChartData(props.queryResult.rows),
        [props]
    );

    return (
        <HistogramQueryPanel labels={chartData.labels} data={chartData.data} />
    );
};

export default ChartQueryWrapper;
