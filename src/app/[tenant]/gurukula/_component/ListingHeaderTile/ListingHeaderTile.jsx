import { Typography } from 'antd'
import React from 'react'

const ListingHeaderTile = ({ count, image, title }) => {
  return (
    <div>
      <Typography.Text> {count}</Typography.Text>
      <Typography.Text>{title} </Typography.Text>
      {image}
    </div>
  )
}

export default ListingHeaderTile
