import React from 'react'
import { Button as AntdButton } from 'antd'
import './button.css'

const Button = ({ htmlType, onClick, disabled, label, ...props }) => {
  return (
    <AntdButton
      htmlType={htmlType}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {label}
    </AntdButton>
  )
}

export default Button
