import { Component, InterComponent } from '../base-component';

class ArticleWelcomeComponent extends Component<InterComponent> {
  private spanGreeting: Component<InterComponent>;

  constructor() {
    super({ tag: 'article', className: 'article-welcome' });
    this.spanGreeting = this.createArticleWComponents();
  }

  private createArticleWComponents(): Component<InterComponent> {
    const divDescription = new Component<InterComponent>({
      tag: 'div',
      className: 'article-welcome__text',
      // text: '2024',
    });

    const paraghOne = new Component<InterComponent>({
      tag: 'p',
      // className: 'article-welcome__text',
      text: 'Embark on an enlightening journey with RSS Puzzle, a unique mini-game that combines language learning with art history to enhance your English mastery in an engaging way.',
    });

    const paraghTwo = new Component<InterComponent>({
      tag: 'p',
      // className: 'article-welcome__text',
      text: 'In this interactive experience, players piece together sentences from word puzzles, revealing stunning artworks by renowned painters with each level completed.',
    });
    divDescription.append(paraghOne);
    divDescription.append(paraghTwo);

    const divGreetingContainer = new Component<InterComponent>({
      tag: 'div',
      className: 'article-welcome__greeting',
      // text: '2024',
    });

    const spanGreeting = new Component<InterComponent>({
      tag: 'span',
      className: 'article-welcome__span',
      // text: '',
    });
    divGreetingContainer.append(spanGreeting);

    this.append(divDescription);
    this.append(divGreetingContainer);

    return spanGreeting;
  }

  public setUserGreeting(name?: string, surname?: string): void {
    // Установка текста приветствия с использованием метода setTextContent
    const greetingText = `Welcome to the game, ${name || 'Гость'} ${
      surname || ''
    }!`;
    this.spanGreeting.setTextContent(greetingText);
    this.spanGreeting.getNode().classList.add('zoom-in');
  }

  public appendToArticleWDirectly(child: Component<InterComponent>): void {
    // метод append базового класса для добавления элемента непосредственно в article
    this.append(child);
  }
}

export default ArticleWelcomeComponent;
