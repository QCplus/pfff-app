import GetPurchasesFilter from "../../models/purchase/GetPurchasesFilter";
import PurchaseModel from "../../models/PurchaseModel";
import TableDataModel from "../../models/TableDataModel";
import ApiRequestBase, { ContentType } from "../ApiRequestBase";

export default class GetPurchasesRequest extends ApiRequestBase<
    TableDataModel<PurchaseModel>,
    unknown,
    GetPurchasesFilter
> {
    constructor() {
        super("GET", ContentType.Json, "json");
    }

    public getPath(params: GetPurchasesFilter): string {
        return `purchases${this.asQueryParams(params)}`;
    }
}
