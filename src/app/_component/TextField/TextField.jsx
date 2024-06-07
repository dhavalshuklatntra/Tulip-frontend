import { Input, Typography } from 'antd'
import React from 'react'
import './input.css'

const TextField = ({
  placeholder,
  onChange,
  type,
  value,
  variant,
  label,
  error,
  message,
  ...props
}) => {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <Input
        status={Boolean(error) ? 'error' : ''}
        id={label}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        value={value}
        variant={variant}
        label={label}
        {...props}
      />
      {Boolean(error) && (
        <Typography.Text type="danger">{message}</Typography.Text>
      )}
    </>
  )
}

export default TextField
