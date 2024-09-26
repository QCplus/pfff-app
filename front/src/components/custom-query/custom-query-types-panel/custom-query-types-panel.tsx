import React from "react";
import { Row } from "antd";
import { ConsoleSqlOutlined, LineChartOutlined } from "@ant-design/icons";
import HugeButton from "../../shared/huge-button/huge-button";
import { ModalFormContext } from "../../../contexts/modal-form-context/modal-form-context";
import NewQueryForm from "../../forms/new-query-form/new-query-form";
import ChartQueryForm from "../../forms/chart-query-form/chart-query-form";

const CustomQueryTypesPanel = () => {
    const { updateModalContent, closeModal } =
        React.useContext(ModalFormContext);

    const openSqlForm = () => {
        updateModalContent(
            <NewQueryForm onSuccessSubmit={closeModal} />,
            "New SQL query"
        );
    };

    const openChartForm = () => {
        updateModalContent(
            <ChartQueryForm onSuccessSubmit={closeModal} />,
            "New chart"
        );
    };

    return (
        <div>
            <Row gutter={[16, 16]}>
                <HugeButton
                    onClick={openSqlForm}
                    text="SQL query"
                    width="50%"
                    height="150px"
                >
                    <ConsoleSqlOutlined />
                </HugeButton>

                <HugeButton
                    onClick={openChartForm}
                    text="Chart"
                    width="50%"
                    height="150px"
                >
                    <LineChartOutlined />
                </HugeButton>
            </Row>
        </div>
    );
};

export default CustomQueryTypesPanel;
