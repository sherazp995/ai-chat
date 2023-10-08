<script setup lang="ts">
import Button from "@src/components/ui/inputs/Button.vue";
import TextInput from "@src/components/ui/inputs/TextInput.vue";
import Typography from "@src/components/ui/data-display/Typography.vue";
import { ref } from "vue";

const emits = defineEmits(["info", "active-section-change"]);
const email = ref("");
const firstName = ref("");
const lastName = ref("");

function handleValueChanged(event: any) {
  if (event.model == "email") {
    email.value = event.value;
  } else if (event.model == "firstName") {
    firstName.value = event.value;
  } else if (event.model == "lastName") {
    lastName.value = event.value;
  }
}

function onSubmit() {
  emits("info", {
    email: email.value,
    firstName: firstName.value,
    lastName: lastName.value,
  });
  emits("active-section-change", {
    sectionName: "password-section",
    animationName: "slide-left",
  });
}
</script>

<template>
  <div>
    <!--form-->
    <form action="#" @submit.prevent="onSubmit" target="_blank" id="info_form">
      <div class="mb-5">
        <TextInput
          label="Email"
          type="email"
          model="email"
          @valueChanged="handleValueChanged"
          placeholder="Enter your email"
          class="mb-5"
        />
        <TextInput
          label="First Name"
          model="firstName"
          @valueChanged="handleValueChanged"
          placeholder="Enter your first name"
          class="mb-5"
        />
        <TextInput
          label="Last Name"
          model="lastName"
          @valueChanged="handleValueChanged"
          placeholder="Enter your last name"
          class="mb-5"
        />
      </div>

      <!--local controls-->
      <div class="mb-6">
        <Button class="w-full mb-4">Next</Button>
      </div>
    </form>

    <!--divider-->
    <div class="mb-6 flex items-center">
      <span
        class="w-full border border-dashed border-gray-100 dark:border-gray-600 rounded-[1px]"
      ></span>
      <Typography variant="body-3" class="px-4 text-opacity-75 font-light">or</Typography>
      <span
        class="w-full border border-dashed border-gray-100 dark:border-gray-600 rounded-[1px]"
      ></span>
    </div>
  </div>
</template>
