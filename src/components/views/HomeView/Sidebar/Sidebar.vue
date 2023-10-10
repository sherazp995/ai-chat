<script setup lang="ts">
import { computed } from "vue";

import useStore from "@src/store/store";

import FadeTransition from "@src/components/ui/transitions/FadeTransition.vue";
import Contacts from "@src/components/views/HomeView/Sidebar/Contacts/Contacts.vue";
import Conversations from "@src/components/views/HomeView/Sidebar/Conversations/Conversations.vue";
import Settings from "@src/components/views/HomeView/Sidebar/Settings/Settings.vue";

const store = useStore();

const props = defineProps<{
  handleConversationChange?: (conversationId: number) => void;
}>();

// the selected sidebar component (e.g message/settings)
const ActiveComponent = computed((): any => {
  if (store.activeSidebarComponent === "messages") {
    return Conversations;
  } else if (store.activeSidebarComponent === "contacts") {
    return Contacts;
  } else if (store.activeSidebarComponent === "settings") {
    return Settings;
  }
});
</script>

<template>
  <aside
    class="xs:w-full md:w-[290px] h-full xs:px-5 md:p-0 flex flex-col overflow-visible transition-all duration-500"
  >
    <FadeTransition>
      <component
        :handle-conversation-change="props.handleConversationChange"
        :is="ActiveComponent"
        class="h-full flex flex-col"
      />
    </FadeTransition>
  </aside>
</template>
