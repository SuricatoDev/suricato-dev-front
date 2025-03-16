import axios from 'axios'

const apiBackend = axios.create({
  baseURL: process.env.BACKEND_URL
})

export default apiBackend
