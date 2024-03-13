import FormComponent from '../form/form';
import ButtonComponent from '../button/button';
import FormErrorManager from '../../services/form/form-error';
import FormSubmitHandler from '../../services/form/submit-handler';
import GameUser from '../../services/user/local-storage';

class AccessScreen {
  private onLoginSuccess: () => void;

  constructor(onLoginSuccess: () => void) {
    this.onLoginSuccess = onLoginSuccess;
  }

  render(): HTMLElement {
    const submitButton = new ButtonComponent({
      className: 'login-button',
      text: 'Login',
      type: 'submit',
      disabled: true,
    });

    // Создание экземпляра формы и добавление его в mainComponent
    const form = new FormComponent();

    form.appendToFormDirectly(submitButton);

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

    return formElement;
  }
}

export default AccessScreen;
