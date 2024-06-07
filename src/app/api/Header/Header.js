import { default as endpoints } from '@/app/services/axios/endpoints'
import { useFetch, usePost } from '@/app/services/react-query/reactQuery'

export const postLogin = (config) =>
  usePost(endpoints.login.login, undefined, undefined, config)
