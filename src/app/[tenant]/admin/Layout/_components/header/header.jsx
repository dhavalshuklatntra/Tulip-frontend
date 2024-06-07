import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import { Layout } from 'antd'
import React from 'react'
import Avatar from 'antd/es/avatar/avatar'

import Button from '@/app/_component/Button/Button'
import CustomDropdown from '@/app/_component/Dropdown/Dropdown'
import { useHeaderHook } from '../../hooks/useHeader'

const { Header } = Layout

const AdminHeader = ({ toggleCollapsed, collapsed, colorBgContainer }) => {
  const [
    { i18n, menuitems, profileMenu, EnFlag, JpFlag, userDetails },
    { handleProfileMenu },
  ] = useHeaderHook()

  const { firstname, lastname } = userDetails || {}

  return (
    <Header
      style={{
        display: 'flex',
        padding: 0,
        background: colorBgContainer,
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => toggleCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      {/* <div style={{ display: 'flex', flexDirection: 'row' }}> */}
      <CustomDropdown
        menu={menuitems}
        onMenuClick={(e) => {
          i18n.changeLanguage(e.key)
        }}
      >
        {i18n.language == 'en' ? <EnFlag /> : <JpFlag />}
      </CustomDropdown>
      <CustomDropdown
        menu={profileMenu}
        onMenuClick={(e) => {
          handleProfileMenu(e)
        }}
      >
        <div>
          <Avatar icon={<UserAddOutlined />} src={userDetails?.profileImgurl} />
        </div>
      </CustomDropdown>
      {/* </div> */}
    </Header>
  )
}

export default AdminHeader
