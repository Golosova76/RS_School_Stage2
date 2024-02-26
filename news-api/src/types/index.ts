export interface NewsApiSource {
  id: string | null;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface NewsApiSourcesResponse {
  status: 'ok' | 'error';
  sources: NewsApiSource[];
}

export interface EverythingApiResponse {
  status: 'ok' | 'error';
  totalResults: number;
  articles: Article[];
}

export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
}
