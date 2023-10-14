import { users, allConversations } from "./api";

export const defaultSettings = {
  lastSeen: false,
  readReceipt: false,
  joiningGroups: false,
  privateMessages: false,
  darkMode: false,
  borderedTheme: false,
};

let u = JSON.parse(localStorage.getItem('ai-chat-user') || 'null');
if (!u && location.pathname == '/'){
  location.pathname = '/access/sign-in'
}
export const user = {
  ...u, 
  contacts: (await users())
  .filter((contact: any) => {
    return (contact.id !== u.id);
  })
};

export const conversations = await allConversations(user.id);

export const fetchData = () => {
  return {
    data: {
      user: user,
      conversations: conversations,
    },
  };
};

export const updateAccount = async () => {
  return await {
    data: {
      detail: "Your account has been updated successfully",
    },
  };
};

export default {
  defaultSettings,
  conversations,
  user,
} as const;
