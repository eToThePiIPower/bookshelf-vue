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
    delete localStorage.csrf
    delete localStorage.signedIn
    // redirect to signin if refresh fails
    location.replace('/')
    return Promise.reject(error)
  }
})

export { plainConnection, authConnection }
