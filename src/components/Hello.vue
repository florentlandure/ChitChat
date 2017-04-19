<template>
  <div class="hello">
    <img id="logo" src="../assets/logo.svg">
    <h1>Welcome to Chit Chat</h1>
    <form>
      <input class="text-input" type="text" v-model="username" placeholder="Username">
      <!-- <input class="text-input" type="password" v-model="credentials.password" placeholder="Password"> -->
      <button type="submit" class="button" @click="submit">Chat !</button>
    </form>
    <!-- <p class="italic">Not registered yet ? <a href="/register">Sign up</a></p> -->
  </div>
</template>

<script>
import auth from '@/auth'

export default {
  name: 'hello',
  data () {
    return {
      username: ''
    }
  },
  methods: {
    submit (e) {
      e.preventDefault()
      let username = this.username
      if(username === '') {
        alert('Please enter a username');
      }
      else {
        this.checkAvailability(username);
      }
    },
    checkAvailability(username) {
      socket.emit('userLogin', username)
      socket.once('userLoggedIn', status => {
        if(status) {
          const currentChat = this.$store.getters.getCurrentChat

          this.$store.commit('addMemberToChannel', {channel: currentChat, username: username})
          this.$store.commit('setCurrentUser', username)
          this.$router.push('chat')
        }
        else {
          alert('Username is already being used')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  text-align: center;
}
h1, h2 {
  font-weight: normal;
}
#logo {
  margin-top: 60px;
  width: 200px;
}
button.button {
  border: none;
  display: block;
  margin: auto;
}
</style>
