export interface NewsApiSource {
  id: string | null;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

enum APIResponseStatus {
  Ok = 'ok',
  Error = 'error',
}

export interface NewsApiSourcesResponse {
  status: APIResponseStatus;
  sources: NewsApiSource[];
}

export interface EverythingApiResponse {
  status: APIResponseStatus;
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
