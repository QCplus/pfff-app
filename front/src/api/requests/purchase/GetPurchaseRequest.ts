import PurchaseModel from '../../models/PurchaseModel';
import ApiRequestBase, { ContentType, HttpResponse } from '../ApiRequestBase';

export default class GetPurchaseRequest extends ApiRequestBase<PurchaseModel, unknown, number> {
    constructor() {
        super('GET', ContentType.Json, 'json');
    }

    public getPath(id: number): string {
        return `/purchases/${id}`;
    }
    
    public send(id: number): Promise<HttpResponse<PurchaseModel, unknown>> {
        return super.send(id)
    }
}