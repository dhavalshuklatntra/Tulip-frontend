import endpoints from '@/app/services/axios/endpoints'
import { useDelete, useFetch } from '@/app/services/react-query/reactQuery'

export const GetMentorRequest = () =>
  useFetch(endpoints.mentorRequest.mentorReq, undefined, undefined, undefined)
export const PostMentorRequest = () =>
  useDelete(endpoints.mentorRequest.mentorReq, undefined, undefined, undefined)
