'use client'
import React from 'react'
import { Card, Checkbox, Col, Flex, Form, Row, Typography } from 'antd'
import Link from 'next/link'
import { Layout } from 'antd'
import { IconArrowNarrowLeft } from '@tabler/icons-react'

import useLogin from './hook/useLogin'
import TextField from '@/app/_component/TextField/TextField'
import PasswordField from '@/app/_component/TextField/PasswordField'
import Button from '@/app/_component/Button/Button'

const { Paragraph, Title } = Typography

const { Content } = Layout
const Loginpage = () => {
  const [{ t, rememberMe, formik, loginLoading, tenantname }, {}] = useLogin()
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
    <>
      <Flex align="start" justify="space-between" className="p-5 pb-0">
        <Link href={`/${tenantname}`} className="d-flex align-items-center">
          <IconArrowNarrowLeft stroke={1} />
          {t('back_to_home')}
        </Link>
      </Flex>

      <div className="p-5 ">
        <Typography.Title level={3} className="mt-0 brand-logo mobile-show">
          T<span>(u)</span>LIP
        </Typography.Title>
        <Typography.Title level={4} className="mt-0">
          {t('login')}
        </Typography.Title>
        <Paragraph className="mb-4">
          {t('have_no_account')}
          <Link href={`/${tenantname}/signup/`} replace={true}>
            {t('signup')}
          </Link>
        </Paragraph>
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
          <div className="form-group mb-4">
            <PasswordField
              error={errors?.password}
              message={t(errors?.password)}
              label={t('password')}
              onChange={(e) => setFieldValue('password', e.target.value)}
              placeholder="**********"
              size="large"
            />
          </div>
          <div className="mb-4">
            <Flex align="center" justify="space-between">
              <Checkbox
                onChange={() => setFieldValue('rememberMe', !values.rememberMe)}
              >
                {t('remember_me')}
              </Checkbox>
              <Link href={`/${tenantname}/forgot-password/`}>
                {t('forgot_password')}
              </Link>
            </Flex>
          </div>
          <Button
            htmlType="submit"
            loading={loginLoading}
            // onClick={()=>handleSubmit()}
            type="primary"
            label={t('login')}
            block
            size="large"
          />
        </form>
      </div>
    </>
  )
}

export default Loginpage
