import BalanceModel from "../models/BalanceModel";
import ApiRequestBase, { ContentType } from "./ApiRequestBase";

export default class GetMonthlyBalanceRequest extends ApiRequestBase<BalanceModel[], unknown, { year?: number, month?: number }> {
    constructor() {
        super('GET', ContentType.Json, 'json');
    }

    public getPath(params?: { year?: number, month?: number }): string {
        if (params)
            return `/balance/monthly/${params.year}/${params.month}`;
        return '/balance/monthly';
    }
}