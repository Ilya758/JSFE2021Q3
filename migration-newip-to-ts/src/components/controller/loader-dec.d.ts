declare class Loader {
    constructor(public readonly baseLink: string, public readonly options: TUrlOptions);

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
    sources: string;
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
    sources: TSources[];
    status: string;
    articles: IArticle[];
    totalResults: number;
}

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

interface TSources {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

interface ISource {
    id: string;
    name: string;
}
