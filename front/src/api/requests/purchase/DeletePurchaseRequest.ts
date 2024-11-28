import ApiRequestBase, { ContentType, HttpResponse } from "../ApiRequestBase";

export default class DeletePurchaseRequest extends ApiRequestBase<
    void,
    unknown,
    number
> {
    constructor() {
        super("DELETE", ContentType.Json, "json");
    }

    public getPath(id: number): string {
        return `purchases/${id}`;
    }

    public send(id: number): Promise<HttpResponse<void, unknown>> {
        return super.send(id);
    }
}
