<template>
  <b-form @submit.prevent="updateBook(editedBook)">
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
</template>

<script>
export default {
  name: 'EditBook',
  props: {
    editedBook: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      authors: []
    }
  },
  created () {
    this.$http.plain.get('/api/v1/authors')
      .then(response => { this.authors = response.data })
      .catch(error => this.setError(error, 'Something went wrong'))
  },
  methods: {
    updateBook (book) {
      this.$parent.editedBook = undefined
      this.$http.authed.patch(`/api/v1/books/${book.id}`,
        { book: { title: book.title, author_id: book.author.id } }
      )
        .catch(error => this.setError(error, 'Cannot update book'))
    },
    setError (error, text) {
      this.$emit('setError', error, text)
    }
  }
}
</script>
