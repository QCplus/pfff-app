import { Dayjs } from "dayjs";
import CookiesManager from "../../services/CookiesManager";

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export type RequestParams = Omit<
    FullRequestParams,
    "body" | "method" | "query" | "fullPath"
>;

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
    extends Response {
    data: D;
    error: E;
}

export enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded",
    Text = "text/plain",
}

export interface FullRequestParams extends Omit<RequestInit, "body"> {
    /** request path */
    fullPath: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseFormat;
    /** request body */
    body?: unknown;
}

export abstract class ApiRequestBase<T = any, E = any, P = any> {
    public baseUrl: string;
    private baseApiParams: RequestParams = {};

    protected httpMethod: string;
    protected contentType: ContentType;
    protected responseFormat: ResponseFormat;

    constructor(
        httpMethod: "GET" | "POST" | "DELETE" | "PUT",
        contentType: ContentType,
        responseFormat: ResponseFormat
    ) {
        this.baseUrl = process.env.REACT_APP_API_URL ?? "http://localhost:8000";

        this.httpMethod = httpMethod;
        this.contentType = contentType;
        this.responseFormat = responseFormat;
    }

    protected objToQueryParam(obj: any): string {
        if (obj.$isDayjsObject) {
            return (obj as Dayjs).toISOString();
        }

        throw Error("Unknown object type");
    }

    protected encodeQueryParam(key: string, value: any) {
        const encodedKey = encodeURIComponent(key);
        const strValue =
            typeof value == "object" ? this.objToQueryParam(value) : `${value}`;
        return `${encodedKey}=${encodeURIComponent(strValue)}`;
    }

    protected addQueryParam(query: QueryParamsType, key: string) {
        return this.encodeQueryParam(key, query[key]);
    }

    protected addArrayQueryParam(query: QueryParamsType, key: string) {
        const value = query[key];
        return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
    }

    protected toQueryString(rawQuery?: QueryParamsType): string {
        const query = rawQuery || {};
        const keys = Object.keys(query).filter(
            (key) => "undefined" !== typeof query[key]
        );
        return keys
            .map((key) =>
                Array.isArray(query[key])
                    ? this.addArrayQueryParam(query, key)
                    : this.addQueryParam(query, key)
            )
            .join("&");
    }

    protected asQueryParams(rawQuery?: QueryParamsType): string {
        const queryString = this.toQueryString(rawQuery);
        return queryString ? `?${queryString}` : "";
    }

    private contentFormatters: Record<ContentType, (input: any) => any> = {
        [ContentType.Json]: (input: any) =>
            input !== null &&
            (typeof input === "object" || typeof input === "string")
                ? JSON.stringify(input)
                : input,
        [ContentType.Text]: (input: any) =>
            input !== null && typeof input !== "string"
                ? JSON.stringify(input)
                : input,
        [ContentType.FormData]: (input: any) =>
            Object.keys(input || {}).reduce((formData, key) => {
                const property = input[key];
                formData.append(
                    key,
                    property instanceof Blob
                        ? property
                        : typeof property === "object" && property !== null
                        ? JSON.stringify(property)
                        : `${property}`
                );
                return formData;
            }, new FormData()),
        [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
    };

    protected mergeRequestParams(
        params1: RequestParams,
        params2?: RequestParams
    ): RequestParams {
        const authToken = new CookiesManager().get("auth");
        return {
            ...this.baseApiParams,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...(this.baseApiParams.headers || {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
                ...(authToken ? { Authorization: authToken } : {}),
            },
        };
    }

    protected async makeRequest({
        body,
        type,
        query,
        fullPath,
        format,
        ...params
    }: FullRequestParams): Promise<HttpResponse<T, E>> {
        const requestParams = this.mergeRequestParams(params);
        const queryString = query && this.toQueryString(query);
        const payloadFormatter =
            this.contentFormatters[type || ContentType.Json];
        const responseFormat = format;

        if (this.contentType !== ContentType.FormData)
            requestParams.headers = {
                ...requestParams.headers,
                "Content-Type": this.contentType,
            };
        return fetch(`${fullPath}${queryString ? `?${queryString}` : ""}`, {
            ...requestParams,
            headers: {
                ...(requestParams.headers || {}),
            },
            body:
                typeof body === "undefined" || body === null
                    ? null
                    : payloadFormatter(body),
        }).then(async (response) => {
            const r = response as HttpResponse<T, E>;
            r.data = null as unknown as T;
            r.error = null as unknown as E;

            const data = !responseFormat
                ? r
                : await response[responseFormat]()
                      .then((data) => {
                          if (r.ok) {
                              r.data = data;
                          } else {
                              r.error = data;
                          }
                          return r;
                      })
                      .catch((e) => {
                          r.error = e;
                          return r;
                      });

            if (!response.ok) throw data;
            return data;
        });
    }

    public abstract getPath(params?: P): string;

    public getRequestBody(params?: P): unknown | undefined {
        if (this.httpMethod === "GET") return undefined;
        return params;
    }

    public getFullPath(params?: P): string {
        let path = this.getPath(params);
        if (path[0] !== "/") path = "/" + path;

        return `${this.baseUrl}${path}`;
    }

    public async send(params?: P): Promise<HttpResponse<T, E>> {
        return this.makeRequest({
            fullPath: this.getFullPath(params),
            method: this.httpMethod,
            body: this.getRequestBody(params),
            type: this.contentType,
            format: this.responseFormat,
        });
    }
}

export default ApiRequestBase;
