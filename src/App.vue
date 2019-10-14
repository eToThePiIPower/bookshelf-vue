<template>
  <div id="app">
    <Navbar/>

    <Flashes :flashes="errors" @dropFlash="dropFlash" />

    <router-view @addFlash="addFlash" />
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Flashes from './components/Flashes'

export default {
  name: 'App',
  data () {
    return {
      signedIn: localStorage.signedIn,
      errors: []
    }
  },
  components: { Navbar, Flashes },
  methods: {
    dropFlash (timestamp) {
      let index = this.errors.findIndex(error => error.timestamp === timestamp)
      this.errors.splice(index, 1)
    },
    addFlash (text, details, variant) {
      this.errors.push({
        variant: variant,
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
