import CustomQuery from "../../models/CustomQuery";
import ApiRequestBase, { ContentType, HttpResponse } from "../ApiRequestBase";

export default class AddQueryRequest extends ApiRequestBase<number, unknown, CustomQuery> {
    constructor() {
        super('POST', ContentType.Json, 'json');
    }

    public getPath(query: CustomQuery): string {
        return '/queries';
    }

    public getRequestBody(query: CustomQuery): unknown {
        return query;
    }

    public async send(query: CustomQuery): Promise<HttpResponse<number, any>> {
        return super.send(query);
    }
}