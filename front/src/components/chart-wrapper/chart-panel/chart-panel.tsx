import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const options = {
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart',
        },
    },
};

export type ChartPanelProps = {
    data: string[] | number[];
    labels: string[];
    lineLabel: string;
};

const ChartPanel = (props: ChartPanelProps) => {
    const data = React.useMemo(() => {
        return {
            labels: props.labels,
            datasets: [{
                label: props.lineLabel,
                data: props.data
            }]
        }
    }, [props.data, props.labels, props.lineLabel]);

    return (
        <Line options={options} data={data} />
    )
}

export default ChartPanel;