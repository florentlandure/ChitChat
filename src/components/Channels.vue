<template>
  <div class="channels-list">
    <h4>Channels</h4>
    <ul class="list">
      <li v-for="channel in getChannels" :class="{current: isCurrentChat(channel.name)}" class="channel-item" @click="chooseChat(channel.name)">
        <p class="channel-name">{{ channel.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'channels',
  data() {
    return {
      channels: [{
        name: 'General'
      },{
        name: 'Gaming'
      }]
    }
  },
  computed: {
    ...mapGetters([
      'getCurrentChat',
      'getCurrentUser',
      'getChannels'
    ])
  },
  methods: {
    chooseChat(name) {
      const currentUser = this.$store.getters.getCurrentUser

      this.$store.commit('switchChat', name)
      this.$store.commit('addMemberToChannel', {channel: name, username: currentUser})
      document.getElementById('chat-input').focus()
    },
    isCurrentChat(name) {
      return this.$store.getters.getCurrentChat == name
    }
  }
}
</script>

<style lang="scss">
.channels-list {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 250px;
  overflow-y: auto;

  & > .list {
    border-right: 2px solid #263238;
    flex: 1;
    margin: 0;
    padding: 0;
  }

  & > h4 {
    border-right: 2px solid #37474f;
  }

  & .channel-item {
    padding: 10px 20px;
    display: flex;
    cursor: pointer;

    &:hover,
    &.current {
      background: #263238;
    }

    & > .channel-name {
      flex: 1;
      margin: 0;
    }
  }
}
</style>
