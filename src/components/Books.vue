<template lang="html">
  <b-card no-body header="Books" header-tag="h1" header-class="h3">
    <b-list-group flush>
      <b-list-group-item v-for="book in books" :key="book.id" :book="book">
        <b>{{ book.title }}</b>
        &mdash;
        <i>{{ book.author.name }}</i>
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
  }
}
</script>
