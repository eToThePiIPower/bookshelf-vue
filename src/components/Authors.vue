<template>
  <b-card no-body header="Authors" header-tag="h1" header-class="h3">
    <b-list-group flush>
      <b-list-group-item v-for="author in authors" @click="selectAuthor(author)"
        :key="author.id" :author="author">

        <div class="d-flex justify-content-between">
          <span>{{ author.name }}</span>
          <b-button-group size="sm">
            <b-button @click.prevent="editAuthor(author)">Edit</b-button>
            <b-button @click.prevent="confirmDeleteAuthor(author)" variant="danger">Delete</b-button>
          </b-button-group>
        </div>

        <EditAuthor v-if="editedAuthor == author" :editedAuthor="editedAuthor"
          @setError="setError" />

      </b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
import EditAuthor from './EditAuthor'

export default {
  name: 'Authors',
  props: {
    authors: {
      type: Array
    }
  },
  components: { EditAuthor },
  data () {
    return {
      editedAuthor: undefined
    }
  },
  methods: {
    editAuthor (author) {
      this.editedAuthor = author
    },
    confirmDeleteAuthor (author) {
      this.$bvModal.msgBoxConfirm(`Do you really want to delete Author #${author.id}: ${author.name}`)
        .then(value => {
          if (value) {
            this.deleteAuthor(author)
          }
        })
    },
    deleteAuthor (author) {
      this.$http.authed.delete(`/api/v1/authors/${author.id}`)
        .then(response => {
          if (response) {
            this.$parent.authors.splice(this.authors.indexOf(author), 1)
          } else {
            this.setError('Error', `Could not delete Author #${author.id}: ${author.name}`)
          }
        })
        .catch(error => this.setError(error, 'Cannot delete author'))
    },
    selectAuthor (author) {
      this.$emit('authorSelected', author)
    },
    setError (error, text) {
      this.$emit('setError', error, text)
    }
  }
}
</script>
