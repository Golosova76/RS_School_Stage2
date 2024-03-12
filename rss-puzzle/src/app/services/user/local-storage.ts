import User from './user-date';

class GameUser extends User {
  constructor() {
    super();
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const data = localStorage.getItem('gameUser');
    if (data) {
      const userData = JSON.parse(data);
      this.gameName = userData.name;
      this.gameSurname = userData.surname;
    }
  }

  public saveToLocalStorage(): void {
    const data = {
      name: this.gameName,
      surname: this.gameSurname,
    };
    localStorage.setItem('gameUser', JSON.stringify(data));
  }

  public clearUserData(): void {
    localStorage.removeItem('gameUser');
    this.gameName = null;
    this.gameSurname = null;
  }
}

export default GameUser;
