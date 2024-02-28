type OptionsType = Record<string, string | number>;

enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
}

class Loader {
  private readonly baseLink: string;
  private readonly options: OptionsType;

  constructor(baseLink: string, options: OptionsType) {
    this.baseLink = baseLink;
    this.options = options;
  }

  public getResp<T = void>(
    { endpoint, options = {} }: { endpoint: string; options?: Record<string, string | number> },
    callback: (data: T) => void = () => {
      console.error('No callback for GET response');
    }
  ) {
    this.load(HttpMethod.Get, endpoint, callback, options);
  }

  private errorHandler(res: Response) {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(options: OptionsType, endpoint: string) {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  private load<T>(method: HttpMethod, endpoint: string, callback: (data: T) => void, options = {}) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data: T) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;
