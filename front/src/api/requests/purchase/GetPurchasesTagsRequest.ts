import ApiRequestBase, { ContentType } from "../ApiRequestBase";

export default class GetPurchasesTagsRequest extends ApiRequestBase<string[]> {
    constructor() {
        super('GET', ContentType.Json, 'json');
    }

    public getPath(): string {
        return 'purchases/tags';
    }
    
    public async send() {
        return super.send();
    }
}