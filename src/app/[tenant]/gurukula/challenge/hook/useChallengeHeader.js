'use client'
import { getChallengeHeader } from '@/app/api/Challenge/challenge'

const useChallengeHeader = () => {
  const { data: headerdata, isLoading } = getChallengeHeader()

  return [
    { headerdata: headerdata?.result?.challengeListDashboardCount, isLoading },
  ]
}

export default useChallengeHeader
