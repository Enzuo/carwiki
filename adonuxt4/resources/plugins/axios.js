import axios from 'axios'

export default axios.create({
  baseURL: process.env.baseUrl || 'http://192.168.1.72:3333/api'
  // baseURL: 'http://127.0.0.1:3333/api'
})
