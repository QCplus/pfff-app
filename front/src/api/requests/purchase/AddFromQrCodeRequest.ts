import ApiRequestBase, { ContentType } from "../ApiRequestBase";

export default class AddFromQrCodeRequest extends ApiRequestBase<string, unknown, string> {
    constructor() {
        super('POST', ContentType.Json, 'json');
    }

    public getPath(code: string): string {
        return `/purchases/qrcode/${encodeURIComponent(code)}`;
    }
}