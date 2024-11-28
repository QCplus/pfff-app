import React from "react";
import { Button, DatePicker, Popconfirm, Space, Table } from "antd";
import dayjs from "dayjs";
import { ColumnsType } from "antd/es/table";

import PurchaseModel from "../../api/models/PurchaseModel";
import { nameof } from "../../utils/common_utils";
import useFetch from "../../hooks/useFetch";
import GetPurchasesRequest from "../../api/requests/purchase/GetPurchasesRequest";
import GetPurchasesFilter from "../../api/models/purchase/GetPurchasesFilter";
import { DATE_FORMAT } from "../../globals";
import DeletePurchaseRequest from "../../api/requests/purchase/DeletePurchaseRequest";

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

    const deletePurchase = React.useCallback((id: number) => {
        new DeletePurchaseRequest()
            .send(id)
            .then(() => setFilter((v) => ({ ...v })));
    }, []);

    const columns: ColumnsType<PurchaseModel> = React.useMemo(
        () => [
            ...MODEL_COLUMNS,
            {
                title: "",
                key: "action",
                render: (_, record) => (
                    <Popconfirm
                        title="Delete the purchase"
                        description="Are you sure to delete the purchase?"
                        onConfirm={() => deletePurchase(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger>
                            Delete
                        </Button>
                    </Popconfirm>
                ),
            },
        ],
        [deletePurchase]
    );

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
                columns={columns}
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
