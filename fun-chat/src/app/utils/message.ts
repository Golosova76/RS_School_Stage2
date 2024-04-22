class MessageUsers {
  container: HTMLElement;

  messageText!: HTMLDivElement;

  messageDate!: HTMLSpanElement;

  statusSpan!: HTMLSpanElement;

  constructor() {
    this.container = this.createMessageStructure();
  }

  // eslint-disable-next-line class-methods-use-this
  public createMessageStructure(): HTMLElement {
    const userMessageContainer = document.createElement('div');
    userMessageContainer.className = 'user-message-container';

    const messageContainer = document.createElement('div');
    messageContainer.className = 'message-container';

    const messageControls = document.createElement('div');
    messageControls.className = 'message-controls';

    const youUser = document.createElement('span');
    youUser.className = 'you-user';

    this.messageDate = document.createElement('span');
    this.messageDate.className = 'message-date';

    messageControls.appendChild(youUser);
    messageControls.appendChild(this.messageDate);

    this.messageText = document.createElement('div');
    this.messageText.className = 'message-text';

    const messageStatus = document.createElement('div');
    messageStatus.className = 'message-status';

    this.statusSpan = document.createElement('span');
    this.statusSpan.className = 'status';

    messageStatus.appendChild(this.statusSpan);

    messageContainer.appendChild(messageControls);
    messageContainer.appendChild(this.messageText);
    messageContainer.appendChild(messageStatus);

    userMessageContainer.appendChild(messageContainer);

    return userMessageContainer;
  }

  setMessageText(text: string): void {
    this.messageText.textContent = text;
  }

  setMessageDate(date: string): void {
    this.messageDate.textContent = date;
  }

  setMessageStatus(status: string): void {
    this.statusSpan.textContent = status;
  }

  appendToParent(parentElement: HTMLElement): void {
    parentElement.appendChild(this.container);
  }
}

export default MessageUsers;
