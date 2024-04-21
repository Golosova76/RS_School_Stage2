export interface View {
  container: HTMLDivElement;
}

export interface User {
  login: string;
  isLogined: boolean;
}

export type Users = User[];
