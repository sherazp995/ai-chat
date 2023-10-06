<template>
  <div id="app" class="app-container">
    <div class="button-container" v-if="!usernameAlreadySelected">
      <button class="button" @click="selectMultipleUser">Start Chat</button>
      <div v-if="isSingleUser" class="select-username-container">
        <select-username @input="onUsernameSelection" />
      </div>
    </div>
    <div v-else>
      <chat />
    </div>
  </div>
</template>

<script>
import SelectUsername from "./components/SelectUsername";
import Chat from "./components/Chat";
import socket from "./socket";

export default {
  name: "App",
  components: {
    Chat,
    SelectUsername,
  },
  data() {
    return {
      usernameAlreadySelected: false,
      isSingleUser: false,
    };
  },
  methods: {
    onUsernameSelection(username) {
      this.usernameAlreadySelected = true;
      socket.auth = { username };
      socket.connect();
    },
    selectMultipleUser() {
      this.isSingleUser = true;
      this.usernameAlreadySelected = false;
    },
    selectSingleUser() {
      this.isSingleUser = false;
      this.usernameAlreadySelected = false;
      socket.disconnect();
    },
  },
  created() {
    socket.on("connect_error", (err) => {
      if (err.message === "invalid username") {
        this.usernameAlreadySelected = false;
      }
    });
  },
  destroyed() {
    socket.off("connect_error");
  },
};
</script>

<style>
body {
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
  font-family: Lato, Arial, sans-serif;
  font-size: 14px;
}

.app-container {
  text-align: center;
  position: relative; /* Add this */
}

.button-container {
  margin-bottom: 20px;
  position: fixed; /* Add this */
  top: 20%; /* Add this */
  margin-left:-8%;
}

.button {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 10px;
}

.button:hover {
  background-color: #0056b3;
}

.input-field {
  width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin-top: 20px;
}
</style>

