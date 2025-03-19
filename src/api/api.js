// src/utils/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000', // 기본 URL
  // timeout: 10000,
  headers: {
    'Content-Type': 'application/json', // 기본 헤더
  },
})

export default api
