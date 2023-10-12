import React from "react";
import { Button } from "antd";
import { EditOutlined, ReloadOutlined, DeleteOutlined } from "@ant-design/icons";

import { ModalFormContext } from "../../contexts/modal-form-context/modal-form-context";
import DelQueryRequest from "../../api/requests/query/DelQueryRequest";
import NewQueryForm from "../forms/new-query-form/new-query-form";

export type CustomQueryActionsProps = {
    queryId: number;
    updateData: () => void;
}

const CustomQueryActions = (props: CustomQueryActionsProps) => {
    const { openModal, closeModal } = React.useContext(ModalFormContext);

    const onDeleteClick = () => {
        if (window.confirm('Are you sure?'))
            new DelQueryRequest()
                .send(props.queryId);
    }

    const onSuccessSubmit = () => {
        props.updateData();
        closeModal();
    }

    const onEditClick = () => {
        openModal('Update Query', <NewQueryForm queryId={props.queryId} onSuccessSubmit={onSuccessSubmit} />);
    }

    return (
        <div>
            <Button icon={<EditOutlined />} onClick={onEditClick} title='Edit' />
            <Button icon={<ReloadOutlined />} onClick={props.updateData} title='Refresh' />
            <Button icon={<DeleteOutlined />} onClick={onDeleteClick} title='Remove' />
        </div>
    )
}

export default CustomQueryActions;