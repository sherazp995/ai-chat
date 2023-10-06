<script setup lang="ts">
import { ref } from "vue";

import AccountSettings from "@src/components/views/HomeView/Sidebar/Settings/SettingsAccordion/AccountSettings.vue";

// Types
enum accordionItems {
  accountSettings = "account-settings",
}

const accordionState = ref({
  "account-settings": true,
  "privacy-settings": true,
  "appearance-settings": true,
});

const handleToggle = (name: accordionItems) => {
  // close all opened tabs
  for (let key of Object.keys(accordionState.value)) {
    if (key !== name) {
      accordionState.value[<accordionItems>key] = true;
    }
  }
  // open the clicked tabs
  accordionState.value[name] = !accordionState.value[name];
};
</script>

<template>
  <!--settings accordion-->
  <div
    role="list"
    aria-label="Settings Accordion Control Group Buttons"
    class="h-full"
  >
    <AccountSettings
      :collapsed="accordionState['account-settings']"
      :handleToggle="() => handleToggle(accordionItems.accountSettings)"
    />
  </div>
</template>
