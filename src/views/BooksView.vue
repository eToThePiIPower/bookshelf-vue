<template>
  <b-container class="mt-5">
    <div class="row">
      <div class="col-md-12 my-4">
        <NewBook @setError="setError" />
      </div>

      <main class="col-md-12">
        <Books :books="this.books" :allowEdit=true @setError="setError" />
      </main>
    </div>
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
      this.$emit('setError', error, text)
    }
  }
}
</script>
