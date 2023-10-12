import React from 'react';
import { Table } from 'antd';
import QueryResultTable from '../../api/models/QueryResultTable';

export type CustomQueryPanelProps = {
    queryResult: QueryResultTable;
}

const prepareQueryResultForTable = (query: QueryResultTable) => {
    return query.rows.map((r, rowIndex) => {
        const obj: any = {};

        r.forEach((v, i) => obj[i] = v);
        obj['key'] = rowIndex;

        return obj;
    });
}

const CustomQueryPanel = (props: CustomQueryPanelProps) => {
    return (
        <>
            <Table
                columns={props.queryResult!.columns.map((c, i) => { return { title: c, dataIndex: i, key: i } })}
                dataSource={prepareQueryResultForTable(props.queryResult)}
                size='small'
                pagination={false}
            />
        </>
    )
}

export default CustomQueryPanel;