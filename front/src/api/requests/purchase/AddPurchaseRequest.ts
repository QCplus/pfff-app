import Purchase from "../../models/Purchase";
import ApiRequestBase, { ContentType, HttpResponse } from "../ApiRequestBase";

export default class AddPurchaseRequest extends ApiRequestBase<undefined, unknown, Purchase> {
    constructor() {
        super('POST', ContentType.Json, 'json');
    }

    public getPath(purchase: Purchase): string {
        return '/purchases';
    }

    public getRequestBody(purchase: Purchase): unknown {
        return purchase;
    }

    public async send(purchase: Purchase): Promise<HttpResponse<undefined, unknown>> {
        return super.send(purchase);
    }
}