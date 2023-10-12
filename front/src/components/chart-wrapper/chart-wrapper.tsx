import React from 'react';
import { Row } from 'antd';
import ChartPanel from './chart-panel/chart-panel';
import GetMonthlyBalanceRequest from '../../api/requests/GetMonthlyBalanceRequest';

const ChartWrapper = () => {
    const [data, setData] = React.useState<number[]>([]);
    const [labels, setLabels] = React.useState<string[]>([]);

    React.useEffect(() => {
        new GetMonthlyBalanceRequest().send()
            .then(r => {
                setData(r.data.map(v => v.change));
                setLabels(r.data.map(v => v.intervalValue.toString()));
            });
    }, []);

    return (
        <Row style={{ maxHeight: 330 }}>
            <ChartPanel data={data} labels={labels} lineLabel='Balance' />
        </Row>
    )
}

export default ChartWrapper;