<script setup lang="ts">
import Button from "@src/components/ui/inputs/Button.vue";
import DropFileUpload from "@src/components/ui/inputs/DropFileUpload.vue";
import TextInput from "@src/components/ui/inputs/TextInput.vue";
import { ref } from "vue";

const props = defineProps<{
  groupName: (obj: any) => void;
  name?: string;
}>();

const name = ref('');
const avatar: any = ref(null);

function onSubmit() {
  props.groupName({name: name.value, avatar: avatar.value});
}

function nameInput() {
  return !name.value ? true : undefined;
}

function handleValueChanged(event: any) {
  if (event.model == "name") {
    name.value = event.value;
  } else if (event.model == "avatar") {
    avatar.value = event.value;
  }
}
</script>

<template>
  <form action="#" @submit.prevent="onSubmit" target="_blank" id="group_name_form" enctype="multipart/form-data">
    <div class="px-5">
      <!--inputs-->
      <div class="mb-5">
        <div class="mb-5">
          <TextInput
            type="text"
            :name="'name'"
            model="name"
            :value="props.name"
            @valueChanged="handleValueChanged"
            placeholder="Group name"
            label="Name"
          />
        </div>

        <div>
          <DropFileUpload :name="'avatar'" model="avatar" @valueChanged="handleValueChanged" label="Avatar" />
        </div>
      </div>

      <!--next button-->
      <div class="flex pb-6">
        <div class="grow"></div>
        <Button
          @click="
            $emit('active-page-change', {
              tabName: 'group-members',
              animationName: 'slide-left',
            })
          "
          :disable="nameInput()"
          class="px-5 bg-indigo-400 hover:bg-indigo-500 active:bg-indigo-500"
        >
          Next
        </Button>
      </div>
    </div>
  </form>
</template>
