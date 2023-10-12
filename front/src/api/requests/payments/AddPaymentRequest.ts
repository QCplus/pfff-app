import ApiRequestBase, { ContentType } from '../ApiRequestBase';
import PaymentModel from '../../models/PaymentModel';

export default class AddPaymentRequest extends ApiRequestBase<unknown, unknown, PaymentModel> {
    constructor() {
        super('POST', ContentType.Json, 'json');
    }

    public getPath(payment: PaymentModel): string {
        return '/payments';
    }
}