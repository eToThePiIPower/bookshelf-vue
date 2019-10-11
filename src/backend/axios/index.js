import axios from 'axios'

const API_URL = 'http://localhost:3000'

const plainConnection = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

const authConnection = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

authConnection.interceptors.request.use(config => {
  const method = config.method.toUpperCase()
  if (method !== 'OPTIONS' && method !== 'GET') {
    config.headers = {
      ...config.headers,
      'X-CSRF-TOKEN': localStorage.csrf
    }
  }
  return config
})

authConnection.interceptors.response.use(null, error => {
  if (error.response && error.response.config && error.response.status === 401) {
    return plainConnection.post('/refresh', {}, { headers: { 'X-CSRF-TOKEN': localStorage.csrf } })
      .then(response => {
        localStorage.csrf = response.data.csrf
        localStorage.signedIn = true
        // After another successfull refresh - repeat original request
        let retryConfig = error.response.config
        retryConfig.headers['X-CSRF-TOKEN'] = localStorage.csrf
        return plainConnection.request(retryConfig)
      })
      .catch(error => {
        delete localStorage.csrf
        delete localStorage.signedIn
        this.$router.replace('/signin')
        return Promise.reject(error)
      })
  }
  if (error.response && error.response.config && error.response.status >= 400 && error.response.status < 500) {
    return Promise.reject(error)
  }
})

export { plainConnection, authConnection }
