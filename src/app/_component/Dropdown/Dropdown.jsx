import React from 'react'
import { Dropdown, Space } from 'antd'

const CustomDropdown = ({
  children,
  menu,
  placement = 'bottom',
  trigger = 'click',
  onMenuClick,
}) => {
  const menuProps = {
    items: menu,
    onClick: onMenuClick,
  }

  return (
    <Dropdown menu={menuProps} placement={placement} trigger={trigger}>
      {children}
    </Dropdown>
  )
}

export default CustomDropdown
