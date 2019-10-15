<template>
  <b-card>
    <b-button v-b-toggle.newBookForm block>New Book</b-button>
    <b-collapse id="newBookForm" class="mt-3">
      <b-form @submit.prevent="processForm">
        <b-form-group id="isbn-group" label="ISBN" label-for="isbn">
          <b-input-group>
            <b-form-input id="isbn" type="text" v-model="newBook.isbn" />
              <b-input-group-append>
                <b-button variant="primary" @click="fillInFromISBN">Lookup ISBN</b-button>
              </b-input-group-append>
          </b-input-group>
        </b-form-group>

        <b-form-group id="title-group" label="Title" label-for="title">
          <b-form-input id="title" type="text" v-model="newBook.title" required />
        </b-form-group>

        <b-form-group id="year-group" label="Year" label-for="year">
          <b-form-input id="year" type="text" v-model="newBook.year" required />
        </b-form-group>

        <b-form-group id="author-group" label="Author" label-for="author">
          <b-form-select v-model="newBook.author" required>
            <option disabled>
              Select an author
            </option>
            <option :value="author.id" v-for="author in authors" :key="author.id">
              {{author.name }}
            </option>
            <option :value="-1" :key="-1">
              <i>Create a new Author</i>
            </option>
          </b-form-select>
          <b-form-input id="new-author" type="text" v-model="newAuthor" v-if="newBook.author === -1" />
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-collapse>
  </b-card>
</template>

<script>
export default {
  name: 'NewBook',
  data () {
    return {
      newBook: {},
      newAuthor: '',
      authors: []
    }
  },
  created () {
    this.$http.plain.get('/api/v1/authors')
      .then(response => { this.authors = response.data })
      .catch(error => this.addError(error, 'Something went wrong'))
  },
  methods: {
    processForm () {
      const value = this.newBook
      if (!value) {
        return
      }

      if (this.newBook.author === -1) {
        this.addAuthorThenBook()
      } else {
        this.addBook()
      }
    },
    addBook () {
      this.$http.authed.post('/api/v1/books', { book: { title: this.newBook.title, author_id: this.newBook.author } })
        .then(response => {
          this.$parent.books.push(response.data)
          this.newBook = {}
        })
        .catch(error => {
          this.addError(error, 'Cannot create book')
        })
    },
    addAuthorThenBook () {
      this.$http.authed.post('/api/v1/authors', { author: { name: this.newAuthor } })
        .then(response => {
          this.newBook.author = response.data.id
          this.newAuthor = ''
          this.addBook()
        })
        .catch(error => this.addError(error, 'Could not find author or create a new one'))
    },
    fillInFromISBN () {
      this.$http.plain.get(`/api/v1/lookup_isbn/${this.newBook.isbn}`)
        .then(response => {
          if (response.data.author.id === -1) {
            this.newAuthor = response.data['author']['name']
          }
          this.newBook = response.data
          this.newBook.author = response.data['author']['id']
        })
        .catch(error => this.addError(error, 'Cannot lookup ISBN'))
    }
  }
}

</script>
