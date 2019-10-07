import axios from 'axios'

const API_URL = 'http://localhost:3000'

const plainConnection = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

export { plainConnection }
