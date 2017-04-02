import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    currentChat: 'General',
    messages: [],
    members: [{
      channel: 'General',
      name: 'Jean Bon',
      img: '/static/logo.png'
    },{
      channel: 'Gaming',
      name: 'Annie Bot',
      img: '/static/logo.svg'
    }]
  },
  mutations: {
    switchChat(state, name) {
      state.currentChat = name
    },
    addMessage(state, message) {
      state.messages.push(message)
    }
  },
  getters: {
    getCurrentChat(state) {
      return state.currentChat
    },
    getMessages(state) {
      return state.messages
    },
    getMembers(state) {
      return state.members
    }
  }
})
