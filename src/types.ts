export interface NewsSource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface ArticleSource {
    id: string | null;
    name: string;
}

export interface Article {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface SourcesSuccessResponse {
    status: 'ok';
    sources: NewsSource[];
}

export interface NewsSuccessResponse {
    status: 'ok';
    totalResults: number;
    articles: Article[];
}

export interface ApiErrorResponse {
    status: 'error';
    code: string;
    message: string;
}

export type SourcesResponse = SourcesSuccessResponse | ApiErrorResponse;

export type NewsResponse = NewsSuccessResponse | ApiErrorResponse;
