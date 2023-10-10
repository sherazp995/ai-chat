<script setup lang="ts">
import useStore from "@src/store/store";

import NoContacts from "@src/components/states/empty-states/NoContacts.vue";
import Loading1 from "@src/components/states/loading-states/Loading1.vue";
import SearchInput from "@src/components/ui/inputs/SearchInput.vue";
import ContactItem from "@src/components/shared/blocks/ContactItem.vue";
import ScrollBox from "@src/components/ui/utils/ScrollBox.vue";
import { createConversation } from "@src/store/api";

const store = useStore();
const emits = defineEmits(["select-conversation"]);

const props = defineProps<{
  handleConversationChange: (conversationId: number) => void;
}>();

async function addNewConversation(contact: any) {
  let conversation = store.conversations.find((conv: any) => {
    return (
      conv.type === "couple" && conv.contacts.map((c: any) => c.id).includes(contact.id)
    );
  });
  if (!conversation) {
    let c = {
      name: `${contact.firstName} ${contact.lastName}`,
      type: "couple",
      draftMessage: "",
      avatar: contact.avatar,
      contacts: [contact.id, store.user?.id],
    };
    conversation = await createConversation(c);
    if (!!conversation) store.conversations.push(conversation);
  }
  if (!!conversation) props.handleConversationChange(conversation?.id);
}

// function filterContactWithConversation(){
//   .filter((c) => {
//           !store.conversations.find((conv: any) => {
//             const a = conv.contacts.sort()
//             const b = [c.id, store.user?.id].sort()
//             return (conv.type === 'couple' &&  a == b)
//           })
//         })
// }
</script>

<template>
  <div class="pb-6">
    <!--search-->
    <div class="mx-5 mb-5">
      <SearchInput />
    </div>

    <!--contacts-->
    <ScrollBox class="overflow-y-scroll max-h-[200px]">
      <Loading1
        v-if="store.status === 'loading' || store.delayLoading"
        v-for="item in 3"
      />

      <ContactItem
        v-else-if="
          store.status === 'success' &&
          !store.delayLoading &&
          store.user &&
          store.user?.contacts &&
          store.user?.contacts.length > 0
        "
        v-for="(contact, index) in store.user.contacts"
        @contactSelected="addNewConversation"
        :key="index"
        :contact="contact"
      />

      <NoContacts vertical v-else />
    </ScrollBox>
  </div>
</template>
