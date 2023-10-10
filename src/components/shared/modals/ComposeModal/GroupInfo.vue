<script setup lang="ts">
import Button from "@src/components/ui/inputs/Button.vue";
import DropFileUpload from "@src/components/ui/inputs/DropFileUpload.vue";
import TextInput from "@src/components/ui/inputs/TextInput.vue";

const props = defineProps<{
  groupName: (obj: any) => void;
}>();

function onSubmit() {
  let form: any = document.getElementById("group_name_form");
  let formData = new FormData(form);
  // formData.append("name", form?.querySelector('input[type="text"]')?.value);
  // let file = form?.querySelector('input[type="file"]')?.files[0];
  // console.log(file);
  // file && formData.append("avatar", file, file.name);
  // console.log(formData.get("avatar"));
  props.groupName(formData);
}
</script>

<template>
  <form action="#" @submit.prevent="onSubmit" target="_blank" id="group_name_form">
    <div class="px-5">
      <!--inputs-->
      <div class="mb-5">
        <div class="mb-5">
          <TextInput
            type="text"
            :required="'true'"
            :name="'name'"
            placeholder="Group name"
            label="Name"
          />
        </div>

        <div>
          <DropFileUpload :name="'avatar'" label="Avatar" />
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
          class="px-5 bg-indigo-400 hover:bg-indigo-500 active:bg-indigo-500"
        >
          Next
        </Button>
      </div>
    </div>
  </form>
</template>
