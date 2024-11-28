import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Tooltip,
    ChartData,
    ChartDataset,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Tooltip);

export type HistogramQueryPanelProps = {
    labels: string[];
    data: number[][];
};

const COLORS = [
    "rgba(255, 99, 132, 0.5)",
    "rgba(54, 162, 235, 0.5)",
    "rgba(255, 206, 86, 0.5)",
    "rgba(75, 192, 192, 0.5)",
    "rgba(153, 102, 255, 0.5)",
    "rgba(255, 159, 64, 0.5)",
];

const HistogramQueryPanel = (props: HistogramQueryPanelProps) => {
    const data = React.useMemo<ChartData<"bar", number[], string>>(() => {
        const datasets = props.data.map(
            (value, index) =>
                ({
                    data: value,
                    backgroundColor:
                        COLORS[
                            index -
                                Math.floor(index / COLORS.length) *
                                    COLORS.length
                        ],
                } as ChartDataset<"bar", number[]>)
        );

        return {
            labels: props.labels,
            datasets: datasets,
        };
    }, [props]);

    return <Bar data={data} />;
};

export default HistogramQueryPanel;
