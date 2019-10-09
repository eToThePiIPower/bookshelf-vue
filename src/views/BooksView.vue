<template>
  <b-container class="mt-5">
    <Books :books="this.books" :allowEdit=true />
    <hr class="my-4" />
    <NewBook />
  </b-container>
</template>

<script>
import Books from '../components/Books'
import NewBook from '../components/NewBook'

export default {
  name: 'BooksView',
  data () {
    return {
      books: []
    }
  },
  components: {
    Books,
    NewBook
  },
  created () {
    this.$http.authed.get('/api/v1/books')
      .then(response => { this.books = response.data })
      .catch(error => this.setError(error, 'Something went wrong'))
  },
  methods: {
    setError (error, text) {
      var newError = (error.response && error.response.data &&
        error.response.data.error) || text
      console.log(newError)
    }
  }
}
</script>
