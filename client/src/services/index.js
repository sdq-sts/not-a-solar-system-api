import { Service } from './api'

// ${process.env.BASE_URL}api/v1/`
const baseURL = process.env.NODE_ENV === 'production'
  ? `http://localhost:7777/api/v1/`
  : `http://localhost:7777/api/v1/`
const apiService = new Service({ baseURL, timeout: 5000 })

export { apiService }
