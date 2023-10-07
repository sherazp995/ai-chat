<script setup lang="ts">
import type { Ref } from "vue";
import type { IConversation } from "@src/types";

import useStore from "@src/store/store";
import { ref, inject, onMounted } from "vue";
import { getConversationIndex } from "@src/utils";

import {
  PaperAirplaneIcon
} from "@heroicons/vue/24/outline";
import IconButton from "@src/components/ui/inputs/IconButton.vue";
import ReplyMessage from "@src/components/views/HomeView/Chat/ChatBottom/ReplyMessage.vue";
import Textarea from "@src/components/ui/inputs/Textarea.vue";

const store = useStore();

const activeConversation = <IConversation>inject("activeConversation");

// the content of the message.
const value: Ref<string> = ref("");

// determines whether the app is recording or not.
const recording = ref(false);

// (event) set the draft message equals the content of the text area
const handleSetDraft = () => {
  const index = getConversationIndex(activeConversation.id);
  if (index !== undefined) {
    store.conversations[index].draftMessage = value.value;
  }
};

onMounted(() => {
  value.value = activeConversation.draftMessage;
});
</script>

<template>
  <div class="w-full">
    <!--selected reply display-->
    <div
      class="relative transition-all duration-200"
      :class="{ 'pt-[60px]': activeConversation?.replyMessage }"
    >
      <ReplyMessage />
    </div>

    <div
      class="h-auto min-h-[84px] p-5 flex items-end"
      v-if="store.status !== 'loading'"
      :class="recording ? ['justify-between'] : []"
    >

      <!--message textarea-->
      <div class="grow md:mr-5 xs:mr-4 self-end" v-if="!recording">
        <div class="relative">
          <Textarea
            v-model="value"
            @input="handleSetDraft"
            :value="value"
            class="max-h-[80px] pr-[50px] resize-none scrollbar-hidden"
            auto-resize
            cols="30"
            rows="1"
            placeholder="Write your message here"
            aria-label="Write your message here"
          />
        </div>
      </div>

      <div class="min-h-[44px] flex">
        <!--send message button-->
        <IconButton
          v-if="!recording"
          class="group w-7 h-7 bg-indigo-300 hover:bg-indigo-400 focus:bg-indigo-400 dark:focus:bg-indigo-300 dark:bg-indigo-400 dark:hover:bg-indigo-400 active:scale-110"
          variant="ghost"
          title="send message"
          aria-label="send message"
        >
          <PaperAirplaneIcon class="w-[17px] h-[17px] text-white" />
        </IconButton>
      </div>
    </div>
  </div>
</template>
