import React from 'react'
import { IconCheck, IconEdit, IconX } from '@tabler/icons-react'
import { Switch } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
export const EditAction = ({ onEditClick }) => {
  return <IconEdit onClick={onEditClick} />
}

export const SwitchAction = ({ onToggle, checked, loading }) => {
  return (
    <Switch
      loading={loading}
      checked={checked}
      checkedChildren={<CheckOutlined />}
      unCheckedChildren={<CloseOutlined />}
      onChange={onToggle}
    />
  )
}
