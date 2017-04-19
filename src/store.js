import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    currentChat: 'General',
    currentUser: '',
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
      socket.emit('sendMessage', data)
    },
    setCurrentUser(state, username) {
      const today = Date.now()
      const nextWeek = new Date(today + 7 * 24 * 3600 * 1000)
      const cookie = `username=${username}; expires=${nextWeek}`
      state.currentUser = username
      document.cookie = cookie
    },
    addMemberToChannel(state, data) {
      socket.emit('addMemberToChannel', {channel: data.channel, user: data.username})
    }
  },
  getters: {
    getCurrentChat(state) {
      return state.currentChat
    },
    getCurrentUser(state) {
      if(state.currentUser == '') {
        const cookies = document.cookie.split(';')
        let username = '';

        cookies.forEach(c => {
          const arr = c.split('=');
          if(arr[0].trim() === 'username') {
            username = arr[1]
            return;
          }
        })

        if(username !== '') {
          socket.emit('userLogin', username)
          socket.emit('addMemberToChannel', {channel: state.currentChannel, user: username})
        }
        state.currentUser = username
      }
      return state.currentUser
    },
    getMessages(state, getters) {
      const currentChannel = getters.getCurrentChat

      socket.emit('getMessages', currentChannel)
      socket.on('castMessages', msg => {
        state.channels[currentChannel].messages = msg;
      })

      return state.channels[currentChannel].messages
    },
    getChannels(state) {
      return state.channels
    },
    getMembers(state, getters) {
      const channelName = getters.getCurrentChat

      socket.emit('getChannelMembers', channelName)
      socket.on('channelMembers', members => {
        state.channels[channelName].members = members
      })

      return state.channels[channelName].members
    }
  }
})
