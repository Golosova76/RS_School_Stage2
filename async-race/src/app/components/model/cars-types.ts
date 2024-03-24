export interface CarInterface {
  id?: number;
  name: string;
  color: string;
}

// или класс?
export class Car {
  public id: number;

  public name: string;

  public color: string;

  constructor(id: number, name: string, color: string) {
    this.id = id;
    this.name = name;
    this.color = color;
  }
}
