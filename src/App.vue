<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  data () {
    return {
      signedIn: localStorage.signedIn
    }
  },
  components: {
    Navbar
  }
}
</script>

<style>
</style>
