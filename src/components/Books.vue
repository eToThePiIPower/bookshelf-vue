<template lang="html">
  <b-card no-body header="Books" header-tag="h1" header-class="h3">

    <b-list-group flush>
      <b-list-group-item v-for="book in books" :key="book.id" :book="book">

        <div class="d-flex">
          <span>
            <b>{{ book.title }}</b>
            &mdash;
            <i>{{ book.author.name }}</i >
          </span>
          <b-button-group size="sm" class="ml-auto">
            <b-button @click.prevent="editBook(book)">Edit</b-button>
          </b-button-group>
        </div>

        <!-- editForm -->
        <b-form v-if="editedBook == book" @submit.prevent="updateBook(editedBook)">

          <b-form-group id="editedTitle-group" label="Title" label-for="editedTitle">
            <b-form-input ref="editedTitle" type="text" v-model="editedBook.title" required />
          </b-form-group>

          <b-form-group id="editedAuthorGroup" label="Author" label-for="editedAuthor">
            <b-form-select v-model="editedBook.author" required>
              <option v-for="author in authors" v-bind:value="{id: author.id, name: author.name, url: author.url}" :key="author.id">
                {{author.name }}
              </option>
            </b-form-select>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>

        </b-form>
        <!-- /editForm -->

      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
export default {
  name: 'Books',
  props: {
    books: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      authors: [],
      editedBook: undefined
    }
  },
  created () {
    this.$http.plain.get('/api/v1/authors')
      .then(response => { this.authors = response.data })
      .catch(error => this.setError(error, 'Something went wrong'))
  },
  methods: {
    editBook (book) {
      this.editedBook = book
    },
    updateBook (book) {
      this.editedBook = undefined
      this.$http.authed.patch(`/api/v1/books/${book.id}`,
        { book: { title: book.title, author_id: book.author.id } }
      )
        .catch(error => this.setError(error, 'Cannot update book'))
    }
  }
}
</script>
