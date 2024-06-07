import React from 'react'
import { Tooltip } from 'antd'

const CustomTooltip = ({ title, color, key, children }) => {
  return (
    <Tooltip title={title} color={color || '#2345'} key={key}>
      {children}
    </Tooltip>
  )
}

export default CustomTooltip
