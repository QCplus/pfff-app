import NewCustomQuery from "../../models/queries/NewCustomQuery";
import ApiRequestBase, { ContentType, HttpResponse } from "../ApiRequestBase";

export default class AddQueryRequest extends ApiRequestBase<
    number,
    unknown,
    NewCustomQuery
> {
    constructor() {
        super("POST", ContentType.Json, "json");
    }

    public getPath(query: NewCustomQuery): string {
        return "/queries";
    }

    public getRequestBody(query: NewCustomQuery): unknown {
        return query;
    }

    public async send(
        query: NewCustomQuery
    ): Promise<HttpResponse<number, any>> {
        return super.send(query);
    }
}
