import { Service } from './Service'

const baseURL = process.env.NODE_ENV === 'production'
  ? `${process.env.BASE_URL}api/v1/`
  : `http://localhost:7777/api/v1/`
const apiService = new Service({ baseURL, timeout: 1000 })

export { apiService }
