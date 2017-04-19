<template>
  <div class="wrapper">
    <channels></channels>

    <div class="chat">
      <div class="chat-head">
        <h4>{{ getCurrentChat }}</h4>
      </div>
      <div class="chat-body" @click="focusChatInput" id="chat-body">
        <div v-for="message in getMessages" v-if="message.content.trim() !== ''" class="chat-message">
          <span class="msg-from">{{message.user}}: </span> {{ message.content }}
        </div>
      </div>
      <form class="chat-input">
        <input id="chat-input" autofocus autocomplete="off" type="text" name="chat-msg" v-model="chatInput" placeholder="Send a message">
        <button type="submit" class="button" @click="sendMessage($event, getCurrentChat)">Chat</button>
      </form>
    </div>

    <membersList></membersList>
  </div>
</template>

<script>
import membersList from '@/components/MembersList'
import channels from '@/components/Channels'
import {mapGetters} from 'vuex'

export default {
  name: 'chat',
  data() {
    return {
      chatInput: ''
    }
  },
  methods: {
    sendMessage(e, chatName) {
      e.preventDefault()
      const msgData = {channel: chatName, content: this.chatInput, user: this.$store.getters.getCurrentUser}
      this.$store.commit('addMessage', msgData)
      this.chatInput = ''

      setTimeout(() => {
        const elem = document.getElementById('chat-body');
        elem.scrollTop = elem.scrollHeight;
      }, 10)
    },
    focusChatInput() {
      document.getElementById('chat-input').focus()
    }
  },
  components: {
    membersList,
    channels
  },
  computed: {
    ...mapGetters([
      'getCurrentChat',
      'getMessages',
      'getCurrentUser'
    ])
  }
}
</script>

<style lang="scss">
$primaryColor: #37474f;
$primaryColorDark: #263238;
$colorAccent: #ff5252;
$colorAccentDark: #d50000;
$fontColor: #fafafa;

.chat {
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  & > .chat-body {
    height: 100%;
    overflow-y: auto;
  }
}
h4 {
  box-sizing: border-box;
  margin: 0;
  padding: 15px;
  text-align: center;
  background: $colorAccent;
}
.wrapper {
  display: flex;
  align-items: stretch;
  height: 100%;
}
.chat-input {
  display: flex;
  align-items: center;
  border-top: 1px solid $primaryColorDark;

  & > input {
    flex: 1;
    height: 50px;
    border: none;
    padding: 5px 10px;
    box-sizing: border-box;
    color: white;
    background: none;
    font-size: 0.9rem;
  }
  & > button {
    width: 200px;
    border: none;
    border-radius: 0;
    height: 50px;
  }
}
.chat-message {
  height: 30px;
  box-sizing: border-box;
  padding: 5px 10px;

  & .msg-from {
    font-weight: bold;
    color: $colorAccent;
  }

  &:nth-child(even) {
    background: rgba(0,0,0, 0.2);
  }
}
</style>
