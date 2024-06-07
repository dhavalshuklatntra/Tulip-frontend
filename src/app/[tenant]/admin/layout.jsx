'use client'
import { Layout, Menu } from 'antd'

import { useAdminLayout } from './Layout/hooks/useAdminLayout'
import Header from './Layout/_components/header/header'
import GurukulaLogo from '@/app/assets/Image/logo/logo.svg'

const { Sider, Content } = Layout
const AdminLayout = ({ props, children }) => {
  const [
    { collapsed, colorBgContainer, navList },
    { toggleCollapsed, handelMenuRedirection },
  ] = useAdminLayout()

  return (
    <Layout data-new-gr-c-s-check-loaded="true" data-gr-ext-installed="true">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <GurukulaLogo />
        <Menu
          onClick={(e) => handelMenuRedirection(e)}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={navList}
        />
      </Sider>
      <Layout>
        <Header
          toggleCollapsed={toggleCollapsed}
          collapsed={collapsed}
          colorBgContainer={colorBgContainer}
        />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
