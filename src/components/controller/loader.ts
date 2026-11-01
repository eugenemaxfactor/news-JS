export type QueryOptions = Readonly<Record<string, string>>;

export type ResponseCallback<T> = (data: T) => void;

interface RequestConfig {
    endpoint: string;
    options?: QueryOptions;
}

type HttpMethod = 'GET';

class Loader {
    private readonly baseLink: string;

    private readonly options: QueryOptions;

    public constructor(baseLink: string, options: QueryOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: RequestConfig,
        callback: ResponseCallback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(response: Response): Response {
        if (!response.ok) {
            if (response.status === 401 || response.status === 404)
                console.log(`Sorry, but there is ${response.status} error: ${response.statusText}`);
            throw Error(response.statusText);
        }

        return response;
    }

    private makeUrl(options: QueryOptions, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(
        method: HttpMethod,
        endpoint: string,
        callback: ResponseCallback<T>,
        options: QueryOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: T) => callback(data))
            .catch((error: unknown) => console.error(error));
    }
}

export default Loader;
