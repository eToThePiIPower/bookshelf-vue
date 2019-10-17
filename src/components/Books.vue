<template lang="html">
  <b-card no-body v-bind:header="this.header"
    :header-tag="header_tag" :header-class="header_class">

    <b-list-group flush>
      <b-list-group-item v-for="book in books" :key="book.id" :book="book">

        <div class="d-flex">
          <span>
            <b>{{ book.title }}</b>
            &mdash;
            <i>{{ book.author.name }}</i >
          </span>
          <b-button-group v-if="allowEdit" size="sm" class="ml-auto">
            <b-button @click.prevent="editBook(book)">Edit</b-button>
            <b-button @click.prevent="confirmDeleteBook(book)" variant="danger">Delete</b-button>
          </b-button-group>
        </div>

        <EditBook v-if="allowEdit && editedBook == book" :editedBook="editedBook" @addFlash="addFlash" />

      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
import EditBook from './EditBook'

export default {
  name: 'Books',
  props: {
    allowEdit: {
      type: Boolean,
      default: false
    },
    books: {
      type: Array
    },
    header: {
      type: String,
      default: 'Books'
    },
    header_tag: {
      type: String,
      default: 'h1'
    },
    header_class: {
      type: String,
      default: 'h3'
    }
  },
  data () {
    return {
      editedBook: undefined
    }
  },
  components: { EditBook },
  created () {
  },
  methods: {
    editBook (book) {
      this.editedBook = book
    },
    confirmDeleteBook (book) {
      this.$bvModal.msgBoxConfirm(`Do you really want to delete Book #${book.id}: ${book.title}`)
        .then(value => {
          if (value) {
            this.deleteBook(book)
          }
        })
    },
    deleteBook (book) {
      this.$http.authed.delete(`/api/v1/books/${book.id}`)
        .then(response => {
          if (response) {
            this.$parent.books.splice(this.books.indexOf(book), 1)
            this.addFlash('Deleted Book', book, 'warning')
          } else {
            this.addError('Error', `Could not delete Book #${book.id}: ${book.name}`)
          }
        })
        .catch(error => this.addError(error, 'Cannot delete Book'))
    }
  }
}
</script>
