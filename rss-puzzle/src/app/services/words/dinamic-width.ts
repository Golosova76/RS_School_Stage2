class DynamicSizeManager {
  static containerWidth: number = 924; // Ширина контейнера в пикселях

  static calculateCardWidth(word: string, totalWords: number): string {
    const baseWidthPerChar = 12; // Базовая ширина на символ
    const outlineWidth = 2; // Толщина рамки
    const margin = 4; // Отступ между карточками
    const totalMargins = margin * (totalWords - 1); // Общий размер всех отступов

    // Рассчитываем базовую ширину одной карточки
    const baseCardWidth = baseWidthPerChar * word.length + outlineWidth * 2;

    // Рассчитываем общую базовую ширину всех карточек
    const totalBaseWidth = baseCardWidth * totalWords;

    // Рассчитываем доступное пространство с учетом отступов
    const availableSpace =
      DynamicSizeManager.containerWidth - totalBaseWidth - totalMargins;

    // Добавляем к каждой карточке равную долю доступного пространства
    let cardWidth = baseCardWidth + availableSpace / totalWords;

    // Устанавливаем минимальную ширину карточки для читаемости
    const minWidth = baseWidthPerChar * word.length + outlineWidth * 2;
    cardWidth = Math.max(cardWidth, minWidth);

    // Округляем ширину карточки до целого числа пикселей
    cardWidth = Math.floor(cardWidth);

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
      margin: '0 4px',
      textAlign: 'center',
    };

    // Применяем стили к node
    Object.assign(node.style, newStyles);
  }
}

export default DynamicSizeManager;
