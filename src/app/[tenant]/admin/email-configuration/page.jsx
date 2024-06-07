'use client'
import { Checkbox, Col, Row, Typography } from 'antd'
import React from 'react'

import useEmailConfig from './hook/useEmailConfig'
import TextField from '@/app/_component/TextField/TextField'
import Button from '@/app/_component/Button/Button'
import Loader from '@/app/_component/Loader/Loader'
import PasswordField from '@/app/_component/TextField/PasswordField'

const EmailConfigPage = () => {
  const [{ t, formik, EmailConfigLoading }, { onFieldChange }] =
    useEmailConfig()
  const { values, errors, handleSubmit } = formik
  return (
    <div>
      <Typography.Title level={3}>{t('email_config')} </Typography.Title>
      {EmailConfigLoading && <Loader />}
      <form onSubmit={handleSubmit}>
        <Row gutter={4}>
          <Col>
            <TextField
              error={errors.fromEmail}
              message={t(errors.fromEmail)}
              value={values?.fromEmail}
              label={t('from_email')}
              type="text"
              onChange={(e) => onFieldChange('fromEmail', e.target.value)}
              size="large"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextField
              error={errors.smtpHost}
              message={t(errors.smtpHost)}
              value={values?.smtpHost}
              label={t('smtp_host')}
              type="text"
              onChange={(e) => onFieldChange('smtpHost', e.target.value)}
              size="large"
            />
          </Col>
          <Col>
            <TextField
              error={errors.poP3Host}
              message={t(errors.poP3Host)}
              value={values?.poP3Host}
              label={t('pop3/imps_host')}
              type="text"
              onChange={(e) => onFieldChange('poP3Host', e.target.value)}
              size="large"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextField
              error={errors.smtPort}
              value={values?.smtPort}
              message={t(errors.smtPort)}
              label={t('smtp_port')}
              type="text"
              onChange={(e) => onFieldChange('smtPort', e.target.value)}
              size="large"
            />
          </Col>
          <Col>
            <TextField
              error={errors.poP3Port}
              message={t(errors.poP3Port)}
              value={values?.poP3Port}
              label={t('pop3/imps_port')}
              type="text"
              onChange={(e) => onFieldChange('poP3Port', e.target.value)}
              size="large"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextField
              error={errors.username}
              message={t(errors.username)}
              value={values?.username}
              label={t('user_name')}
              type="text"
              onChange={(e) => onFieldChange('username', e.target.value)}
              size="large"
            />
          </Col>
          <Col>
            <PasswordField
              error={errors?.password}
              message={t(errors?.password)}
              value={values?.password}
              label={t('password')}
              onChange={(e) => onFieldChange('password', e.target.value)}
              placeholder="**********"
            />
          </Col>
        </Row>
        <Row>
          <Checkbox
            checked={values?.smtpAuthentication}
            onChange={(e) =>
              onFieldChange('smtpAuthentication', e.target.checked)
            }
          >
            {t('auth_req')}
          </Checkbox>
        </Row>
        <Row>
          <Button htmlType="submit" label={t('save')} type="primary" />
        </Row>
      </form>
    </div>
  )
}

export default EmailConfigPage
