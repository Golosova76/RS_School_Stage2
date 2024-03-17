import FormValidator from '../../utils/form-validation';

class FormFieldValidator {
  static validateName(name: string): string | null {
    if (!FormValidator.isValidCharacters(name)) {
      return 'Name must contain only English alphabet letters and hyphen (-).';
    }
    if (!FormValidator.isInitialCapitalized(name)) {
      return 'Name must start with a capital letter.';
    }
    if (!FormValidator.isNameLengthValid(name)) {
      return 'Name must be at least 3 characters long.';
    }
    return null; // Валидация пройдена
  }

  static validateSurname(surname: string): string | null {
    if (!FormValidator.isValidCharacters(surname)) {
      return 'Surname must contain only English alphabet letters and hyphen (-).';
    }
    if (!FormValidator.isInitialCapitalized(surname)) {
      return 'Surname must start with a capital letter.';
    }
    if (!FormValidator.isSurnameLengthValid(surname)) {
      return 'Surname must be at least 4 characters long.';
    }
    return null; // Валидация пройдена
  }
}

export default FormFieldValidator;
