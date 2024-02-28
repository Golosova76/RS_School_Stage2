import './sources.css';
import { NewsApiSource } from '../../../types/index';

class Sources {
  public draw(sources: NewsApiSource[]) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

    if (!sourceItemTemp) {
      console.error('Template element #sourceItemTemp not found');
      return;
    }

    sources.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

      const itemName = sourceClone.querySelector('.source__item-name');
      const itemElement = sourceClone.querySelector('.source__item');

      if (itemName) {
        itemName.textContent = item.name;
      } else {
        console.error('.source__item-name not found in the template');
      }

      if (itemElement) {
        itemElement.setAttribute('data-source-id', item.id || '');
      } else {
        console.error('.source__item not found in the template');
      }

      fragment.append(sourceClone);
    });

    const sourcesContainer = document.querySelector('.sources');
    if (!sourcesContainer) {
      console.error('Container element .sources not found');
      return; // Прерываем выполнение, если контейнер не найден
    }

    sourcesContainer.append(fragment);
  }
}

export default Sources;
