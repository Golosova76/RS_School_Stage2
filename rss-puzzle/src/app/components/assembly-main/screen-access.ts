import ComponentAssemblerAccess from './main-access';
import FooterComponent from '../footer/footer';
import HeaderComponent from '../header/header';
import FormErrorManager from '../../services/form/form-error';
import FormSubmitHandler from '../../services/form/submit-handler';
import GameUser from '../../services/user/local-storage';

class AccessScreen {
  private onLoginSuccess: () => void;

  private wrapper: HTMLElement;

  constructor(onLoginSuccess: () => void) {
    this.onLoginSuccess = onLoginSuccess;
    document.body.classList.add('body');
    this.wrapper = document.createElement('div'); // Инициализация wrapper
    this.wrapper.classList.add('wrapper'); // Добавление класса
  }

  render(): HTMLElement {
    this.wrapper.classList.add('wrapper');

    const header = new HeaderComponent();
    this.wrapper.appendChild(header.getNode());

    const { mainComponent, form, submitButton } =
      ComponentAssemblerAccess.assembleMainContent();
    this.wrapper.appendChild(mainComponent.getNode());

    // Инициализация FormSubmitHandler и привязка его к форме
    const errorManager = new FormErrorManager(form);
    const gameUser = new GameUser();
    const formSubmitHandler = new FormSubmitHandler(
      errorManager,
      this.onLoginSuccess,
      form,
      submitButton,
      gameUser
    );

    // Получаем элемент формы и добавляем слушатель события
    const formElement: HTMLFormElement = form.getNode() as HTMLFormElement;
    formElement.addEventListener('submit', (event) => {
      formSubmitHandler.handle(event);
    });

    const footer = new FooterComponent();
    this.wrapper.appendChild(footer.getNode());

    return this.wrapper;
  }
}

export default AccessScreen;
