<template>
  <div class="select-username">
    <form @submit.prevent="onSubmit" class="form">
      <input v-model="username" placeholder="Your username..." class="input" />
      <button :disabled="!isValid" class="button">Send</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SelectUsername",
  data() {
    return {
      username: "",
    };
  },
  computed: {
    isValid() {
      return this.username.length > 2;
    },
  },
  methods: {
    onSubmit() {
      this.$emit("input", this.username);
    },
  },
};
</script>

<style scoped>
.select-username {
  width: 100%;
  align-items: left;
  height: 100vh;
}

.form {
  background-color: #f3f3f3;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 10px;
}

.button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
