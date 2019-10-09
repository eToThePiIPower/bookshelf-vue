<template>
  <b-container class="mt-5">
    <NewAuthor />
    <hr />
    <Authors :authors="this.authors" />
    <hr />
    <Books v-if="selectedAuthor" :books="selectedAuthorBooks"
      :header="'Your Books by ' + selectedAuthor.name" :header_tag="'h2'" :header_class="'h5'"
    />
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
      editedAuthor: undefined,
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
    editAuthor (author) {
      this.editedAuthor = author
      this.$refs.editedName.focus()
    },
    updateAuthor (author) {
      this.editedAuthor = undefined
      this.$http.authed.patch(`/api/v1/authors/${author.id}`, { author: { name: author.name } })
        .catch(error => this.setError(error, 'Cannot update author'))
    },
    confirmDeleteAuthor (author) {
      this.$bvModal.msgBoxConfirm(`Do you really want to delete Author #${author.id}: ${author.name}`)
        .then(value => {
          if (value) {
            this.deleteAuthor(author)
          }
        })
    },
    deleteAuthor (author) {
      this.$http.authed.delete(`/api/v1/authors/${author.id}`)
        .then(response => {
          if (response) {
            this.authors.splice(this.authors.indexOf(author), 1)
          } else {
            this.setError('Error', `Could not delete Author #${author.id}: ${author.name}`)
          }
        })
        .catch(error => this.setError(error, 'Cannot delete author'))
    },
    selectAuthor (author) {
      this.selectedAuthor = author
      this.$http.authed.get(`/api/v1/authors/${author.id}/books`)
        .then(response => { this.selectedAuthorBooks = response.data })
    },
    setError (error, text) {
      this.error = (error.response && error.response.data &&
        error.response.data.error) || text
    }
  }
}
</script>
