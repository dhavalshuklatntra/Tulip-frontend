import endpoints from '@/app/services/axios/endpoints'
import { useFetch, usePost } from '@/app/services/react-query/reactQuery'

export const PostEmailConfig = () =>
  usePost(endpoints.EmailConfig.emailConfig, undefined, undefined, undefined)
export const GetEmailConfig = () =>
  useFetch(endpoints.EmailConfig.emailConfig, undefined, undefined, undefined)
