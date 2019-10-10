<template>
  <b-form @submit.prevent="updateAuthor(editedAuthor)">
    <b-form-group id="editedName-group" label="Name" label-for="editedName">
      <b-form-input ref="editedName" type="text" v-model="editedAuthor.name" required />
    </b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
  </b-form>
</template>

<script>
export default {
  name: 'EditAuthor',
  props: {
    editedAuthor: {
      type: Object,
      required: true
    }
  },
  methods: {
    updateAuthor (author) {
      this.$parent.editedAuthor = undefined
      this.$http.authed.patch(`/api/v1/authors/${author.id}`, { author: { name: author.name } })
        .catch(error => this.setError(error, 'Cannot update author'))
    },
    setError (error, text) {
      this.$emit('setError', error, text)
    }
  }
}
</script>
