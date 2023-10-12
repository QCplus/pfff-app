import ApiOptionsModel from '../models/ApiOptionsModel';
import ApiRequestBase, { ContentType, HttpResponse } from './ApiRequestBase';

export default class GetOptionsRequest extends ApiRequestBase<ApiOptionsModel, unknown, undefined> {
    constructor() {
        super('GET', ContentType.Json, 'json');
    }

    public getPath(): string {
        return '/';
    }
    
    public send(): Promise<HttpResponse<ApiOptionsModel, unknown>> {
        return super.send();   
    }
}