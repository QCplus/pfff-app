import PurchaseModel from '../../models/PurchaseModel';
import ApiRequestBase, { ContentType, HttpResponse } from '../ApiRequestBase';

export default class UpdatePurchaseRequest extends ApiRequestBase<any, unknown, PurchaseModel> {
    constructor() {
        super('PUT', ContentType.Json, 'json');
    }

    public getPath(purchase: PurchaseModel): string {
        return '/purchases';
    }
    
    public send(purchase: PurchaseModel): Promise<HttpResponse<any, unknown>> {
        return super.send(purchase);
    }
}