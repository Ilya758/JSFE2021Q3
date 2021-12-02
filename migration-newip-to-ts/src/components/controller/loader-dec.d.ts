declare class Loader {
    constructor(public baseLink: string, public options: TUrlOptions);

    getResp({ endpoint, options = {} }: IResp, callback: (data: INewsJSON) => void): void;

    makeUrl(options: Partial<TRespOptions>, endpoint): TEndpoint;

    errorHandler(res: Response): Response | never;

    load(
        method: string,
        endpoint: TEndpoint,
        callback: (data: Partial<INewsJSON>) => void,
        options: Partial<TRespOptions>
    ): void;
}

type TRespOptions = {
    sources: TSources;
};

type TEndpoint = string;

type TUrlOptions = {
    [prop: string]: string;
};

interface IResp {
    endpoint: TEndpoint;
    options?: Partial<TRespOptions>;
}

interface INewsJSON {
    sources: TGenericForINewsJSON<string>;
    status: string;
    articles: TGenericForINewsJSON<string>;
    totalResults: number;
}

type TGenericForINewsJSON<T> = {
    [prop: T]: T;
}[];

interface IArticle {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: ISource;
    title: string;
    url: string;
    urlToImage: string;
}

interface ISource {
    id: string;
    name: string;
}
