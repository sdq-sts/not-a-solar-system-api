import { Service } from './api'

const baseURL = process.env.NODE_ENV === 'production'
  ? `${process.env.BASE_URL}api/v1/`
  : `http://localhost:7777/api/v1/`
const apiService = new Service({ baseURL, timeout: 5000 })

export { apiService }
