import Router from '../../utils/router';
import { View } from '../model/common';

class AboutView implements View {
  public container: HTMLDivElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.classList.add('about-container');
    document.body.appendChild(this.container);
    this.initializeContent();
  }

  private initializeContent(): void {
    const aboutShadow = document.createElement('div');
    aboutShadow.classList.add('shadow-about');
    this.container.appendChild(aboutShadow);

    const title = document.createElement('h1');
    title.textContent = 'Fun Chat';
    title.classList.add('title-about');
    aboutShadow.appendChild(title);

    const description = document.createElement('p');
    description.textContent =
      'The application is designed to demonstrate the Fun Chat assignment in the RSSchool JS/FE 2023Q3 course. Users and messages are deleted once a day.';
    description.classList.add('text-about');
    aboutShadow.appendChild(description);

    const authorLink = document.createElement('a');
    authorLink.textContent = 'Anna Golosova';
    authorLink.href = 'https://github.com/Golosova76';
    authorLink.target = '_blank';
    authorLink.classList.add('link-about');
    aboutShadow.appendChild(authorLink);

    const backButton = document.createElement('button');
    backButton.textContent = 'Go home';
    backButton.classList.add('button-about');
    backButton.addEventListener('click', () => Router.navigateTo('access'));
    aboutShadow.appendChild(backButton);
  }
}

export default AboutView;
