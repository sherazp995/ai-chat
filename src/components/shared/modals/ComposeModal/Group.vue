<script setup lang="ts">
import { computed, ref } from "vue";
import useStore from "@src/store/store";

import GroupInfo from "@src/components/shared/modals/ComposeModal/GroupInfo.vue";
import GroupMembers from "@src/components/shared/modals/ComposeModal/GroupMembers.vue";
import SlideTransition from "@src/components/ui/transitions/SlideTransition.vue";
import type { Ref } from "vue";
import { createConversation } from "@src/store/api";
const store = useStore();

defineEmits(["activePageChange"]);

const props = defineProps<{
  handleConversationChange: (conversationId: number) => void;
}>();

// used to determine whether to slide left or right
const animation = ref("slide-left");

const name = ref('');

const data: Ref<any> = ref();
// name of the active modal page
const activePageName = ref("group-info");

// the active page component
const ActivePage = computed((): any => {
  if (activePageName.value === "group-info") return GroupInfo;
  else if (activePageName.value === "group-members") return GroupMembers;
});

// event to move between modal pages
const changeActiveTab = (event: { tabName: string; animationName: string }) => {
  animation.value = event.animationName;
  activePageName.value = event.tabName;
};

function addGroupName(d: any) {
  // let formdata = new FormData();
  // formdata.append('name', d.name);
  // !!d.avatar && formdata.append('avatar', d.avatar, d.avatar.name);
  // data.value = formdata;
  data.value = {name: d.name}
  // console.log(data.value.get("name"));
  // console.log(data.value.get("avatar"));
}

async function addContacts(contacts: any[]) {
  data.value = {
    ...data.value,
    contacts: [...contacts.map(c => c.id), store.user?.id],
    type: 'group',
    admins: [store.user?.id]
  }
  let conversation = (await createConversation(data.value))
  console.log(conversation);
  if (!!conversation) {
    store.conversations.push(conversation);
    props.handleConversationChange(conversation?.id);
  }
}
</script>

<template>
  <div>
    <!--content-->
    <div class="overflow-x-hidden">
      <SlideTransition :animation="animation">
        <component
          @active-page-change="changeActiveTab"
          :name="name"
          :contacts="addContacts"
          :group-name="addGroupName"
          :is="ActivePage"
          :key="activePageName"
        />
      </SlideTransition>
    </div>
  </div>
</template>
