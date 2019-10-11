<template>
  <b-container class="mt-5">
    <b-card header="Sign In" header-tag="h1" header-class="h3">
      <b-form @submit.prevent="signin">
        <b-form-group id="email-group" label="Email" label-for="email">
          <b-form-input id="email" type="email" v-model="email" required />
        </b-form-group>

        <b-form-group id="password-group" label="Password" label-for="password"
          description="We need your password to log you in.">
          <b-form-input id="password" type="password" v-model="password" required />
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: 'SigninView',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  created () {
    this.checkSignedIn()
  },
  methods: {
    signin () {
      this.$http.plain.post('/signin', { email: this.email, password: this.password })
        .then(response => this.signinSucceeded(response))
        .catch(error => this.signinFailed(error))
    },
    signinSucceeded (response) {
      if (!response.data.csrf) {
        this.signinFailed(response)
        return
      }
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.$parent.signedIn = true
      this.$router.replace('/authors')
    },
    signinFailed (error) {
      this.setError(error, 'Could not sign in')
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/authors')
      }
    }
  }
}

</script>
