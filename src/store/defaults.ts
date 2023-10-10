import { users } from "./api";

export const defaultSettings = [
  {
    lastSeen: false,
    readReceipt: false,
    joiningGroups: false,
    privateMessages: false,
    darkMode: false,
    borderedTheme: false,
  },
];

let u = JSON.parse(localStorage.getItem('ai-chat-user') || '{}');
export const user = {
  ...u, 
  contacts: (await users()).filter(function (contact): boolean {
    return (contact.id !== u.id);
  })
};


export const conversations = [
  {
    id: 35,
    type: "couple",
    draftMessage: "",
    contacts: [
      {
        id: 12,
        email: "user@gmail.com",
        firstName: "Elijah",
        lastName: "Sabrina",
        lastSeen: new Date(),
        avatar:
          "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      },
      {
        id: 13,
        firstName: "Dawn",
        lastName: "Sabrina",
        lastSeen: new Date(),
        email: "sabrina@gmail.com",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      },
    ],
    messages: [
      {
        id: 1,
        content: "Lorem ipsum dolor sit amet.",
        date: "3:00 pm",
        state: "read",
        sender: {
          id: 6,
          email: "user@gmail.com",
          firstName: "Elijah",
          lastName: "Sabrina",
          lastSeen: new Date(),
          avatar:
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        },
      },
      {
        id: 2,
        content: "Lorem ipsum dolor sit amet.",
        date: "4:00 pm",
        state: "sent",
        sender: {
          id: 1,
          firstName: "Dawn",
          lastName: "Sabrina",
          lastSeen: new Date(),
          email: "sabrina@gmail.com",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        },
        replyTo: 1,
      },
      {
        id: 3,
        content: "Lorem ipsum dolor sit amet.",
        date: "3:00 pm",
        state: "read",
        sender: {
          id: 6,
          email: "user@gmail.com",
          firstName: "Elijah",
          lastName: "Sabrina",
          lastSeen: new Date(),
          avatar:
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        },
        replyTo: 2,
      },
      {
        id: 4,
        content: "Check this out https://github.com/",
        date: "4:00 pm",
        state: "read",
        sender: {
          id: 6,
          email: "user@gmail.com",
          firstName: "Elijah",
          lastName: "Sabrina",
          lastSeen: new Date(),
          avatar:
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        },
      },
      {
        id: 5,
        content: "Lorem ipsum dolor sit amet.",
        date: "5:00 pm",
        state: "waiting",
        sender: {
          id: 1,
          firstName: "Dawn",
          lastName: "Sabrina",
          lastSeen: new Date(),
          email: "sabrina@gmail.com",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        },
        replyTo: 4,
      },
    ],
  },

  {
    id: 36,
    type: "couple",
    draftMessage: "",
    contacts: [
      {
        id: 14,
        email: "user@gmail.com",
        firstName: "Dylan",
        lastName: "Billy",
        lastSeen: new Date(),
        avatar:
          "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      },
      {
        id: 15,
        firstName: "Dawn",
        lastName: "Sabrina",
        lastSeen: new Date(),
        email: "sabrina@gmail.com",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      },
    ],
    messages: [
      {
        id: 1,
        content: "Can you send me a link",
        date: "8:15 am",
        state: "read",
        sender: {
          id: 1,
          firstName: "Dawn",
          lastName: "Sabrina",
          lastSeen: new Date(),
          email: "sabrina@gmail.com",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        },
      },
      {
        id: 3,
        content: "It’s about stopping drugs",
        date: "1:05 pm",
        state: "read",
        sender: {
          id: 5,
          email: "user@gmail.com",
          firstName: "Dylan",
          lastName: "Billy",
          lastSeen: new Date(),
          avatar:
            "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        },
      },
      {
        id: 4,
        content: "Can you send me a link",
        date: "1:15 pm",
        state: "read",
        sender: {
          id: 1,
          firstName: "Dawn",
          lastName: "Sabrina",
          lastSeen: new Date(),
          email: "sabrina@gmail.com",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        },
      },
      {
        id: 6,
        content: "Hey there, check this out",
        date: "1:30 pm",
        state: "read",
        attachments: [
          {
            id: 14,
            type: "image",
            name: "forest.jpg",
            size: "20 MB",
            url: "https://images.unsplash.com/photo-1664021975758-78d83898225d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
          },
          {
            id: 15,
            type: "image",
            name: "forest.jpg",
            size: "20 MB",
            url: "https://images.unsplash.com/photo-1664021975758-78d83898225d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
          },
        ],
        sender: {
          id: 5,
          email: "user@gmail.com",
          firstName: "Dylan",
          lastName: "Billy",
          lastSeen: new Date(),
          avatar:
            "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        },
      },
      {
        id: 7,
        content: "Wow, really cool",
        date: "1:30 pm",
        state: "read",
        sender: {
          id: 1,
          firstName: "Dawn",
          lastName: "Sabrina",
          lastSeen: new Date(),
          email: "sabrina@gmail.com",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        },
      },
      {
        id: 8,
        content: "You're welcome",
        date: "1:30 pm",
        state: "read",
        sender: {
          id: 5,
          email: "user@gmail.com",
          firstName: "Dylan",
          lastName: "Billy",
          lastSeen: new Date(),
          avatar:
            "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        },
      },
    ],
  },

  {
    id: 37,
    type: "group",
    name: "Design Team",
    avatar:
      "https://images.unsplash.com/photo-1573867639040-6dd25fa5f597?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    admins: [1],
    draftMessage: "",
    contacts: [
      {
        id: 16,
        firstName: "Dawn",
        lastName: "Sabrina",
        lastSeen: new Date(),
        email: "sabrina@gmail.com",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      },
      {
        id: 24,
        email: "user@gmail.com",
        firstName: "Ahmed",
        lastName: "Ali",
        lastSeen: new Date(),
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      },
      {
        id: 36,
        email: "user@gmail.com",
        firstName: "Allen",
        lastName: "Carr",
        lastSeen: new Date(),
        avatar:
          "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      },
    ],
    messages: [
      {
        id: 1,
        content: "Hey there",
        date: "1:00 pm",
        state: "read",
        sender: {
          id: 1,
          firstName: "Dawn",
          lastName: "Sabrina",
          lastSeen: new Date(),
          email: "sabrina@gmail.com",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        },
      },
      {
        id: 2,
        content: "I got a new dog",
        date: "2:00 pm",
        state: "read",
        sender: {
          id: 2,
          email: "user@gmail.com",
          firstName: "Ahmed",
          lastName: "Ali",
          lastSeen: new Date(),
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        },
      },
      {
        id: 3,
        content: "Oh, ok good to know.",
        date: "5:00 pm",
        state: "read",
        sender: {
          id: 1,
          firstName: "Dawn",
          lastName: "Sabrina",
          lastSeen: new Date(),
          email: "sabrina@gmail.com",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        },
      },
      {
        id: 4,
        content: "It was great catching up with you the other day",
        date: "3:00 pm",
        state: "read",
        sender: {
          id: 3,
          email: "user@gmail.com",
          firstName: "Allen",
          lastName: "Carr",
          lastSeen: new Date(),
          avatar:
            "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        },
      },
      {
        id: 5,
        content: "Thank you very much.",
        date: "3:00 pm",
        state: "read",
        sender: {
          id: 1,
          firstName: "Dawn",
          lastName: "Sabrina",
          lastSeen: new Date(),
          email: "sabrina@gmail.com",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        },
      },
      {
        id: 6,
        content: "Lets meet agian next week.",
        date: "5:00 pm",
        state: "read",
        sender: {
          id: 1,
          firstName: "Dawn",
          lastName: "Sabrina",
          lastSeen: new Date(),
          email: "sabrina@gmail.com",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        },
      },
      {
        id: 7,
        content: "Ok next week then.",
        date: "5:00 pm",
        state: "read",
        sender: {
          id: 2,
          email: "user@gmail.com",
          firstName: "Ahmed",
          lastName: "Ali",
          lastSeen: new Date(),
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
        },
      },
    ],
  },
];

export const fetchData = async () => {
  return await {
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
