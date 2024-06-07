import { default as endpoints } from '@/app/services/axios/endpoints'
import { useFetch, usePost } from '@/app/services/react-query/reactQuery'

export const submitFeedBack = (config) =>
  usePost(endpoints.feedback.feedBackSend, undefined, undefined, config)
