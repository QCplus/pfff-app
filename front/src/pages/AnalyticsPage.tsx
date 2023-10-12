import React from "react";
import ChartWrapper from "../components/chart-wrapper/chart-wrapper";
import ContentHeader from "../components/content-header/content-header";
import CustomQueriesGrid from "../components/custom-queries-grid/custom-queries-grid";

const AnalyticsPage = () => {
    return (
        <div className="main-content">
            <ContentHeader />
            <hr />

            <ChartWrapper />
            <CustomQueriesGrid />
        </div>
    )
}

export default AnalyticsPage;