<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
    <HelloWorld msg="小岳语音助手"/>
    <speechrec></speechrec>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import speechrec from "@/components/speechrec";
export default {
  name: 'app',
  components: {
    HelloWorld,
    speechrec
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin-top: 60px;
}
body{
  height: 100%;
  width: 100%;
  background-color: #2c3e50;
}
</style>
