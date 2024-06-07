import React from 'react'
import { DatePicker, Typography } from 'antd'
const AntdDatePicker = ({
  onChange,
  needConfirm,
  format = 'DD/MM/YYYY',
  placeholder,
  placement,
  value,
  label,
  error,
  message,
  ...props
}) => {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <DatePicker
        value={value}
        status={Boolean(error) ? 'error' : ''}
        id={label}
        onChange={onChange}
        needConfirm={needConfirm}
        format={format}
        placeholder={placeholder}
        placement={placement}
        {...props}
      />
      {Boolean(error) && (
        <Typography.Text type="danger">{message}</Typography.Text>
      )}
    </>
  )
}
export default AntdDatePicker
