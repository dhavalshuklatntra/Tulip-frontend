'use client'
import React from 'react'
import { Flex, Layout } from 'antd'

import ListingHeader from './_component/ListingHeader'
import useChallengeHeader from './hook/useChallengeHeader'
import useChallengeListing from './hook/useChallengeListing'
import ChallengeFilter from './_component/ChallengeFilter'
const ChallengePage = () => {
  const [{ headerdata, isLoading }] = useChallengeHeader()
  const [{ filterData }] = useChallengeListing()
  return (
    <div>
      <ListingHeader data={headerdata} isloading={isLoading} />
      <div>
        <ChallengeFilter renderData={filterData} />
      </div>
    </div>
  )
}

export default ChallengePage
