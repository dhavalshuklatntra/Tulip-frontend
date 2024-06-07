'use client'
import { IconArrowNarrowLeft } from '@tabler/icons-react'
import { Flex, Typography } from 'antd'
import Link from 'next/link'
import React from 'react'

import TextField from '@/app/_component/TextField/TextField'
import PasswordField from '@/app/_component/TextField/PasswordField'
import useResetPassword from './hook/useResetPassword'
import Button from '@/app/_component/Button/Button'

const ResetPasswordPage = () => {
  const [{ t, tenantname, formik, ResetPasswordLoading }] = useResetPassword()
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
        <Typography.Title level={4} className="mt-0 mb-4">
          {t('reset_pass')}
        </Typography.Title>

        {/* <Typography.Paragraph className="mb-4">
                {t("forgotPass_text")}
                
              </Typography.Paragraph> */}

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <PasswordField
              error={errors?.password}
              message={t(errors?.password)}
              label={t('new_pass')}
              onChange={(e) => setFieldValue('password', e.target.value)}
              placeholder="**********"
              size="large"
            />
          </div>
          <div className="form-group mb-4">
            <PasswordField
              error={errors?.confirmPassword}
              message={t(errors?.confirmPassword)}
              label={t('confirm_password')}
              onChange={(e) => setFieldValue('confirmPassword', e.target.value)}
              placeholder="**********"
              size="large"
            />
          </div>

          <Button
            htmlType="submit"
            loading={ResetPasswordLoading}
            type="primary"
            label={t('update_password')}
            block
            size="large"
          />
        </form>
      </div>
    </>
  )
}

export default ResetPasswordPage
