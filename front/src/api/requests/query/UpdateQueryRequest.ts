import CustomQuery from "../../models/CustomQuery";
import ApiRequestBase, { ContentType } from "../ApiRequestBase";

export default class UpdateQueryRequest extends ApiRequestBase<undefined, unknown, CustomQuery> {
    constructor() {
        super('PUT', ContentType.Json, 'json');
    }

    public getPath(query: CustomQuery): string {
        return '/queries';
    }
}