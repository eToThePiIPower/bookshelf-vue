<template>
  <div id="app">
    <Navbar/>

    <b-alert variant="warning" v-model="error" v-if="error" dismissible fade>
      {{ error }}
    </b-alert>

    <router-view @setError="setError" />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  data () {
    return {
      signedIn: localStorage.signedIn,
      error: ''
    }
  },
  components: {
    Navbar
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data &&
        error.response.data.error) || text
    }
  }
}
</script>

<style>
</style>
