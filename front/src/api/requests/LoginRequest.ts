import NewUserModel from '../models/NewUserModel';
import TokenModel from '../models/TokenModel';
import ApiRequestBase, { ContentType, HttpResponse } from './ApiRequestBase';

export default class LoginRequest extends ApiRequestBase<TokenModel, unknown, NewUserModel> {
    constructor() {
        super('POST', ContentType.FormData, 'json');
    }

    public getPath(): string {
        return '/login';
    }
    
    public send(creds: NewUserModel): Promise<HttpResponse<TokenModel, unknown>> {
        return super.send(creds);
    }
}