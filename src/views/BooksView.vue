<template>
  <b-container class="mt-5">
    <b-alert variant="warning" v-model="error" v-if="error" dismissible fade>
      {{ error }}
    </b-alert>

    <b-card no-body header="Books" header-tag="h1" header-class="h3">
      <b-card-body>
        <b-button v-b-toggle.newBookForm block>New Book</b-button>
        <b-collapse id="newBookForm" class="mt-3">
          <b-form @submit.prevent="addBook">
            <b-form-group id="title-group" label="Title" label-for="title">
              <b-form-input id="title" type="text" v-model="newBook.title" required />
            </b-form-group>

            <b-form-group id="author-group" label="Author" label-for="author">
              <b-form-select v-model="newBook.author" required>
                <option :value="author.id" v-for="author in authors" :key="author.id">
                  {{author.name }}
                </option>
              </b-form-select>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            </b-form>
        </b-collapse>
      </b-card-body>

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
  name: 'BooksView',
  data () {
    return {
      authors: [],
      books: [],
      newBook: [],
      error: ''
    }
  },
  created () {
    this.$http.authed.get('/api/v1/books')
      .then(response => { this.books = response.data })
      .catch(error => this.setError(error, 'Something went wrong'))
    this.$http.plain.get('/api/v1/authors')
      .then(response => { this.authors = response.data })
      .catch(error => this.setError(error, 'Something went wrong'))
  },
  methods: {
    addBook () {
      const value = this.newBook
      if (!value) {
        return
      }
      this.$http.authed.post('/api/v1/books', { book: { title: this.newBook.title, author_id: this.newBook.author } })
        .then(response => {
          this.books.push(response.data)
          this.newBook = {}
        })
        .catch(error => this.setError(error, 'Cannot create record'))
    },
    setError (error, text) {
      this.error = (error.response && error.response.data &&
        error.response.data.error) || text
    }
  }
}
</script>
