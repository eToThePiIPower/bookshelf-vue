<template>
  <b-container class="mt-5">
    <b-alert variant="warning" v-model="error" v-if="error" dismissible fade>
      {{ error }}
    </b-alert>

    <b-card header="Sign Up" header-tag="h1" header-class="h3">
      <b-form @submit.prevent="signup">
        <b-form-group id="email-group" label="Email" label-for="email">
          <b-form-input id="email" type="email" v-model="email" required />
        </b-form-group>

        <b-form-group id="password-group" label="Password" label-for="password"
          description="6 or more characters minimum.">
          <b-form-input id="password" type="password" v-model="password" required />
        </b-form-group>

        <b-form-group id="passwordConfirmation-group" label="Password" label-for="passwordConpasswordConfirmation">
          <b-form-input id="passwordConfirmation" type="password" v-model="passwordConfirmation" required />
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: 'SignupView',
  data () {
    return {
      email: '',
      password: '',
      passwordConfirmation: '',
      error: ''
    }
  },
  created () {
    this.checkSignedIn()
  },
  methods: {
    checkSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/authors')
      }
    },
    signup () {
      this.$http.plain.post('/signup', {
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      })
        .then(response => this.signupSucceeded(response))
        .catch(error => this.signupFailed(error))
    },
    signupSucceeded (response) {
      if (!response.data.csrf) {
        this.signupFailed(response)
        return
      }
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.$parent.signedIn = true
      this.error = ''
      this.$router.replace('/authors')
    },
    signupFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || ''
      delete localStorage.csrf
      delete localStorage.signedIn
    }
  }
}
</script>
