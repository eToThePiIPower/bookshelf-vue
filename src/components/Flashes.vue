<template>
  <aside id="flashes">
     <b-alert
      dismissible
      fade
      v-for="flash in flashes"
      v-bind:key="flash.timestamp"
      v-bind:show="flash.timestamp"
      v-bind:variant="flash.variant"
      @dismissed="dropFlash(flash.timestamp)"
    >
      <b>{{ flash.text }}</b>
      <ul v-if="flash.details && (typeof flash.details === 'object')">
        <li v-for="key in Object.keys(flash.details)" v-bind:key="key">
          <b>{{ key }}</b>
          <i v-if="typeof flash.details[key] === Array">{{ flash.details[key].join(', ') }}</i>
          <i v-if="typeof flash.details[key] === 'string'">{{ flash.details[key] }}</i>
          <i v-if="typeof flash.details[key] === 'number'">{{ flash.details[key] }}</i>
        </li>
      </ul>
      <i v-if="flash.details && (typeof flash.details === 'string')">
        {{ flash.details }}
      </i>
    </b-alert>
  </aside>
</template>

<script>
export default {
  name: 'Flashes',
  props: {
    flashes: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    dropFlash (timestamp) {
      this.$emit('dropFlash', timestamp)
    }
  }
}
</script>

<style>
.alert {
  border-radius: 0;
}
.alert, .alert ul:last-child {
  margin-bottom: 0;
}
</style>
