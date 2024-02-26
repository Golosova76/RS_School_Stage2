import './news.css';
import { Article } from '../../../types/index';

function assertElementExists(elem: Element | null, selector: string): asserts elem is Element {
  if (elem === null) {
    throw new Error(`Element "${selector}" not found.`);
  }
}

class News {
  draw(articles: Article[]) {
    const news = articles.length >= 10 ? articles.filter((_item, idx) => idx < 10) : articles;

    const fragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

    news.forEach((item, idx) => {
      const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

      // Получаем и проверяем элементы новости перед их использованием
      const newsItem = newsClone.querySelector('.news__item');
      assertElementExists(newsItem, '.news__item');

      const newsMetaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement | null;
      assertElementExists(newsMetaPhoto, '.news__meta-photo');

      const newsMetaAuthor = newsClone.querySelector('.news__meta-author');
      assertElementExists(newsMetaAuthor, '.news__meta-author');

      const newsMetaDate = newsClone.querySelector('.news__meta-date');
      assertElementExists(newsMetaDate, '.news__meta-date');

      const newsDescriptionTitle = newsClone.querySelector('.news__description-title');
      assertElementExists(newsDescriptionTitle, '.news__description-title');

      const newsDescriptionSource = newsClone.querySelector('.news__description-source');
      assertElementExists(newsDescriptionSource, '.news__description-source');

      const newsDescriptionContent = newsClone.querySelector('.news__description-content');
      assertElementExists(newsDescriptionContent, '.news__description-content');

      const newsReadMoreLink = newsClone.querySelector('.news__read-more a');
      assertElementExists(newsReadMoreLink, '.news__read-more a');

      if (idx % 2) {
        newsItem.classList.add('alt');
      }

      newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
      newsMetaAuthor.textContent = item.author || item.source.name;
      newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
      newsDescriptionTitle.textContent = item.title;
      newsDescriptionSource.textContent = item.source.name;
      newsDescriptionContent.textContent = item.description;
      newsReadMoreLink.setAttribute('href', item.url);
      fragment.append(newsClone);
    });

    const newsContainer = document.querySelector('.news');
    if (!newsContainer) {
      console.error('Container element .sources not found');
      return; // Прерываем выполнение, если контейнер не найден
    }
    newsContainer.innerHTML = '';
    newsContainer.appendChild(fragment);
  }
}

export default News;
