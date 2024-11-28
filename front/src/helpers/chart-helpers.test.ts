import { convertToChartData } from "./chart-helpers";

test("convertToChartData valid for 3 columns", () => {
    const rows = [
        ["2022", "100", "400"],
        ["2023", "200", "500"],
        ["2024", "300", "600"],
    ];
    const expectedLabels = ["2022", "2023", "2024"];
    const expectedData = [
        [100, 200, 300],
        [400, 500, 600],
    ];

    const actual = convertToChartData(rows);

    expect(actual.labels).toEqual(expectedLabels);
    expect(actual.data).toEqual(expectedData);
});
