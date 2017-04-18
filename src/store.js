import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    currentChat: 'General',
    currentUser: 'guest',
    users: [],
    channels: {
      'General': {
        name: 'General',
        members: [],
        messages: []
      },
      'Gaming': {
        name: 'Gaming',
        members: [],
        messages: []
      }
    }
  },
  mutations: {
    switchChat(state, name) {
      state.currentChat = name
    },
    addMessage(state, data) {
      state.channels[data.channel].messages.push({username: data.user, content: data.content})
    },
    addUser(state, username) {
      state.users.push(username)
    },
    setCurrentUser(state, username) {
      state.currentUser = username
    },
    addMemberToChannel(state, data) {
      if(! state.channels[data.channel].members.includes(data.username)) {
        state.channels[data.channel].members.push(data.username)
      }
    }
  },
  getters: {
    getCurrentChat(state) {
      return state.currentChat
    },
    getCurrentUser(state) {
      return state.currentUser
    },
    getMessages(state, getters) {
      const currentChannel = getters.getCurrentChat
      socket.on('sendMessage', data => {
        state.channels[currentChannel].messages.push(data)
      })
      return state.channels[currentChannel].messages
    },
    getChannels(state) {
      return state.channels
    },
    getMembers(state, getters) {
      const channelName = getters.getCurrentChat
      return state.channels[channelName].members
    }
  }
})
