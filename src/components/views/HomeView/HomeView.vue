<script setup lang="ts">
import { computed } from "vue";

import useStore from "@src/store/store";

import Chat from "@src/components/views/HomeView/Chat/Chat.vue";
import Navigation from "@src/components/views/HomeView/Navigation/Navigation.vue";
import Sidebar from "@src/components/views/HomeView/Sidebar/Sidebar.vue";
import NoChatSelected from "@src/components/states/empty-states/NoChatSelected.vue";
import Loading3 from "@src/components/states/loading-states/Loading3.vue";
import FadeTransition from "@src/components/ui/transitions/FadeTransition.vue";
import { allMessages } from "@src/store/api";
import { getConversationIndex } from "@src/utils";

const store = useStore();

// the active chat component or loading component.
const activeChatComponent = computed((): any => {
  if (store.status === "loading" || store.delayLoading) {
    return Loading3;
  } else if (store.activeConversationId) {
    return Chat;
  } else {
    return NoChatSelected;
  }
});

// (event) switch between the rendered conversations.
const handleConversationChange = async (conversationId: number) => {
  store.activeSidebarComponent = "messages";
  store.activeConversationId = conversationId;
  const index = getConversationIndex(conversationId);
  store.conversations[index].messages = await allMessages();
  store.conversationOpen = "open";
};
</script>

<template>
  <KeepAlive>
    <div
      class="xs:relative md:static h-full flex xs:flex-col md:flex-row overflow-hidden"
    >
      <!--navigation-bar-->
      <Navigation class="xs:order-1 md:-order-none" />
      <!--sidebar-->
      <Sidebar
        :handle-conversation-change="handleConversationChange"
        class="xs:grow-1 md:grow-0 xs:overflow-y-scroll md:overflow-visible scrollbar-hidden"
      />
      <!--chat-->
      <div
        id="mainContent"
        class="xs:absolute xs:z-10 md:static grow h-full xs:w-full md:w-fit scrollbar-hidden bg-white dark:bg-gray-800 transition-all duration-500"
        :class="
          store.conversationOpen === 'open'
            ? ['xs:left-[0px]', 'xs:static']
            : ['xs:left-[1000px]']
        "
        role="region"
      >
        <FadeTransition name="fade" mode="out-in">
          <component :is="activeChatComponent" :key="store.activeConversationId" />
        </FadeTransition>
      </div>
    </div>
  </KeepAlive>
</template>
