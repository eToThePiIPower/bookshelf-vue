<template>
  <b-alert variant="warning" v-model="error" v-if="error" dismissible fade>
    {{ error }}
  </b-alert>
</template>

<script>
export default {
  name: 'Flashes',
  data () {
    return {
      error: ''
    }
  }
}
</script>

