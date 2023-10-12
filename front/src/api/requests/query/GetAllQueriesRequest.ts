import ApiRequestBase, { ContentType, HttpResponse } from "../ApiRequestBase";
import QueryInfoModel from "../../models/QueryInfoModel";

export default class GetAllQueriesRequest extends ApiRequestBase<QueryInfoModel[]> {
    constructor() {
        super('GET', ContentType.Json, 'json');
    }

    public getPath(): string {
        return '/queries';
    }

    public getRequestBody(): unknown {
        return undefined;
    }

    public async send(): Promise<HttpResponse<QueryInfoModel[], any>> {
        return super.send();
    }
}
