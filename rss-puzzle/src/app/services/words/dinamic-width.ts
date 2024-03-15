class DynamicSizeManager {
  static containerWidth: number = 924; // Ширина контейнера в пикселях

  static calculateCardWidth(word: string, totalWords: number): string {
    const baseWidthPerChar = 12; // Базовая ширина на символ
    const paddingPerSide = 10; // Отступ с каждой стороны карточки
    const outlineWidth = 2; // Толщина рамки
    const wordLength = word.length;

    // Рассчитываем ширину карточки на основе слова и добавляем ширину рамки
    let cardWidth =
      baseWidthPerChar * wordLength + paddingPerSide * 2 + outlineWidth * 2;

    // Рассчитываем идеальную ширину одной карточки
    const availableSpace =
      DynamicSizeManager.containerWidth -
      (paddingPerSide * 2 + outlineWidth * 2) * totalWords;
    const idealCardWidth = availableSpace / totalWords;

    // Убедимся, что ширина карточки не превышает максимально возможную идеальную ширину
    cardWidth = Math.min(cardWidth, idealCardWidth);

    // Устанавливаем минимальную ширину карточки для читаемости
    cardWidth = Math.max(cardWidth, 50); // Минимальная ширина карточки

    return `${cardWidth}px`;
  }

  static calculateFontSize(word: string): string {
    const baseSize = 20; // Базовый размер шрифта в пикселях
    const maxLength = 10; // Максимальная длина слова для базового размера
    const wordLength = word.length;

    if (wordLength > maxLength) {
      return `${Math.max(baseSize - (wordLength - maxLength), 16)}px`; // Уменьшаем шрифт для длинных слов, но не меньше 16px
    }
    return `${baseSize}px`; // Базовый размер для слов меньше или равной максимальной длины
  }

  static applyStyles(
    node: HTMLElement,
    word: string,
    totalWords: number
  ): void {
    const cardWidth = DynamicSizeManager.calculateCardWidth(word, totalWords);
    const fontSize = DynamicSizeManager.calculateFontSize(word);

    // Создаем новый объект стилей
    const newStyles = {
      width: cardWidth,
      height: '44px',
      fontSize,
      // display: 'inline-flex',
      // justifyContent: 'center',
      // alignItems: 'center',
      margin: '4px',
      textAlign: 'center',
    };

    // Применяем стили к node
    Object.assign(node.style, newStyles);
  }
}

export default DynamicSizeManager;
