function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';

  const footerContainer = document.createElement('div');
  footerContainer.className = 'footer__container';

  const footerYear = document.createElement('div');
  footerYear.className = 'footer__year';
  footerYear.textContent = '2024';

  const footerLink = document.createElement('a');
  footerLink.className = 'footer__link';
  footerLink.textContent = 'Anna Golosova';
  footerLink.href = 'https://github.com/Golosova76';
  footerLink.target = '_blank';

  footerContainer.appendChild(footerYear);
  footerContainer.appendChild(footerLink);
  footer.appendChild(footerContainer);

  return footer;
}

export default createFooter;
