<template>
  <b-container class="mt-5">
    <b-alert variant="warning" v-model="error" v-if="error" dismissible fade>
      {{ error }}
    </b-alert>

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
  name: 'Signin',
  data () {
    return {
      email: '',
      password: '',
      error: ''
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
      this.error = ''
      this.$router.replace('/authors')
    },
    signinFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || ''
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
