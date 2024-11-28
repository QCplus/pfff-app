import React from "react";
import { Card } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import CustomQueryPanel from "../custom-query-result/custom-query-panel";
import ExecQueryRequest from "../../api/requests/query/ExecQueryRequest";
import useFetch from "../../hooks/useFetch";
import CustomQueryActions from "./custom-query-actions";
import NumberPanel from "../number-panel/number-panel";
import QueryResult from "../../api/models/QueryResult";
import QueryViewType from "../../enums/QueryViewType";
import ChartQueryWrapper from "../charts/chart-query-wrapper/chart-query-wrapper";

export type CustomQueryWrapperProps = {
    queryId: number;
    title: string;
};

const getPanelComponent = (result: QueryResult) => {
    const data = result.data;

    if (data.columns.length === 1 && data.rows.length === 1)
        return <NumberPanel value={data.rows[0][0]} />;
    if (result.viewType === QueryViewType.Histogram)
        return (
            <ChartQueryWrapper viewType={result.viewType} queryResult={data} />
        );
    return <CustomQueryPanel queryResult={data} />;
};

const CustomQueryWrapper = (props: CustomQueryWrapperProps) => {
    const [request, setRequest] = React.useState(new ExecQueryRequest());
    const [queryResult, isLoading] = useFetch(request, props.queryId);

    const onNeedDataUpdate = () => {
        setRequest(new ExecQueryRequest());
    };

    return (
        <Card
            title={queryResult?.title ?? props.title}
            bodyStyle={{ padding: 0 }}
            extra={
                <CustomQueryActions
                    queryId={props.queryId}
                    updateData={onNeedDataUpdate}
                />
            }
        >
            {isLoading ? (
                <div style={{ textAlign: "center", margin: "50px 0 50px 0" }}>
                    <LoadingOutlined
                        style={{ margin: "auto", fontSize: "5rem" }}
                    />
                </div>
            ) : (
                getPanelComponent(queryResult!)
            )}
        </Card>
    );
};

export default CustomQueryWrapper;
