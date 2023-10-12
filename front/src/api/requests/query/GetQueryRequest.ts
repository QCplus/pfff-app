import CustomQuery from "../../models/CustomQuery";
import ApiRequestBase, { ContentType } from "../ApiRequestBase";

export default class GetQueryRequest extends ApiRequestBase<CustomQuery, unknown, number> {
    constructor() {
        super('GET', ContentType.Json, 'json');
    }

    public getPath(id: number): string {
        return `/queries/${id}`;
    }

    public getRequestBody(id: number): unknown {
        return undefined;
    }
}