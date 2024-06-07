'use client'
import { Flex, Spin } from 'antd'
import React from 'react'

import useConfirmEmail from './hook/useConfirmEmail'

const ConfirmEmailPage = () => {
  useConfirmEmail()
  return (
    <Flex
      align="center"
      gap="middle"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
      <Spin size="large" tip="Loading">
        <div
          style={{
            padding: 50,
          }}
        />
      </Spin>
    </Flex>
  )
}

export default ConfirmEmailPage
