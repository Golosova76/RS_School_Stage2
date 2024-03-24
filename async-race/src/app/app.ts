import AppControllers from './components/controllers/app-controllers';
import EventEmitter from './utils/event-emitter';
import CommonService from './services/api-service/common-api';
import { BASE_URL } from './services/api-service/common-types';
import AppView from './components/view/appView';

class App {
  private emitter: EventEmitter;

  private commonService: CommonService;

  private controller: AppControllers;

  private view: AppView;

  constructor() {
    this.emitter = new EventEmitter();
    this.commonService = new CommonService(BASE_URL);
    this.view = new AppView(this.emitter);
    this.controller = new AppControllers(
      this.emitter,
      this.commonService,
      this.view
    );
  }

  public start(): void {
    this.controller.start();
  }
}

export default App;
