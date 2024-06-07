'use client'
import { Col, Flex, Layout, Row, Typography } from 'antd'
import React from 'react'
import Link from 'next/link'
import { IconArrowNarrowLeft } from '@tabler/icons-react'

import VerifyEmailImg from '@/app/assets/Image/Auth/verify-email.svg'
import useVerifyEmail from './hook/useVerifyEmail'
import Button from '@/app/_component/Button/Button'
import '../styles/authentication.css'
const VerifyPage = () => {
  const [
    { t, tenantname, user, resentEmailLoading },
    { handleSendVerificationEmail },
  ] = useVerifyEmail()
  return (
    <>
      <Flex align="start" justify="space-between" className="p-5 pb-0">
        <Link href={`/${tenantname}`} className="d-flex align-items-center">
          <IconArrowNarrowLeft stroke={1} />
          {t('back_to_home')}
        </Link>
      </Flex>
      <div className="p-5">
        <Typography.Title level={3} className="mt-0 brand-logo mobile-show">
          T<span>(u)</span>LIP
        </Typography.Title>
        <Typography.Title level={4} className="mt-0">
          {t('verify_emailAddresss')}
        </Typography.Title>

        <Typography.Paragraph className="mb-4">
          {t('sent_email_address')}
          <strong>{user?.personalEmail ?? ''}</strong>
        </Typography.Paragraph>
        <Typography.Paragraph className="mb-4">
          {t('verify_email_address')}
        </Typography.Paragraph>
        <Button
          htmlType="button"
          onClick={() => handleSendVerificationEmail()}
          loading={resentEmailLoading}
          type="primary"
          label={t('resend_verification')}
          block
          size="large"
        />
      </div>
    </>
  )
}

export default VerifyPage
