<script setup lang="ts">
import useStore from "@src/store/store";

import NoContacts from "@src/components/states/empty-states/NoContacts.vue";
import Loading1 from "@src/components/states/loading-states/Loading1.vue";
import SearchInput from "@src/components/ui/inputs/SearchInput.vue";
import ContactItem from "@src/components/shared/blocks/ContactItem.vue";
import ScrollBox from "@src/components/ui/utils/ScrollBox.vue";
import { createConversation } from "@src/store/api"

const store = useStore();
const emits = defineEmits(["select-conversation"]);

const props = defineProps<{
  handleConversationChange: (conversationId: number) => void;
}>();
async function addNewConversation(contact: any) {
  console.log(contact);
  let conversation = store.conversations.find(
    (c: any) =>
      c.contacts.filter((u: any) => [store.user?.id, contact.id].includes(u.id)).length >
      1
  );
  console.log(conversation);
  if (!conversation) {
    let c = {
      name: `${contact.firstName} ${contact.lastName}`,
      type: "couple",
      draftMessage: "",
      avatar: contact.avatar,
      contacts: [contact.id, store.user?.id]
    }
    conversation = await createConversation(c);
  console.log(conversation);

    // if conversation not found. make one
    if(!!conversation)
    store.conversations.push(conversation);
  }
  if(!!conversation)
  props.handleConversationChange(conversation?.id)
}
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
