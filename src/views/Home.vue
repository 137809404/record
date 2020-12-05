<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <speechrec></speechrec>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import speechrec from "@/components/speechrec";
export default {
  name: 'Home',
  components: {
    HelloWorld,
    speechrec
  }
}
</script>
