import News from './news/news';
import Sources from './sources/sources';
import type { NewsSuccessResponse, SourcesSuccessResponse } from '../../types';

export class AppView {
    private news: News;

    private sources: Sources;

    public constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: Partial<NewsSuccessResponse>): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: Partial<SourcesSuccessResponse>): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
