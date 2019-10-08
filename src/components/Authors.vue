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
        <b-list-group-item v-for="author in authors" :key="author.id" :author="author">{{ author.name }}</b-list-group-item>
      </b-list-group>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: 'Authors',
  data () {
    return {
      authors: [],
      newAuthor: {},
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
    setError (error, text) {
      this.error = (error.response && error.response.data &&
        error.response.data.error) || text
    }
  }
}
</script>
