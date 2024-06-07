'use client'
import React from 'react'
import { Flex, Layout } from 'antd'

import GurukulaHeader from './header/_components/header'

const { Content } = Layout

const ContentLayout = ({ children }) => {
  return (
    <Layout>
      <GurukulaHeader />
      <Content>{children}</Content>
    </Layout>
  )
}
export default ContentLayout
