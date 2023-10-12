<script setup lang="ts">
import { ref } from "vue";

import Typography from "@src/components/ui/data-display/Typography.vue";
import Button from "@src/components/ui/inputs/Button.vue";
import TextInput from "@src/components/ui/inputs/TextInput.vue";
import { RouterLink } from "vue-router";
import { login } from "@src/store/api";
import router from "@src/router";
import { fetchData } from "@src/store/defaults";
import useStore from "@src/store/store";

let store = useStore();

const email = ref("");
const password = ref("");

function handleValueChanged(event: any) {
  if (event.model == "email") {
    email.value = event.value;
  } else if (event.model == "password") {
    password.value = event.value;
  }
}
async function onSubmit() {
  let formData = {
    email: email.value,
    password: password.value,
  };
  if (await login(formData)) {
    store = { ...store, ...fetchData().data };
    router.push("/");
  }
}
</script>

<template>
  <div class="p-5 md:basis-1/2 xs:basis-full flex flex-col justify-center items-center">
    <div class="w-full md:px-[26%] xs:px-[10%]">
      <!--header-->
      <div class="mb-6 flex flex-col">
        <img
          src="@src/assets/vectors/logo-gradient.svg"
          class="w-[22px] h-[18px] mb-4 opacity-70"
          alt="bird logo"
        />
        <Typography variant="heading-2" class="mb-4">Welcome back</Typography>
        <Typography variant="body-3" class="text-opacity-75 font-light">
          Create an account a start messaging now!
        </Typography>
      </div>

      <!--form-->
      <form action="#" @submit.prevent="onSubmit" target="_blank" id="login_form">
        <div class="mb-6">
          <TextInput
            label="Email"
            model="email"
            type="email"
            @valueChanged="handleValueChanged"
            placeholder="Enter your email"
            class="mb-5"
            required="required"
          />
          <TextInput
            label="Password"
            model="password"
            type="password"
            @valueChanged="handleValueChanged"
            placeholder="Enter your password"
            class="pr-[40px]"
            required="required"
          >
          </TextInput>
        </div>

        <!--local controls-->
        <div class="mb-6">
          <Button class="w-full mb-4">Sign in</Button>
        </div>
      </form>
      <!--divider-->
      <div class="mb-6 flex items-center">
        <span
          class="w-full border border-dashed border-gray-100 dark:border-gray-600 rounded-[1px]"
        ></span>
        <Typography variant="body-3" class="px-4 text-opacity-75 font-light"
          >or</Typography
        >
        <span
          class="w-full border border-dashed border-gray-100 dark:border-gray-600 rounded-[1px]"
        ></span>
      </div>

      <div>
        <!--bottom text-->
        <div class="flex justify-center">
          <Typography variant="body-2"
            >Don't have an account ?
            <RouterLink to="/access/sign-up/" class="text-indigo-400 opacity-100">
              Sign up
            </RouterLink>
          </Typography>
        </div>
      </div>
    </div>
  </div>
</template>
