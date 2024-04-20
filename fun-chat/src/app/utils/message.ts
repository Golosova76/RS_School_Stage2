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

    const messageDate = document.createElement('span');
    messageDate.className = 'message-date';

    messageControls.appendChild(youUser);
    messageControls.appendChild(messageDate);

    const messageText = document.createElement('div');
    messageText.className = 'message-text';

    const messageStatus = document.createElement('div');
    messageStatus.className = 'message-status';

    const statusSpan = document.createElement('span');
    statusSpan.className = 'status';

    messageStatus.appendChild(statusSpan);

    messageContainer.appendChild(messageControls);
    messageContainer.appendChild(messageText);
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
