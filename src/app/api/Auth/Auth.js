import { default as endpoints } from '@/app/services/axios/endpoints'
import {
  useDelete,
  useFetch,
  usePost,
} from '@/app/services/react-query/reactQuery'

export const postLogin = (config) =>
  usePost(endpoints.login.login, undefined, undefined, config)

export const getTenant = (params, config) =>
  useFetch(endpoints.tanent, params, config)

export const useUserData = (config) =>
  useFetch(endpoints.userData, undefined, config)

export const postSignup = () =>
  usePost(endpoints.signup.signup, undefined, undefined, {})
export const postResendEmail = (params) =>
  usePost(
    `${endpoints.signup.verifyEmail}?guid=${params.guid}`,
    params,
    undefined,
    {}
  )



export const postForgotPassword = () =>
  usePost(endpoints.forgotPassword, undefined, undefined, {})

export const postResetPassword = (headers) =>
  usePost(endpoints.resetPassword, undefined, undefined, {}, headers)

export const postConfirmEmail = (params, headers) =>
  usePost(
    `${endpoints.emailConfirmation}/?userId=${params.uid}`,
    undefined,
    undefined,
    {},
    headers
  )

export const Logout = (body) => useDelete(endpoints.login.logout, { ...body })
