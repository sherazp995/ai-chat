<template>
  <div class="message-panel">
    <div class="header">
      <status-icon :connected="user.connected" />
      {{ user.username }}
    </div>
    <ul class="messages">
      <li v-for="(message, index) in user.messages" :key="index" class="message">
        <div class="message-container">
          <div v-if="displaySender(message, index)" class="sender">
            <h2><u>{{ message.fromSelf ? "(yourself)" : user.username }}</u></h2>
          </div>
          <div class="message-content">
            <p><b>User Question:</b> {{ message.content }}</p>
            <p v-if="message.answer"><b>AI Consultant Answer:</b> {{ message.answer }}</p>
          </div>
        </div>
        <hr class="separator" />
      </li>
    </ul>

    <form @submit.prevent="onSubmit" class="form">
      <textarea v-model="input" placeholder="Your message..." class="input" />
      <button :disabled="!isValid" class="send-button">Send</button>
    </form>
  </div>
</template>

<script>
import StatusIcon from "./StatusIcon";

export default {
  name: "SingleUserMessagePanel",
  components: {
    StatusIcon,
  },
  props: {
    user: Object,
  },
  data() {
    return {
      input: "",
    };
  },
  methods: {
    onSubmit() {
      this.$emit("input", this.input);
      this.input = "";
    },
    displaySender(message, index) {
      return (
        index === 0 ||
        this.user.messages[index - 1].fromSelf !== this.user.messages[index].fromSelf
      );
    },
  },
  computed: {
    isValid() {
      return this.input.length > 0;
    },
  },
};
</script>

<style scoped>
.message-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.header {
  line-height: 40px;
  padding: 10px 20px;
  border-bottom: 1px solid #dddddd;
}

.messages {
  margin: 0;
  padding: 20px;
}

.message {
  list-style: none;
}

.sender {
  font-weight: bold;
  margin-top: 5px;
}

.form {
  padding: 10px;
}

.message-container {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 2px solid gray;
  border-radius: 25px;
  background-color: bisque;
  margin-bottom: 10px;
}

.separator {
  color: grey;
  font-weight: bold;
}

.input {
  width: 80%;
  resize: none;
  padding: 10px;
  line-height: 1.5;
  border-radius: 5px;
  border: 1px solid #000;
}

.send-button {
  vertical-align: top;
}
</style>
