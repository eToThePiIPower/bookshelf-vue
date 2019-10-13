<template>
  <div id="app">
    <Navbar/>

    <b-alert
      dismissible
      fade
      v-for="error in errors"
      v-bind:key="error.timestamp"
      v-bind:show="error.timestamp"
      v-bind:variant="error.variant"
      @dismissed="dropError(error.timestamp)"
    >
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
      errors: []
    }
  },
  components: {
    Navbar
  },
  methods: {
    dropError (timestamp) {
      let index = this.errors.findIndex(error => error.timestamp === timestamp)
      this.errors.splice(index, 1)
    },
    setError (error, text) {
      var details = (error.response && error.response.data && error.response.data.error)
      this.errors.push({
        variant: 'danger',
        timestamp: Date.now(),
        text: text,
        details: details
      })
    }
  }
}
</script>

<style>
</style>
