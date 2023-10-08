<script setup lang="ts">
import { ref } from "vue";

import { EyeSlashIcon, EyeIcon } from "@heroicons/vue/24/outline";
import IconButton from "@src/components/ui/inputs/IconButton.vue";
import TextInput from "@src/components/ui/inputs/TextInput.vue";
import Button from "@src/components/ui/inputs/Button.vue";

const emits = defineEmits(["submit", "active-section-change"]);
const showPassword = ref(false);
const showPasswordConfirm = ref(false);

const password = ref("");
const passwordConfirm = ref("");

function handleValueChanged(event: any) {
  if (event.model == "password") {
    password.value = event.value;
  } else if (event.model == "passwordConfirm") {
    passwordConfirm.value = event.value;
  }
}

function onSubmit() {
  password.value == passwordConfirm.value
    ? emits("submit", {
        password: password.value,
      })
    : console.log("wrong confirm password");
}
</script>

<template>
  <form action="#" @submit.prevent="onSubmit" target="_blank" id="password_form">
    <div class="mb-5">
      <!--form-->
      <TextInput
        label="Password"
        placeholder="Enter your password"
        model="password"
        :type="showPassword ? 'text' : 'password'"
        @valueChanged="handleValueChanged"
        class="pr-[40px] mb-5"
      >
        <template v-slot:endAdornment>
          <IconButton
            title="toggle password visibility"
            aria-label="toggle password visibility"
            class="m-[8px] p-2"
            type="button"
            @click="showPassword = !showPassword"
          >
            <EyeSlashIcon
              v-if="showPassword"
              class="w-5 h-5 text-black opacity-50 dark:text-white dark:opacity-60"
            />
            <EyeIcon
              v-else
              class="w-5 h-5 text-black opacity-50 dark:text-white dark:opacity-60"
            />
          </IconButton>
        </template>
      </TextInput>

      <TextInput
        label="Confirm Password"
        placeholder="Enter your password"
        model="passwordConfirm"
        @valueChanged="handleValueChanged"
        :type="showPasswordConfirm ? 'text' : 'password'"
      >
        <template v-slot:endAdornment>
          <IconButton
            title="toggle password visibility"
            aria-label="toggle password visibility"
            class="m-[8px] p-2"
            type="button"
            @click="showPasswordConfirm = !showPasswordConfirm"
          >
            <EyeSlashIcon
              v-if="showPasswordConfirm"
              class="w-5 h-5 text-black opacity-50 dark:text-white dark:opacity-60"
            />
            <EyeIcon
              v-else
              class="w-5 h-5 text-black opacity-50 dark:text-white dark:opacity-60"
            />
          </IconButton>
        </template>
      </TextInput>
    </div>

    <!--controls-->
    <div class="mb-5">
      <Button class="w-full mb-4" type="submit">Sign up</Button>
      <Button
        variant="outlined"
        class="w-full"
        @click="
          $emit('active-section-change', {
            sectionName: 'personal-section',
            animationName: 'slide-right',
          })
        "
      >
        Back
      </Button>
    </div>
  </form>
</template>
