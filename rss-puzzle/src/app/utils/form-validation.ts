class FormValidator {
  static validateName(name: string): boolean {
    const nameRegex = /^[A-Za-z-]{3,}$/;
    return nameRegex.test(name);
  }

  static validateSurname(surname: string): boolean {
    const surnameRegex = /^[A-Za-z-]{4,}$/;
    return surnameRegex.test(surname);
  }
}

export default FormValidator;
