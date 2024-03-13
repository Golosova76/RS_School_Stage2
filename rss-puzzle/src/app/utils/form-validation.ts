class FormValidator {
  // Проверка на допустимые символы (английский алфавит и дефис)
  static isValidCharacters(value: string): boolean {
    const regex = /^[A-Za-z-]+$/;
    return regex.test(value);
  }

  // Проверка на заглавную первую букву
  static isInitialCapitalized(value: string): boolean {
    const regex = /^[A-Z]/;
    return regex.test(value);
  }

  // Проверка минимальной длины для имени
  static isNameLengthValid(name: string): boolean {
    return name.length >= 3;
  }

  // Проверка минимальной длины для фамилии
  static isSurnameLengthValid(surname: string): boolean {
    return surname.length >= 4;
  }
}

export default FormValidator;
