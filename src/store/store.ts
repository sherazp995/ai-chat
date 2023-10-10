import { defineStore } from "pinia";
import type { Ref } from "vue";
import { computed, ref } from "vue";

import defaults from "@src/store/defaults";
import type {
  IConversation,
  IContactGroup,
  IUser,
  ISettings,
} from "@src/types";

const useStore = defineStore("chat", () => {
  // local storage
  const storage = JSON.parse(localStorage.getItem("chat") || "{}");

  // app status refs
  const status = ref("idle");

  // app data refs
  // data refs
  const user: Ref<IUser | undefined> = ref(JSON.parse(localStorage.getItem('ai-chat-user') || 'null') || defaults.user);
  const conversations: Ref<IConversation[]> = ref(defaults.conversations || []);
  const settings: Ref<ISettings> = ref(
    storage.settings || defaults.defaultSettings
  );
  // ui refs
  const activeSidebarComponent: Ref<string> = ref(
    storage.activeSidebarComponent || "messages"
  );
  const delayLoading = ref(true);
  // The conversation which is open by default
  const activeConversationId: Ref<number | null> = ref(null);
  const conversationOpen: Ref<string | undefined> = ref(
    storage.conversationOpen
  );
  // contacts grouped alphabetically.
  const contactGroups: Ref<IContactGroup[] | undefined> = computed(() => {
    if (user?.value?.contacts) {
      let sortedContacts = [...user?.value?.contacts];

      sortedContacts.sort();

      let groups: IContactGroup[] = [];
      let currentLetter: string = "";
      let groupNames: string[] = [];

      // create an array of letter for every different sort level.
      for (let contact of sortedContacts) {
        // if the first letter is different create a new group.
        if (contact.firstName[0].toUpperCase() !== currentLetter) {
          currentLetter = contact.firstName[0].toUpperCase();
          groupNames.push(currentLetter);
        }
      }

      // create an array that groups contact names based on the first letter;
      for (let groupName of groupNames) {
        let group: IContactGroup = { letter: groupName, contacts: [] };
        for (let contact of sortedContacts) {
          if (contact.firstName[0].toUpperCase() === groupName) {
            group?.contacts?.push(contact);
          }
        }
        groups.push(group);
      }

      return groups;
    }
  });

  const getStatus = computed(() => status);

  return {
    // status refs
    status,
    getStatus,

    // data refs
    user,
    conversations,
    contactGroups,
    settings,
    // ui refs
    activeSidebarComponent,
    delayLoading,
    activeConversationId,
    conversationOpen,
  };
});

export default useStore;
