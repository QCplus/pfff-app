import React from "react";
import { Button, DatePicker, Space, Table } from "antd";
import dayjs from "dayjs";
import { ColumnsType } from "antd/es/table";

import PurchaseModel from "../../api/models/PurchaseModel";
import { nameof } from "../../utils/common_utils";
import useFetch from "../../hooks/useFetch";
import GetPurchasesRequest from "../../api/requests/purchase/GetPurchasesRequest";
import GetPurchasesFilter from "../../api/models/purchase/GetPurchasesFilter";
import { DATE_FORMAT } from "../../globals";

const MODEL_COLUMNS: ColumnsType<PurchaseModel> = [
    {
        title: "Name",
        key: nameof<PurchaseModel>("name"),
        dataIndex: nameof<PurchaseModel>("name"),
    },
    {
        title: "Category",
        key: nameof<PurchaseModel>("category"),
        dataIndex: nameof<PurchaseModel>("category"),
    },
    {
        title: "Payment time",
        key: nameof<PurchaseModel>("paymentTime"),
        dataIndex: nameof<PurchaseModel>("paymentTime"),
    },
    {
        title: "Price",
        key: nameof<PurchaseModel>("price"),
        dataIndex: nameof<PurchaseModel>("price"),
    },
    {
        title: "Quantity",
        key: nameof<PurchaseModel>("quantity"),
        dataIndex: nameof<PurchaseModel>("quantity"),
    },
    {
        title: "Shop",
        key: nameof<PurchaseModel>("shop"),
        dataIndex: nameof<PurchaseModel>("shop"),
    },
];

const REQUEST = new GetPurchasesRequest();

const PurchasesTable = () => {
    const [filter, setFilter] = React.useState<GetPurchasesFilter>({
        start: dayjs().add(-14, "day"),
        end: dayjs(),
    });
    const [data, isLoading] = useFetch(REQUEST, filter);

    return (
        <Space direction="vertical" style={{ display: "flex" }}>
            <Space size="middle">
                <DatePicker
                    format={DATE_FORMAT}
                    placeholder="Start date"
                    size="large"
                    picker="date"
                    value={filter.start}
                    allowClear={false}
                    onChange={(v) => setFilter({ ...filter, start: v! })}
                />
                <DatePicker
                    format={DATE_FORMAT}
                    placeholder="End date"
                    size="large"
                    picker="date"
                    value={filter.end}
                    allowClear={false}
                    onChange={(v) => setFilter({ ...filter, end: v! })}
                />
                <Button
                    type="primary"
                    size="large"
                    onClick={() => setFilter({ ...filter })}
                    loading={isLoading}
                >
                    Refresh
                </Button>
            </Space>
            <Table
                columns={MODEL_COLUMNS}
                dataSource={data?.rows ?? []}
                rowKey={(row) => row.id}
                size="middle"
                bordered
                loading={isLoading}
            ></Table>
        </Space>
    );
};

export default PurchasesTable;
