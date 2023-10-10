import type {
  IContact,
  IConversation,
  IMessage,
  IRecording,
} from "@src/types";
import useStore from "@src/store/store";

/**
 * combine first name and last name of a contact.
 * @param contact
 * @returns A string the combines the first and last names.
 */
export const getFullName = (contact: IContact) => {
  return contact.firstName + " " + contact.lastName;
};

/**
 * get the other contact that is not the authenticated user.
 * @param conversation
 * @returns A contact object representing the other user in the conversation.
 */
export const getOddContact = (conversation: IConversation) => {
  const store = useStore();

  let oddContact;

  for (let contact of (conversation?.contacts || [])) {
    if (store.user && contact.id !== store.user.id) {
      oddContact = contact;
    }
  }

  return oddContact;
};

/**
 * get avatar based on conversation type.
 * @param conversation
 * @returns A string representing the url to the avatar image
 */
export const getAvatar = (conversation: IConversation) => {
  if (["group", "broadcast"].includes(conversation.type)) {
    return conversation?.avatar;
  } else {
    let oddContact = getOddContact(conversation);
    return oddContact?.avatar;
  }
};

/**
 * get name based on conversation type.
 * @param conversation
 * @returns String
 */
export const getName = (conversation: IConversation) => {
  if (["group", "broadcast"].includes(conversation.type)) {
    return conversation?.name;
  } else {
    let oddContact = getOddContact(conversation);
    if (oddContact) {
      return getFullName(oddContact);
    }
  }
};

/**
 * trim a string when it reaches a certain length and adds three dots
 * at the end.
 * @param text
 * @param maxLength
 * @returns A string that is trimmed according the length provided
 */
export const shorten = (message: IMessage | string | undefined | null, maxLength: number = 23) => {
  let text: string | IRecording | undefined;
  
  if (!!message){
    if (typeof message === "string") {
      text = message;
    } else {
      text = message.content;
    }
  }

  if (text && typeof text === "string") {
    let trimmedString = text;
    if (text.length > maxLength) {
      // trim the string to the maximum length.
      trimmedString = trimmedString.slice(0, maxLength);
      // add three dots to indicate that there is more to the message.
      trimmedString += "...";
    }
    return trimmedString;
  }

  return "";
};

/**
 * get index of the conversation inside the conversations array
 * @param conversationId
 * @returns A number indicating the index of the conversation.
 */
export const getConversationIndex = (
  conversationId: number
): number | undefined => {
  let conversationIndex;
  const store = useStore();

  store.conversations.forEach((conversation, index) => {
    if (conversation.id === conversationId) {
      conversationIndex = index;
    }
  });

  return conversationIndex;
};

export const getMessageById = (
  conversation: IConversation,
  messageId?: number
) => {
  if (messageId) {
    return conversation.messages?.find((message) => message.id === messageId);
  }
};
