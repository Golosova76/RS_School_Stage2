import FormComponent from '../../components/form/form';

class FormErrorManager {
  private formComponent: FormComponent;

  constructor(formComponent: FormComponent) {
    this.formComponent = formComponent;
  }

  public showError(inputName: string, message: string): void {
    // метод getNode() из FormComponent для получения DOM-узла формы
    const formNode = this.formComponent.getNode();
    const inputElement = formNode.querySelector(
      `[name="${inputName}"]`
    ) as HTMLElement;

    if (!inputElement) return; // Если элемент не найден, прекращаем выполнение

    // Проверка, существует ли уже элемент ошибки, и если нет, создаем его
    let errorElement = inputElement.nextElementSibling as HTMLElement;
    if (!errorElement || !errorElement.classList.contains('error-message')) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      inputElement.parentNode?.insertBefore(
        errorElement,
        inputElement.nextSibling
      );
      inputElement.style.borderColor = 'red';
    }
    errorElement.textContent = message;
  }

  public clearError(inputName: string): void {
    const formNode = this.formComponent.getNode();
    const inputElement = formNode.querySelector(
      `[name="${inputName}"]`
    ) as HTMLElement;

    if (!inputElement) return;

    const errorElement = inputElement.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
      inputElement.parentNode?.removeChild(errorElement);
    }
    inputElement.style.borderColor = ''; // Возвращаем исходные стили
  }
}

export default FormErrorManager;
