import PurchaseModel from "../../models/PurchaseModel";
import ApiRequestBase, { ContentType, HttpResponse } from "../ApiRequestBase";

export default class AddPurchaseRequest extends ApiRequestBase<undefined, unknown, PurchaseModel> {
    constructor() {
        super('POST', ContentType.Json, 'json');
    }

    public getPath(purchase: PurchaseModel): string {
        return '/purchases';
    }

    public getRequestBody(purchase: PurchaseModel): unknown {
        return purchase;
    }

    public async send(purchase: PurchaseModel): Promise<HttpResponse<undefined, unknown>> {
        return super.send(purchase);
    }
}