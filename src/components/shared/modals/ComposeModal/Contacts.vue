<script setup lang="ts">
import useStore from "@src/store/store";

import NoContacts from "@src/components/states/empty-states/NoContacts.vue";
import Loading1 from "@src/components/states/loading-states/Loading1.vue";
import SearchInput from "@src/components/ui/inputs/SearchInput.vue";
import ContactItem from "@src/components/shared/blocks/ContactItem.vue";
import ScrollBox from "@src/components/ui/utils/ScrollBox.vue";

const store = useStore();

function addNewConversation(contact: any) {
  console.log(contact);
  let conversation = store.conversations.find(
    (c: any) =>
      c.contacts.filter((u: any) => [store.user?.id, contact.id].includes(u.id)).length >
      1
  );
  if (conversation) {
  } else {
    // if conversation not found. make one
    store.conversations.push({
      id: null,
      type: "couple",
      draftMessage: "",
      contacts: [contact, store.user],
    });
  }
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
        @click="addNewConversation(contact)"
        :key="index"
        :contact="contact"
      />

      <NoContacts vertical v-else />
    </ScrollBox>
  </div>
</template>
