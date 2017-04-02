<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
$primaryColor: #37474f;
$primaryColorDark: #263238;
$colorAccent: #ff5252;
$colorAccentDark: #d50000;
$fontColor: #fafafa;

html,
body {
  margin: 0;
  padding: 0;
  background-color: $primaryColor;
  height: 100%;
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $fontColor;
}
a {
  color: $colorAccent;
  text-decoration: none;
}
.italic {
  font-style: italic;
}
.text-input {
  margin: auto;
  width: 250px;
  margin-bottom: 8px;
  height: 30px;
  border-radius: 4px;
  border: none;
  outline: inherit;
  padding: 5px 10px;
  font-size: 0.8rem;
}
.button {
  background-color: $colorAccent;
  color: $fontColor;
  padding: 10px 20px;
  border-radius: 4px;
  transition: background-color 0.6s;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background: $colorAccentDark;
  }
}
</style>
