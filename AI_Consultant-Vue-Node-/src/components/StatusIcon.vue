<template>
  <i class="icon" :class="{ connected: connected }"></i>
</template>

<script>
export default {
  name: "StatusIcon",
  props: {
    connected: Boolean,
  },
};
</script>

<style scoped>
.icon {
  height: 12px;
  width: 12px;
  border-radius: 50%;
  display: inline-block;
  background-color: #b1b1b1;
  margin-right: 6px;
}

.icon.connected {
  background-color: #86bb71;
}
</style>
