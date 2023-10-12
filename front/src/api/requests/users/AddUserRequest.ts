import NewUserModel from '../../models/NewUserModel';
import ApiRequestBase, { ContentType, HttpResponse } from '../ApiRequestBase';

export default class AddUserRequest extends ApiRequestBase<number, unknown, NewUserModel> {
    constructor() {
        super('POST', ContentType.Json, 'json');
    }

    public getPath(): string {
        return '/users';
    }

    public send(user: NewUserModel): Promise<HttpResponse<number, unknown>> {
        return super.send(user);
    }
}