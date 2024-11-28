import React from "react";
import { Divider, Tabs } from "antd";

import ContentHeader from "../components/content-header/content-header";
import CustomQueriesTab from "../components/tabs/custom-queries-tab/custom-queries-tab";
import PurchasesTable from "../components/purchases-table/purchases-table";

const AnalyticsPage = () => {
    return (
        <div className="main-content">
            <ContentHeader />
            <Divider />

            <Tabs
                type="card"
                items={[
                    {
                        label: "Queries",
                        key: "1",
                        children: <CustomQueriesTab />,
                    },
                    {
                        label: "Purchases",
                        key: "2",
                        children: <PurchasesTable />,
                    },
                ]}
            />
        </div>
    );
};

export default AnalyticsPage;
