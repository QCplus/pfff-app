import React from "react";
import { Button, Col, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import CustomQueryWrapper from "../custom-query-wrapper/custom-query-wrapper";
import GetAllQueriesRequest from "../../api/requests/query/GetAllQueriesRequest";
import useFetch from "../../hooks/useFetch";
import { ModalFormContext } from "../../contexts/modal-form-context/modal-form-context";
import CustomQueryTypesPanel from "../custom-query/custom-query-types-panel/custom-query-types-panel";

const REQUEST = new GetAllQueriesRequest();

const CustomQueriesGrid = () => {
    const [queries] = useFetch(REQUEST, undefined);
    const { openModal } = React.useContext(ModalFormContext);

    const onAddQueryBtnClick = () => {
        openModal("Choose query type", <CustomQueryTypesPanel />);
    };

    return (
        <>
            <Row gutter={[16, 16]}>
                {queries ? (
                    queries.map((q) => (
                        <Col span={12} key={q.id}>
                            <CustomQueryWrapper
                                title={q.title}
                                queryId={q.id!}
                            />
                        </Col>
                    ))
                ) : (
                    <h3 style={{ width: "100%", textAlign: "center" }}>
                        Create a new query with the button
                    </h3>
                )}
            </Row>

            <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                onClick={onAddQueryBtnClick}
                style={{ width: "100%", marginTop: "1rem" }}
            >
                NEW QUERY
            </Button>
        </>
    );
};

export default CustomQueriesGrid;
