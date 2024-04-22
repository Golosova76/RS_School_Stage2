export interface View {
  container: HTMLDivElement;
}

export interface User {
  login: string;
  isLogined: boolean;
}

export type Users = User[];

export interface MessageStatus {
  isDelivered: boolean;
  isReaded: boolean;
  isEdited: boolean;
}

export interface MessageInfo {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: MessageStatus;
}

export interface ServerMessage {
  id: string;
  type: string;
  payload: {
    message: MessageInfo;
  };
}
