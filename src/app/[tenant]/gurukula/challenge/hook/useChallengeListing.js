import { getFilterData } from '@/app/api/Challenge/challenge'
import { getFilterObj } from '@/app/utils/common'

const useChallengeListing = () => {
  const { data: filterData } = getFilterData()

  // console.log(getFilterObj())

  return [{ filterData: filterData?.result }]
}

export default useChallengeListing
