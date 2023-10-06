<template>
  <div class="home">
    <h1 class="title">Welcome to the Chat App</h1>
    <button class="button" @click="redirectToApp('single')">Single User</button>
    <button class="button" @click="redirectToApp('App')">Multiple Users</button>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    redirectToApp(userType) {
      this.$emit("userTypeSelected", userType);
    },
  },
};
</script>
    
<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 18px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button:hover {
  background-color: gray;
}

.button:active {
  background-color: blue;
}
</style>
