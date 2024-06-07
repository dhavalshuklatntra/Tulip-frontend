'use client'
import { Checkbox, Col, Flex, Layout, Row, Typography } from 'antd'
import React from 'react'
import Link from 'next/link'
import { IconArrowNarrowLeft } from '@tabler/icons-react'
import moment from 'moment'
import dayjs from 'dayjs'

import LoginImage from '@/app/assets/svgs/loginImg.svg'
import TextField from '@/app/_component/TextField/TextField'
import PasswordField from '@/app/_component/TextField/PasswordField'
import Button from '@/app/_component/Button/Button'
import useSignUp from './hook/useSignup'

// import "../styles/authentication.css";
import DatePicker from '@/app/_component/DatePicker/DatePicker'
import PaginateDropdown from '@/app/_component/PaginatedDropdown/PaginateDropdown'
import endpoints from '@/app/services/axios/endpoints'

const SignUpPage = () => {
  const [{ t, tenantname, formik, signupLoading }, {}] = useSignUp()
  const { errors, touched, handleSubmit, setFieldValue, values } = formik
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
          {t('signup_text')}
        </Typography.Title>
        <Typography.Paragraph className="mb-4">
          {t('have_account')}
          <Link href={`/${tenantname}/login`} replace={true}>
            {t('login')}
          </Link>
        </Typography.Paragraph>

        <form onSubmit={handleSubmit}>
          <Row gutter={16}>
            <Col lg={12} sm={24} xs={24}>
              <div className="form-group mb-4">
                <TextField
                  value={values?.firstName}
                  label={t('first_name')}
                  type="text"
                  onChange={(e) => setFieldValue('firstName', e.target.value)}
                  placeholder="Enter your First Name"
                  size="large"
                  error={errors.firstName}
                  message={t(errors?.firstName)}
                />
              </div>
            </Col>
            <Col lg={12} sm={24} xs={24}>
              <div className="form-group mb-4">
                <TextField
                  error={errors.lastName}
                  message={t(errors.lastName)}
                  value={values?.lastName}
                  label={t('last_name')}
                  type="text"
                  onChange={(e) => setFieldValue('lastName', e.target.value)}
                  placeholder="Enter your Last Name"
                  size="large"
                />
              </div>
            </Col>
            <Col span={24}>
              <div className="form-group mb-4">
                <TextField
                  error={errors.email}
                  message={t(errors.email)}
                  value={values?.email}
                  label={t('email')}
                  type="text"
                  onChange={(e) => setFieldValue('email', e.target.value)}
                  placeholder="Enter your Email "
                  size="large"
                />
              </div>
            </Col>
            <Col lg={12} sm={24} xs={24}>
              <div className="form-group mb-4">
                <PasswordField
                  value={values?.password}
                  label={t('password')}
                  onChange={(e) => setFieldValue('password', e.target.value)}
                  placeholder="**********"
                  size="large"
                />
              </div>
            </Col>
            <Col lg={12} sm={24} xs={24}>
              <div className="form-group mb-4">
                <PasswordField
                  value={values?.confirmPassword}
                  label={t('confirm_password')}
                  onChange={(e) =>
                    setFieldValue('confirmPassword', e.target.value)
                  }
                  placeholder="**********"
                  size="large"
                />
              </div>
            </Col>
            <Col lg={12} sm={24} xs={24}>
              <div className="form-group mb-4">
                <DatePicker
                  value={values?.dob}
                  error={errors?.dob}
                  message={t(errors?.dob)}
                  label="Date of Birth"
                  placeholder="DD/MMM/YYYY"
                  size="large"
                  onChange={(date, dateString) => {
                    setFieldValue('dob', dateString ? date : '')
                  }}
                  className="w-100"
                />
              </div>
            </Col>
            <Col lg={12} sm={24} xs={24}>
              <div className="form-group mb-4">
                <PaginateDropdown
                  value={values?.countryname}
                  endpoint={endpoints.country}
                  isMulti={false}
                  label="Country"
                  name="Country"
                  accessLabelKey="value"
                  accessValueKey="iso"
                  closeMenuOnSelect={true}
                  onChange={(e, value) => setFieldValue('countryname', e)}
                  className="w-100"
                  placeholder="Select Country"
                />
              </div>
            </Col>
          </Row>
          <div className="mb-4">
            <Checkbox onChange={(e) => setFieldValue('tnc', e.target.checked)}>
              {t('accept_the')} <Link href="/terms">{t('terms')} </Link>
              {t('and')}{' '}
              <Link href="/privacy-policy">{t('privacy_policy')}</Link>
            </Checkbox>
          </div>

          <Button
            htmlType="submit"
            loading={signupLoading}
            disabled={!values.tnc}
            type="primary"
            label={t('register')}
            block
            size="large"
          />
        </form>
      </div>
    </>
  )
}

export default SignUpPage
