// import FormValidator from '../../utils/form-validation';
import FormErrorManager from './form-error';
import FormComponent from '../../components/form/form';
import ButtonComponent from '../../components/button/button';
import GameUser from '../user/local-storage';
import FormFieldValidator from './field-validation';

class FormSubmitHandler {
  private errorManager: FormErrorManager;

  private onValidSubmit: () => void;

  private form: FormComponent;

  private submitButton: ButtonComponent;

  private gameUser: GameUser;

  constructor(
    errorManager: FormErrorManager,
    onValidSubmit: () => void,
    form: FormComponent,
    submitButton: ButtonComponent,
    gameUser: GameUser
  ) {
    this.errorManager = errorManager;
    this.onValidSubmit = onValidSubmit;
    this.form = form;
    this.submitButton = submitButton;
    this.gameUser = gameUser;
    this.setupInputValidationListeners();
  }

  private validateFormData(changedFieldName: string | null = null): boolean {
    const formData = new FormData(this.form.getNode() as HTMLFormElement);
    const name = formData.get('label-name') as string;
    const surname = formData.get('label-surname') as string;

    let isValid = true;

    // Используем методы из FormFieldValidator
    if (changedFieldName === 'label-name' || changedFieldName === null) {
      // const name = formData.get('label-name') as string;
      const nameError = FormFieldValidator.validateName(name);
      if (nameError) {
        isValid = false;
        this.errorManager.showError('label-name', nameError);
      } else {
        this.errorManager.clearError('label-name');
      }
    }

    if (changedFieldName === 'label-surname' || changedFieldName === null) {
      // const surname = formData.get('label-surname') as string;
      const surnameError = FormFieldValidator.validateSurname(surname);
      if (surnameError) {
        isValid = false;
        this.errorManager.showError('label-surname', surnameError);
      } else {
        this.errorManager.clearError('label-surname');
      }
    }
    return isValid;
  }

  private setupInputValidationListeners(): void {
    const inputs = this.form.getNode().querySelectorAll('input');
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        // Получаем имя поля, которое было изменено
        const changedFieldName = input.getAttribute('name');

        // Передаем имя измененного поля в метод validateFormData
        const isFormValid = this.validateFormData(changedFieldName);

        // Обновляем состояние кнопки отправки на основе результатов валидации
        if (isFormValid) {
          this.submitButton.removeAttribute('disabled');
        } else {
          this.submitButton.setAttribute('disabled', '');
        }
      });
    });
  }

  public handle(event: Event): void {
    event.preventDefault();
    // Используем validateFormData для проверки валидности формы
    if (this.validateFormData()) {
      const formData = new FormData(this.form.getNode() as HTMLFormElement);
      const name = formData.get('label-name') as string;
      const surname = formData.get('label-surname') as string;
      this.gameUser.gameName = name;
      this.gameUser.gameSurname = surname;
      this.gameUser.saveToLocalStorage();
      this.onValidSubmit();
    }
  }
}

export default FormSubmitHandler;
