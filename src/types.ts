export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  token: string;
  lastSeen: Date;
  contacts?: IContact[];
}

export interface IContact {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  lastSeen: Date;
}

export interface IPreviewData {
  title: string;
  image?: string;
  description: string;
  domain: string;
  link: string;
}

export interface IRecording {
  id: number;
  size: string;
  src: string;
  duration: string;
  file?: File;
}

export interface IMessage {
  id: number;
  type?: string;
  content?: string | IRecording;
  date: string;
  sender: IContact;
  replyTo?: number;
  previewData?: IPreviewData;
  state: string;
}

export interface IConversation {
  id?: number;
  type?: string;
  name?: string;
  avatar?: string;
  admins?: number[];
  contacts?: IContact[];
  messages?: IMessage[];
  pinnedMessage?: IMessage;
  pinnedMessageHidden?: boolean;
  replyMessage?: IMessage;
  unread?: number;
  draftMessage?: string;
}

export interface IContactGroup {
  letter: string;
  contacts?: IContact[];
}

export interface ISettings {
  lastSeen: boolean;
  readReceipt: boolean;
  joiningGroups: boolean;
  privateMessages: boolean;
  darkMode: boolean;
  borderedTheme: boolean;
}
