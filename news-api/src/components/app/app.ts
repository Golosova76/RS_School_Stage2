import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
  controller: AppController;
  view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    const sourcesElement = document.querySelector('.sources');

    if (!sourcesElement) {
      throw new Error('The .sources element was not found in the DOM');
    }

    sourcesElement.addEventListener('click', (e) => {
      this.controller.getNews(e, (data) => {
        console.log('Data received from getSources:', data);
        this.view.drawNews(data);
      });
    });

    this.controller.getSources((data) => this.view.drawSources(data));
  }
}

export default App;
