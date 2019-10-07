<template>
  <b-navbar toggleable="md" type="light" variant="light">
    <b-navbar-brand href="#">Bookshelf</b-navbar-brand>

    <b-navbar-toggle target="navbarMenus"></b-navbar-toggle>

    <b-collapse id="navbarMenus" is-nav>
      <!-- Site menu -->
      <b-navbar-nav>
        <b-nav-item href="#">About</b-nav-item>
        <b-nav-item href="#">Contact</b-nav-item>
        <b-nav-item href="#">Help</b-nav-item>
      </b-navbar-nav>

      <!-- User menu -->
      <b-navbar-nav class="ml-auto" v-if="this.isSignedIn()">
        <b-nav-item href="#">Sign Out</b-nav-item>
        <b-nav-item href="#">Account</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto" v-else>
        <b-nav-item href="#">Sign In</b-nav-item>
        <b-nav-item href="#">Sign Up</b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    isSignedIn () {
      return false
    }
  }
}
</script>
