class Loader {
    constructor(public baseLink: string, public options: TUrlOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: IResp,
        callback = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response | never {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
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
        callback: (data?: Partial<INewsJSON>) => void,
        options: Partial<TRespOptions> = {}
    ) {
        const response = fetch(this.makeUrl(options, endpoint), { method });
        response
            .then(this.errorHandler.bind(Loader))
            .then((res: Response) => res.json())
            .then((data: Partial<INewsJSON>) => {
                console.log(data);
                callback(data);
            })
            .catch((err) => console.error(err));
    }
}

export default Loader;
