import ApiRequestBase, { ContentType } from "../ApiRequestBase";
import QueryResult from "../../models/QueryResult";

export default class ExecQueryRequest extends ApiRequestBase<QueryResult, unknown, number> {
    constructor() {
        super('GET', ContentType.Json, 'json');
    }

    public getPath(queryId: number): string {
        return `/queries/exec/${queryId}/10`;
    }
    
    public getRequestBody(queryId: number): unknown {
        return undefined;
    }

    public async send(queryId: number) {
        return super.send(queryId);
    }
}
