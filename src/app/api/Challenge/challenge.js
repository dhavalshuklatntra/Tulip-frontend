import endpoints from '@/app/services/axios/endpoints'
import { useFetch, usePost } from '@/app/services/react-query/reactQuery'

export const getChallengeHeader = (config) =>
  useFetch(endpoints.challenge.challengeHeader, undefined, config)

export const getFilterData = () =>
  useFetch(endpoints.challenge.challengeFilter, undefined, undefined)
