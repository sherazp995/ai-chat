<template>
  <div class="single-user-chat">
    <message-panel
      v-if="selectedUser"
      :user="selectedUser"
      @input="onMessage"
      class="message-panel"
    />
  </div>
</template>

<script>
import socket from "../socket";
import MessagePanel from "./MessagePanel";

export default {
  name: "SingleUserChat",
  components: { MessagePanel },
  data() {
    return {
      selectedUser: null,
    };
  },
  methods: {
    onMessage(content) {
      if (this.selectedUser) {
        socket.emit("private message", {
          content,
          to: this.selectedUser.userID,
        });
        this.selectedUser.messages.push({
          content,
          fromSelf: true,
        });
      }
    },
  },
  created() {
    socket.on("private message", ({ content, from }) => {
      if (this.selectedUser && this.selectedUser.userID === from) {
        this.selectedUser.messages.push({
          content: content.parsedResponse.Q,
          answer: content.parsedResponse.A,
          fromSelf: false,
        });
      }
    });

    this.$parent.$on("userTypeSelected", (userType) => {
      if (userType === "single") {
        // Replace this with the logic to set the selectedUser for the single user
        // For example:
        this.selectedUser = this.users.find(user => user.self);
      }
    });
  },
  beforeDestroy() {
    socket.off("private message");
  },
};
</script>

<style scoped>
.single-user-chat {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.message-panel {
  width: 600px;
}
</style>
