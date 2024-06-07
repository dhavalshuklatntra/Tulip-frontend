import { Skeleton, Space } from 'antd'
import React from 'react'

const ListingHeaderSkelton = () => {
  return (
    <Space>
      <Skeleton.Input active />
      <Skeleton.Image active />
    </Space>
  )
}

export default ListingHeaderSkelton
