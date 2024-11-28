export const convertToChartData = (rows: string[][]) => {
    const result = {
        labels: new Array<string>(),
        data: new Array<number[]>(),
    };

    for (let i = 0; i < rows[0].length - 1; i++) {
        result.data.push([]);
    }

    rows.forEach((r) => {
        result.labels.push(r[0]);
        let i = 0;
        for (let d of r.slice(1)) {
            result.data[i++].push(+d);
        }
    });

    return result;
};
