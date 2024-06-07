import { Tag } from 'antd'
import React from 'react'

const CustomTags = ({ color, text }) => {
  return <Tag color={color}>{text}</Tag>
}

export default CustomTags
