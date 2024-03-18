class Draggable {
  private draggedElement: HTMLElement | null = null;

  private sourceContainer: HTMLElement; // Контейнер-источник

  private dropZones: HTMLElement[]; // Контейнер-приемник

  private onDropComplete: () => void;

  constructor(
    sourceContainer: HTMLElement,
    dropZones: HTMLElement[],
    onDropComplete: () => void
  ) {
    this.sourceContainer = sourceContainer;
    this.dropZones = dropZones;

    // Привязываем методы к текущему контексту класса
    this.dragStart = this.dragStart.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.dragDrop = this.dragDrop.bind(this);

    this.onDropComplete = onDropComplete;

    // Добавляем обработчики событий
    this.initEvents();
  }

  private resetDraggedElement(): void {
    if (this.draggedElement) {
      this.draggedElement.style.opacity = '1';
      this.draggedElement = null; // Сбросить ссылку на перетаскиваемый элемент
    }
  }

  private initEvents(): void {
    // Глобальные обработчики событий для dragstart и dragend
    document.addEventListener('dragstart', this.dragStart.bind(this), false);
    document.addEventListener('dragend', this.dragEnd.bind(this), false);

    // Обработчики для dragover и drop для каждой dropZone и sourceContainer
    [...this.dropZones, this.sourceContainer].forEach((container) => {
      container.addEventListener('dragover', this.dragOver.bind(this), false);
      container.addEventListener('drop', this.dragDrop.bind(this), false);
    });
  }

  private dragStart(event: DragEvent): void {
    if (
      event.target instanceof HTMLElement &&
      event.target.getAttribute('draggable')
    ) {
      this.draggedElement = event.target;
      // eslint-disable-next-line no-param-reassign
      event.target.style.opacity = '0.5';
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private dragEnd(event: DragEvent): void {
    if (this.draggedElement) {
      this.draggedElement.style.opacity = '1';
      this.draggedElement = null; // Сбросить ссылку на перетаскиваемый элемент
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private dragOver(event: DragEvent): void {
    event.preventDefault(); // Необходимо для разрешения сброса
  }

  private dragDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.target instanceof HTMLElement && this.draggedElement) {
      // Проверяем, является ли цель сброса одним из dropZones или sourceContainer
      const target = this.dropZones.includes(event.target)
        ? event.target
        : event.target.closest('.dropzone');
      if (target) {
        target.appendChild(this.draggedElement);
        this.resetDraggedElement();
        this.onDropComplete(); // Вызываем колбэк
      }
    }
  }
}

export default Draggable;
