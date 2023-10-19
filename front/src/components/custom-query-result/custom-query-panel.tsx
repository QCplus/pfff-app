import React from 'react';
import { Table } from 'antd';

import QueryResultTable from '../../api/models/QueryResultTable';
import TransactionType from '../../types/TransactionType';
import { ModalFormContext } from '../../contexts/modal-form-context/modal-form-context';
import PurchaseForm from '../forms/purchase-form/purchase-form';
import GetPurchaseRequest from '../../api/requests/purchase/GetPurchaseRequest';

export type CustomQueryPanelProps = {
    queryResult: QueryResultTable;
}

const ID_COLUMNS: { [name: string]: TransactionType } = {
    'PURCHASE_ID': 'purchase',
    'PAYMENT_ID': 'payment'
}

const prepareRows = (query: QueryResultTable) => {
    return query.rows.map((r, rowIndex) => {
        const obj: any = {};

        r.forEach((v, i) => {
            return obj[i] = v;
        });
        obj['key'] = rowIndex;

        return obj;
    });
}

type ColType = {
    title: string;
    key: string | number;
    width?: number;
    render?: (text: string, record: any, index: number) => React.ReactElement;
}

const CustomQueryPanel = (props: CustomQueryPanelProps) => {
    const { openModal, closeModal } = React.useContext(ModalFormContext);

    const onEditClick = React.useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        const href = e.currentTarget.getAttribute('href');
        if (!href) {
            console.error('Row has no id');
            return;
        }

        const [type, id] = href.split('-');

        const request = type === 'purchase'
            ? new GetPurchaseRequest()
            : new GetPurchaseRequest();

        request
            .send(Number.parseInt(id))
            .then((r) => openModal('Edit Purchase', <PurchaseForm value={r.data} onSuccessSubmit={closeModal} />));
    }, [closeModal, openModal])

    const prepareColumns = React.useCallback((table: QueryResultTable): ColType[] =>
        table.columns.map((c, i) => {
            const recordType = ID_COLUMNS[c.toUpperCase()];
            if (recordType) {
                return {
                    title: '',
                    key: 'operation',
                    width: 100,
                    render: (record: any) => <a href={`${recordType}-${record[i]}`} onClick={onEditClick}>Edit</a>
                } as ColType;
            }

            return {
                title: c,
                dataIndex: i,
                key: i,
            } as ColType;
        }), [onEditClick]);

    const columns = React.useMemo(() => prepareColumns(props.queryResult), [prepareColumns, props.queryResult])
    const rows = React.useMemo(() => prepareRows(props.queryResult), [props.queryResult]);

    return (
        <>
            <Table
                columns={columns}
                dataSource={rows}
                size='small'
                pagination={false}
            />
        </>
    )
}

export default CustomQueryPanel;