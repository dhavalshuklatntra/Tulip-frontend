'use client'
import { IconArrowNarrowLeft } from '@tabler/icons-react'
import { Col, Flex, Layout, Row, Typography } from 'antd'
import Link from 'next/link'
import React from 'react'

import TextField from '@/app/_component/TextField/TextField'
import Button from '@/app/_component/Button/Button'
import useForgotPassword from './hook/useForgotPassword'
import '../styles/authentication.css'

const ForgotPasswordPage = () => {
  const [{ t, tenantname, formik }] = useForgotPassword()
  const {
    values,
    handleBlur,
    setFieldValue,
    handleChange,
    errors,
    touched,
    handleSubmit,
  } = formik
  return (
    // <Layout className="authentication-wrapper">
    //   <div className="authentication-inner">
    //     <Row gutter={16}>
    //       <Col md={12} className="authentication-left d-flex p-5">
    //         <Typography.Title level={3} className="mt-0 brand-logo">
    //           T<span>(u)</span>LIP
    //         </Typography.Title>
    //         {/* <LoginImage /> */}
    //       </Col>
    //   <Col md={12} className="authentication-right">
    <>
      <Flex align="start" justify="space-between" className="p-5 pb-0">
        <Link
          href={`/${tenantname}/login`}
          className="d-flex align-items-center"
        >
          <IconArrowNarrowLeft stroke={1} />
          {t('back_to_login')}
        </Link>
      </Flex>

      <div className="p-5">
        <Typography.Title level={3} className="mt-0 brand-logo mobile-show">
          T<span>(u)</span>LIP
        </Typography.Title>
        <Typography.Title level={4} className="mt-0">
          {t('forgot_password')}
        </Typography.Title>

        <Typography.Paragraph className="mb-4">
          {t('forgotPass_text')}
        </Typography.Paragraph>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <TextField
              error={errors.email}
              message={t(errors.email)}
              label={t('email')}
              type="text"
              onChange={(e) => setFieldValue('email', e.target.value)}
              placeholder="Enter your email or gurukula Id"
              size="large"
            />
          </div>

          <Button
            htmlType="submit"
            loading={false}
            disabled={!values.email}
            type="primary"
            label={t('reset_password')}
            block
            size="large"
          />
        </form>
      </div>
    </>
  )
}

export default ForgotPasswordPage
