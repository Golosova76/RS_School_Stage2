class Validator {
  static validateLength(value: string, minLength: number = 4): boolean {
    return value.length >= minLength;
  }

  static validateCharacters(value: string): boolean {
    return /^[A-Za-z]+$/.test(value);
  }

  static validateUppercase(value: string): boolean {
    return /[A-Z]/.test(value);
  }

  static validateInput(input: HTMLInputElement): void {
    const { value, parentNode } = input;
    if (!parentNode) {
      return;
    }
    const errors: string[] = [];
    if (!this.validateLength(value)) {
      errors.push('Must be at least 4 characters long.');
    }
    if (!this.validateCharacters(value)) {
      errors.push('Only English letters allowed.');
    }
    if (!this.validateUppercase(value)) {
      errors.push('Must contain at least one uppercase letter.');
    }

    // Удаляем предыдущие span, если они были добавлены
    const oldSpans = parentNode.querySelectorAll('span.error-message');
    oldSpans.forEach((span) => span.remove());

    // Добавляем span для каждой ошибки
    errors.forEach((error) => {
      const span = document.createElement('span');
      span.textContent = error;
      span.className = 'error-message'; // Класс для стилей ошибок
      parentNode.appendChild(span);
    });
  }
}

export default Validator;
