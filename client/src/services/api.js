import axios from 'axios'

class Service {
  constructor (config) {
    this.service = axios.create(config)
  }

  setDefaultHeaders (headers = {}) {
    this.defaultHeaders = headers
  }

  get (url, config = {}) {
    const headers = this.defaultHeaders
    return this.service.get(url, { headers, ...config })
  }

  delete (url, config = {}) {
    const headers = this.defaultHeaders
    return this.service.delete(url, { headers, ...config })
  }

  post (url, data, config = {}) {
    const headers = this.defaultHeaders
    return this.service.post(url, data, { headers, ...config })
  }

  put (url, data, config = {}) {
    const headers = this.defaultHeaders
    return this.service.put(url, data, { headers, ...config })
  }
}

export { Service }
