import { Input, Typography } from 'antd'
import React from 'react'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import './input.css'
const PasswordField = ({
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
      <Input.Password
        id={label}
        placeholder={placeholder}
        status={Boolean(error) ? 'error' : ''}
        onChange={onChange}
        type={type}
        value={value}
        variant={variant}
        label={label}
        iconRender={(visible) =>
          visible ? (
            <IconEye stroke={1} size={18} />
          ) : (
            <IconEyeOff stroke={1} size={18} />
          )
        }
        {...props}
      />
      {Boolean(error) && (
        <Typography.Text type="danger">{message}</Typography.Text>
      )}
    </>
  )
}

export default PasswordField
