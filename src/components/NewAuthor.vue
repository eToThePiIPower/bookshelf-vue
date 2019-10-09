<template>
  <b-card>
    <b-button v-b-toggle.newAuthorForm block>New Author</b-button>
    <b-collapse id="newAuthorForm" class="mt-3">
      <b-form @submit.prevent="addAuthor">
        <b-form-group id="name-group" label="Name" label-for="name">
          <b-form-input id="name" type="text" v-model="newAuthor.name" required />
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-collapse>
  </b-card>
</template>

<script>
export default {
  name: 'NewAuthor',
  data () {
    return {
      newAuthor: {}
    }
  },
  methods: {
    addAuthor () {
      const value = this.newAuthor
      if (!value) {
        return
      }
      this.$http.authed.post('/api/v1/authors', { author: { name: this.newAuthor.name } })
        .then(response => {
          this.$parent.authors.push(response.data)
          this.newAuthor = {}
        })
        .catch(error => this.setError(error, 'Cannot create record'))
    }
  }
}
</script>
