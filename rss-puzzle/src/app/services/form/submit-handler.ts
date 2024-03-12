import FormValidator from '../../utils/form-validation';
import FormErrorManager from './form-error';
import FormComponent from '../../components/form/form';
import ButtonComponent from '../../components/button/button';
import GameUser from '../user/local-storage';

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

  private validateFormData(): boolean {
    const formData = new FormData(this.form.getNode() as HTMLFormElement);
    const name = formData.get('label-name') as string;
    const surname = formData.get('label-surname') as string;

    let isValid = true;

    if (!FormValidator.validateName(name)) {
      isValid = false;
      this.errorManager.showError(
        'label-name',
        'Invalid name. Please make sure it starts with a capital letter, contains only English alphabet letters, the hyphen (-) symbol and at least 3 characters.'
      );
    } else {
      this.errorManager.clearError('label-name');
    }

    if (!FormValidator.validateSurname(surname)) {
      isValid = false;
      this.errorManager.showError(
        'label-surname',
        'Invalid surname. Please make sure it starts with a capital letter, contains only English alphabet letters, the hyphen (-) symbol and at least 4 characters.'
      );
    } else {
      this.errorManager.clearError('label-surname'); // Очищаем ошибку для поля фамилии
    }

    return isValid;
  }

  private validateField(fieldName: string, value: string): boolean {
    let isValid = true;
    switch (fieldName) {
      case 'label-name':
        if (!FormValidator.validateName(value)) {
          isValid = false;
          this.errorManager.showError(
            'label-name',
            'Invalid name. Please make sure it starts with a capital letter, contains only English alphabet letters, the hyphen (-) symbol and at least 3 characters.'
          );
        }
        break;
      case 'label-surname':
        if (!FormValidator.validateSurname(value)) {
          isValid = false;
          this.errorManager.showError(
            'label-surname',
            'Invalid surname. Please make sure it starts with a capital letter, contains only English alphabet letters, the hyphen (-) symbol and at least 4 characters.'
          );
        }
        break;
      default:
        break;
    }
    return isValid;
  }

  private setupInputValidationListeners(): void {
    const inputs = this.form.getNode().querySelectorAll('input');
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        // Валидируем только измененное поле
        const isValidField = this.validateField(input.name, input.value);
        // Если это последнее измененное поле было валидно, проверяем всю форму
        if (isValidField) {
          if (this.validateFormData()) {
            this.submitButton.removeAttribute('disabled');
          } else {
            this.submitButton.setAttribute('disabled', '');
          }
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
