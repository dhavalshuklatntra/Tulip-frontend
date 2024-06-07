'use client'
import { Col, Flex, Layout, Row, Typography } from 'antd'
import React from 'react'

import './styles/authentication.css'
import LoginImage from '@/app/assets/svgs/loginImg.svg'
import Dropdown from '@/app/_component/Dropdown/Dropdown'
import EnFlag from '@/app/assets/Image/languageFlags/en.svg'
import JpFlag from '@/app/assets/Image/languageFlags/jp.svg'
import { useTranslation } from '@/app/i18n/server'

const { Paragraph, Title } = Typography
const menuitems = [
  {
    label: (
      <Flex>
        <EnFlag width={18} className="mr-1" />
        EN
      </Flex>
    ),
    key: 'en',
  },
  {
    label: (
      <Flex>
        <JpFlag width={18} className="mr-1" />
        JP
      </Flex>
    ),
    key: 'jp',
  },
]

const layout = ({ children }) => {
  const { i18n } = useTranslation()
  return (
    <Layout className="authentication-wrapper">
      <div className="authentication-inner">
        <Row gutter={16}>
          <Col
            md={12}
            className="authentication-left align-items-center d-flex p-5"
          >
            <Title level={3} className="mt-0 brand-logo">
              T<span>(u)</span>LIP
            </Title>
            <LoginImage />
          </Col>
          <Col md={12} className="authentication-right">
            <Dropdown
              menu={menuitems}
              onMenuClick={(e) => {
                i18n.changeLanguage(e.key)
              }}
            >
              {i18n.language == 'en' ? <EnFlag /> : <JpFlag />}
            </Dropdown>
            {children}
          </Col>
        </Row>
      </div>
    </Layout>
  )
}

export default layout
