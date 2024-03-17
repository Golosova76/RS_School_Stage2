class AnimationHelper {
  static applyStyles(element: HTMLElement, styles: { [key: string]: string }) {
    Object.assign(element.style, styles);
  }

  static animateElementMovement(
    element: HTMLElement,
    targetRect: DOMRect,
    onComplete: () => void
  ) {
    const elementRect = element.getBoundingClientRect();
    const deltaX = targetRect.left - elementRect.left;
    const deltaY = targetRect.top - elementRect.top;

    this.applyStyles(element, {
      transition: 'transform 0.5s ease',
      transform: `translate(${deltaX}px, ${deltaY}px)`,
    });

    setTimeout(() => {
      this.applyStyles(element, {
        transition: '',
        transform: '',
      });
      onComplete();
    }, 500);
  }
}
export default AnimationHelper;
