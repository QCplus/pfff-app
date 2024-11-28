import React from "react";
import { Row } from "antd";
import { ConsoleSqlOutlined, SnippetsOutlined } from "@ant-design/icons";
import HugeButton from "../../shared/huge-button/huge-button";
import { ModalFormContext } from "../../../contexts/modal-form-context/modal-form-context";
import NewQueryForm from "../../forms/new-query-form/new-query-form";

const CustomQueryTypesPanel = () => {
    const { updateModalContent, closeModal } =
        React.useContext(ModalFormContext);

    const openSqlForm = () => {
        updateModalContent(
            <NewQueryForm onSuccessSubmit={closeModal} />,
            "New SQL query"
        );
    };

    const openTemplatesForm = () => {};

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
                    onClick={openTemplatesForm}
                    text="Templates"
                    width="50%"
                    height="150px"
                >
                    <SnippetsOutlined />
                </HugeButton>
            </Row>
        </div>
    );
};

export default CustomQueryTypesPanel;
