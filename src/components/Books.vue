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
          <b-button-group v-if="allowEdit" size="sm" class="ml-auto">
            <b-button @click.prevent="editBook(book)">Edit</b-button>
          </b-button-group>
        </div>

        <!-- editForm -->
        <EditBook v-if="allowEdit && editedBook == book" :editedBook="editedBook" />
        <!-- /editForm -->

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
      type: Array,
      required: true
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
    }
  }
}
</script>
