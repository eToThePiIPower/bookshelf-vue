<template>
  <div id="app">
    <Navbar/>

    <b-alert variant="warning" v-model="error.text" v-if="!isEmpty(error)" dismissible fade>
      <b>{{ error.text }}</b>
      <ul v-if="error.details && (typeof error.details === 'object')">
        <li v-for="key in Object.keys(error.details)" v-bind:key="key">
          <b>{{ key }}</b>
          <i>{{ error.details[key].join(', ') }}</i>
        </li>
      </ul>
      <i v-if="error.details && (typeof error.details === 'string')">
        {{ error.details }}
      </i>
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
      error: {}
    }
  },
  components: {
    Navbar
  },
  methods: {
    setError (error, text) {
      var details = (error.response && error.response.data && error.response.data.error)
      this.error = {
        text: text,
        details: details
      }
    }
  }
}
</script>

<style>
</style>
