import Cookies, { CookieGetOptions, CookieSetOptions } from "universal-cookie";

export type CookieType = 'auth';

class CookiesManager {
    private _cookies: Cookies;
    private _defaultSetOptions: CookieSetOptions;

    constructor() {
        this._cookies = new Cookies(document.cookie, { path: '/' });
        this._defaultSetOptions = {
            sameSite: 'strict'
        };
    }

    public set(type: CookieType, value: string, options?: CookieSetOptions) {
        this._cookies.set(type, value, { ...options, ...this._defaultSetOptions });
    }

    public get(type: CookieType, options?: CookieGetOptions): string {
        return this._cookies.get(type, options);
    }
}

export default CookiesManager;