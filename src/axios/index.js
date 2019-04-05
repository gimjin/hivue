import axios from 'axios'

// Global axios defaults
axios.defaults.withCredentials = true

/**
 * Add a request interceptor
 * @param {Object} config config
 * @return {Promise} Promise
 */
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

/**
 * Add a response interceptor
 * @param {Object} response response
 * @return {Promise} promise
 */
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export default axios
