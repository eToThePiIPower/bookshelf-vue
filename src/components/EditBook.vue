<template>
  <b-form @submit.prevent="updateBook(editedBook)" class="row">
    <b-form-group id="editedTitle-group" label="Title" label-for="editedTitle" class="col-md-12">
      <b-form-input ref="editedTitle" type="text" v-model="editedBook.title" required />
    </b-form-group>

    <b-form-group id="editedYear-group" label="Year" label-for="editedYear" class="col-md-3">
      <b-form-input ref="editedYear" type="date" v-model="editedBook.year" />
    </b-form-group>

    <b-form-group id="editedISBN-group" label="ISBN" label-for="editedISBN" class="col-md-3">
      <b-form-input ref="editedISBN" type="text" v-model="editedBook.isbn" />
    </b-form-group>

    <b-form-group id="editedAuthorGroup" label="Author" label-for="editedAuthor" class="col-md-6">
      <b-form-select v-model="editedBook.author" required>
        <option v-for="author in authors" v-bind:value="{id: author.id, name: author.name, url: author.url}" :key="author.id">
          {{author.name }}
        </option>
      </b-form-select>
    </b-form-group>

    <div class="form-group col-md-12">
      <b-button type="submit" variant="primary">Submit</b-button>
    </div>
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
      .catch(error => this.addError(error, 'Something went wrong'))
  },
  methods: {
    updateBook (book) {
      this.$http.authed.patch(`/api/v1/books/${book.id}`, { book: {
        title: book.title,
        year: book.year,
        isbn: book.isbn,
        author_id: book.author.id
      }})
        .then(response => {
          this.$parent.editedBook = undefined
        })
        .catch(error => this.addError(error, 'Cannot update book'))
    }
  }
}
</script>
