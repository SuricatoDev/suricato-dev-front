import axios from 'axios'

const apiBackend = axios.create({
  baseURL: process.env.BACKEND_URL,
  timeout: 10000
})

export default apiBackend
