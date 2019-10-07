<template>
  <b-container class="mt-5">
    <b-card no-body header="Books" header-tag="h1" header-class="h3">
      <b-list-group flush>
        <b-list-group-item v-for="book in books" :key="book.id" :book="book">
          <b>{{ book.title }}</b>
          &mdash;
          <i>{{ book.author.name }}</i>
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: 'Books',
  data () {
    return {
      books: [],
      error: ''
    }
  },
  created () {
    this.$http.authed.get('/api/v1/books')
      .then(response => { this.books = response.data })
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
