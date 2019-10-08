<template>
  <b-container class="mt-5">
    <b-alert variant="warning" v-model="error" v-if="error" dismissible fade>
      {{ error }}
    </b-alert>

    <b-card no-body header="Authors" header-tag="h1" header-class="h3">

      <b-card-body>
        <b-button v-b-toggle.newAuthorForm block>New Author</b-button>
        <b-collapse id="newAuthorForm" class="mt-3">
          <b-form @submit.prevent="addAuthor">
            <b-form-group id="name-group" label="Name" label-for="name">
              <b-form-input id="name" type="text" v-model="newAuthor.name" required />
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
          </b-form>
        </b-collapse>
      </b-card-body>

      <b-list-group flush>
        <b-list-group-item v-for="author in authors" :key="author.id"
          @click="selectAuthor(author)"
          :author="author" class="d-flex justify-content-between">
          <span>{{ author.name }}</span>
          <b-button-group size="sm">
            <b-button @click.prevent="editAuthor(author)">Edit</b-button>
            <b-button @click.prevent="confirmDeleteAuthor(author)" variant="danger">Delete</b-button>
          </b-button-group>
        </b-list-group-item>
      </b-list-group>

      <b-card-body v-if="editedAuthor">
        <b-form @submit.prevent="updateAuthor(editedAuthor)">
          <b-form-group id="editedName-group" label="Name" label-for="editedName">
            <b-form-input ref="editedName" type="text" v-model="editedAuthor.name" required />
          </b-form-group>
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
      </b-card-body>
    </b-card>

    <hr />

    <b-card no-body v-if="selectedAuthorBooks">
      <b-card-header header-tag="h2" class="h6">
        Your books by {{selectedAuthor.name}}
      </b-card-header>
      <b-list-group flush>
        <b-list-group-item v-for="book in selectedAuthorBooks" :key="book.id">
          {{ book.title }}
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: 'AuthorsView',
  data () {
    return {
      authors: [],
      newAuthor: {},
      editedAuthor: undefined,
      selectedAuthor: undefined,
      selectedAuthorBooks: undefined,
      error: ''
    }
  },
  created () {
    this.$http.plain.get('/api/v1/authors')
      .then(response => { this.authors = response.data })
      .catch(error => this.setError(error, 'Something went wrong'))
  },
  methods: {
    addAuthor () {
      const value = this.newAuthor
      if (!value) {
        return
      }
      this.$http.authed.post('/api/v1/authors', { author: { name: this.newAuthor.name } })
        .then(response => {
          this.authors.push(response.data)
          this.newAuthor = {}
        })
        .catch(error => this.setError(error, 'Cannot create record'))
    },
    editAuthor (author) {
      this.editedAuthor = author
      this.$refs.editedName.focus()
    },
    updateAuthor (author) {
      this.editedAuthor = undefined
      this.$http.authed.patch(`/api/v1/authors/${author.id}`, { author: { name: author.name } })
        .catch(error => this.setError(error, 'Cannot update author'))
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
            this.authors.splice(this.authors.indexOf(author), 1)
          } else {
            this.setError('Error', `Could not delete Author #${author.id}: ${author.name}`)
          }
        })
        .catch(error => this.setError(error, 'Cannot delete author'))
    },
    selectAuthor (author) {
      this.selectedAuthor = author
      this.$http.authed.get(`/api/v1/authors/${author.id}/books`)
        .then(response => { this.selectedAuthorBooks = response.data })
    },
    setError (error, text) {
      this.error = (error.response && error.response.data &&
        error.response.data.error) || text
    }
  }
}
</script>
