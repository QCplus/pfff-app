import ApiRequestBase, { ContentType, HttpResponse } from '../ApiRequestBase';

export default class GetPaymentTagsRequest extends ApiRequestBase<string[]> {
    constructor() {
        super('GET', ContentType.Json, 'json');
    }

    public getPath(): string {
        return 'payments/tags';
    }

    public send(): Promise<HttpResponse<string[], any>> {
        return super.send();
    }
}