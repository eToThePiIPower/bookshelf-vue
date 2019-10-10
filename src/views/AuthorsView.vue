<template>
  <b-container class="mt-4">
    <div class="row">
      <div class="col-md-12 my-4">
        <NewAuthor />
      </div>

      <main class="col-md-6">
        <Authors :authors="this.authors" @authorSelected="selectAuthor"
          @setError="setError" />
      </main>

      <aside class="col-md-6">
        <Books v-if="selectedAuthor" :books="selectedAuthorBooks"
          :header="'Your Books by ' + selectedAuthor.name" :header_tag="'h2'" :header_class="'h5'"
        />
      </aside>
    </div>
  </b-container>
</template>

<script>
import Books from '../components/Books'
import Authors from '../components/Authors'
import NewAuthor from '../components/NewAuthor'

export default {
  name: 'AuthorsView',
  data () {
    return {
      authors: [],
      selectedAuthor: undefined,
      selectedAuthorBooks: undefined,
      error: ''
    }
  },
  components: { Authors, Books, NewAuthor },
  created () {
    this.$http.plain.get('/api/v1/authors')
      .then(response => { this.authors = response.data })
      .catch(error => this.setError(error, 'Something went wrong'))
  },
  methods: {
    selectAuthor (author) {
      this.selectedAuthor = author
      this.$http.authed.get(`/api/v1/authors/${author.id}/books`)
        .then(response => { this.selectedAuthorBooks = response.data })
    },
    setError (error, text) {
      this.$emit('setError', error, text)
    }
  }
}
</script>
