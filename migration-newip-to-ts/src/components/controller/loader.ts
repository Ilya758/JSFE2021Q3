class Loader {
    constructor(public readonly baseLink: string, public readonly options: TUrlOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: IResp,
        callback: (data: INewsJSON<ISources, IArticle>) => void = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response | never {
        enum ErrorTypes {
            UnauthorizedError = 401,
            NotFound = 404,
            UpgradeRequired = 426,
            TooManyRequests = 429,
        }

        if (!res.ok) {
            Object.values(ErrorTypes).forEach((type) => {
                if (res.status === type) console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
                throw Error(res.statusText);
            });
        }

        return res;
    }

    makeUrl(options: Partial<TRespOptions>, endpoint: TEndpoint) {
        const urlOptions: TUrlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(
        method: string,
        endpoint: string,
        callback: (data: INewsJSON<ISources, IArticle>) => void,
        options: Partial<TRespOptions> = {}
    ) {
        const response = fetch(this.makeUrl(options, endpoint), { method });
        response
            .then(this.errorHandler.bind(Loader))
            .then((res: Response) => res.json())
            .then((data: INewsJSON<ISources, IArticle>) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
