<template>
  <b-container class="mt-5">
    <b-card no-body header="Authors" header-tag="h1" header-class="h3">
      <b-list-group flush>
        <b-list-group-item v-for="author in authors" :key="author.id" :author="author">{{ author.name }}</b-list-group-item>
      </b-list-group>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: 'Authors',
  data () {
    return {
      authors: [],
      error: ''
    }
  },
  created () {
    this.$http.plain.get('/api/v1/authors')
      .then(response => { this.authors = response.data })
      .catch(error => this.setError(error, 'Something went wrong'))
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data &&
        error.response.data.error) || text
    }
  }
}
</script>
