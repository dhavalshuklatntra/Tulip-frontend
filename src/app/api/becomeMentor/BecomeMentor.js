import endpoints from '@/app/services/axios/endpoints'
import { usePost } from '@/app/services/react-query/reactQuery'

export const sendMentorReq = (config) =>
  usePost(endpoints.mentorRequest.mentorReq, undefined, undefined, config)
