import React from 'react'
import { Select } from 'antd'

const SimpleSelect = ({ onChange, options, defaultValue, value, ...props }) => {
  return (
    <Select
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      options={options}
      {...props}
    />
  )
}

export default SimpleSelect
