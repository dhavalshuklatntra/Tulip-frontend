import axios from 'axios'
import Cookies from 'js-cookie'

import { getBaseURL, showError, showSuccess } from '@/app/utils/common'

axios.defaults.headers = {
  'ngrok-skip-browser-warning': 'testing',
}

const client = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

const get = (url, body, headers = {}) =>
  client.get(url, {
    params: body,
    headers: headers,
    // for removing empty array params from query string, refrence https://github.com/axios/axios/issues/5058#issuecomment-1272107602
    paramsSerializer: {
      indexes: null,
    },
  })

const post = (url, body, headers = {}) => client.post(url, body, { headers })

const put = (url, body, headers = {}) => client.put(url, body, headers)

const patch = (url, body, headers = {}) => client.patch(url, body, { headers })

const del = (url, body, headers = {}) => client.delete(url, body, { headers })

client.interceptors.request.use(async (config) => {
  const token = Cookies.get('user')
  const tanant = Cookies.get('Tenant')
  const Ugid = Cookies.get('UgId')
  config.headers.Authorization = token ? `Bearer ${token}` : null
  config.headers['Tenant'] = tanant
  config.headers['UgId'] = Ugid
  return config
})

client.interceptors.response.use(
  (response) => {
    if (response.data.isSuccess && response?.data?.errorMessages?.length) {
      showError(response?.data?.displayMessage)
      return Promise.reject(error)
    }
    return response
  },
  (error) => {
    if (error?.response?.data?.status === 500) {
      showError(error?.response?.data?.message)
    }
    if (error?.response?.data?.status === 400) {
      showError(error?.response?.data?.message)
    }
    if (error?.response?.status === 401) {
      // store.dispatch(logout());
      showError('You are unauthorize. Please Login')
    }
    // return error
    return Promise.reject(error)
  }
)

export { get, post, put, del, patch }

export default client
