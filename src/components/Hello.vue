<template>
  <div class="hello">
    <img id="logo" src="../assets/logo.svg">
    <h1>Welcome to Chit Chat</h1>
    <form>
      <input class="text-input" type="text" v-model="credentials.username" placeholder="Username">
      <input class="text-input" type="password" v-model="credentials.password" placeholder="Password">
      <button type="submit" class="button" @click="submit">Log in</button>
    </form>
    <p class="italic">Not registered yet ? <a href="/register">Sign up</a></p>
  </div>
</template>

<script>
import auth from '@/auth'

export default {
  name: 'hello',
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submit (e) {
      e.preventDefault()
      let credentials = {
        username: this.credentials.username,
        password: this.credentials.password
      }
      if(credentials.username === '' || credentials.password === '') {
        this.showError('Username or password invalid')
      }
      else {
        auth.fakeLogin();
        //auth.login(this, credentials, '')
      }
    },
    showError(msg) {
      alert(msg)
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
