import { modalElements } from '@js/modal.js';

function hideModal() {
  if (modalElements && modalElements.modal) {
    modalElements.modal.style.opacity = '0';
    modalElements.modal.style.visibility = 'hidden';
    modalElements.modalContent.style.opacity = '0';
    modalElements.modalContent.style.transform =
      'perspective(600px) translate(0px, -100%) rotateX(45deg)';
  }
}
export default hideModal;
