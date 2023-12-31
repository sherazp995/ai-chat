<script setup lang="ts">
import type { Ref } from "vue";

import { computed, provide, ref } from "vue";
import useStore from "@src/store/store";

import ChatBottom from "@src/components/views/HomeView/Chat/ChatBottom/ChatBottom.vue";
import ChatMiddle from "@src/components/views/HomeView/Chat/ChatMiddle/ChatMiddle.vue";
import ChatTop from "@src/components/views/HomeView/Chat/ChatTop/ChatTop.vue";

const store = useStore();
const status = ref(store.status);

// search the selected conversation using activeConversationId.
const activeConversation = computed(() => {
  let activeConversation = store.conversations.find(
    (conversation) => conversation.id === store.activeConversationId
  );

  return activeConversation;
});

// provide the active conversation to all children.
provide("activeConversation", activeConversation.value);

// determines whether select mode is enabled.
const selectMode = ref(false);

// determines whether all the messages are selected or not.
const selectAll = ref(false);

// holds the selected conversations.
const selectedMessages: Ref<number[]> = ref([]);

// (event) add message to select messages.
const handleSelectMessage = (messageId: number) => {
  selectedMessages.value.push(messageId);

  if (
    activeConversation.value &&
    selectedMessages.value.length === activeConversation.value?.messages?.length
  ) {
    selectAll.value = true;
  }

  if (!selectMode.value) {
    selectMode.value = true;
  }
};

// (event) remove message from select messages.
const handleDeselectMessage = (messageId: number) => {
  selectAll.value = false;
  selectedMessages.value = selectedMessages.value.filter((item) => item !== messageId);

  if (activeConversation.value && selectedMessages.value.length === 0) {
    selectMode.value = false;
  }
};

// (event) select all messages.
const handleSelectAll = () => {
  if (activeConversation.value) {
    const messages =
      activeConversation.value?.messages?.map((message) => message.id) || [];
    selectedMessages.value = messages;
    selectAll.value = true;
  }
};

// (event) remove the selected messages.
const handleDeselectAll = () => {
  selectAll.value = false;
  selectedMessages.value = [];
};

// (event handle close Select)
const handleCloseSelect = () => {
  selectMode.value = false;
  selectAll.value = false;
  selectedMessages.value = [];
};

// (event handle close Select)
const statusChange = (data: any) => {
  status.value = data.status;
};
</script>

<template>
  <div v-if="activeConversation" class="h-full flex flex-col scrollbar-hidden">
    <ChatTop
      :select-all="selectAll"
      :select-mode="selectMode"
      :handle-select-all="handleSelectAll"
      :handle-deselect-all="handleDeselectAll"
      :handle-close-select="handleCloseSelect"
    />
    <ChatMiddle
      :status="status"
      :selected-messages="selectedMessages"
      :handle-select-message="handleSelectMessage"
      :handle-deselect-message="handleDeselectMessage"
    />
    <ChatBottom :status="status" @status-change="statusChange" />
  </div>
</template>
