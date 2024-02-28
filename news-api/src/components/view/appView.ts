import News from './news/news';
import Sources from './sources/sources';
import { NewsApiSourcesResponse, EverythingApiResponse } from '../../types/index';

export class AppView {
  public news: News;
  public sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  public drawNews(data: EverythingApiResponse) {
    const values = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  public drawSources(data: NewsApiSourcesResponse) {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
