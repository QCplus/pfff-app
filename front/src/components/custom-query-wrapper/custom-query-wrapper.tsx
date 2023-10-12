import React from 'react';
import { Card } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import CustomQueryPanel from '../custom-query-result/custom-query-panel';
import ExecQueryRequest from '../../api/requests/query/ExecQueryRequest';
import useFetch from '../../hooks/useFetch';
import CustomQueryActions from './custom-query-actions';

export type CustomQueryWrapperProps = {
    queryId: number;
    title: string;
}

const CustomQueryWrapper = (props: CustomQueryWrapperProps) => {
    const [request, setRequest] = React.useState(new ExecQueryRequest());
    const [queryResult, isLoading] = useFetch(request, props.queryId);

    const onNeedDataUpdate = () => {
        setRequest(new ExecQueryRequest());
    }

    return (
        <Card title={queryResult?.title ?? props.title} bodyStyle={{ padding: 0, minHeight: '200px' }}
            extra={<CustomQueryActions queryId={props.queryId} updateData={onNeedDataUpdate} />}
        >
            {
                isLoading
                    ? <div style={{ textAlign: 'center', margin: '50px 0 50px 0' }}><LoadingOutlined style={{ margin: 'auto', fontSize: '5rem' }} /></div>
                    : <CustomQueryPanel queryResult={queryResult!.data} />
            }
        </Card>
    )
}

export default CustomQueryWrapper;