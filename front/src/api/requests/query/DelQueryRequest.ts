import ApiRequestBase, { ContentType, HttpResponse } from "../ApiRequestBase";

export default class DelQueryRequest extends ApiRequestBase<undefined, unknown, number> {
    constructor() {
        super('DELETE', ContentType.Json, 'text');
    }

    public getPath(id: number): string {
        return `/queries/${id}`;
    }
    public getRequestBody(id: number): unknown {
        return undefined;
    }

    public async send(id: number): Promise<HttpResponse<undefined, unknown>> {
        return super.send(id);
    }
}