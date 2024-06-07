import React from 'react'
import { Modal } from 'antd'

import Button from '../Button/Button'
import { useTranslation } from '@/app/i18n/server'

const CustomModal = ({
  openModal,
  title,
  handleClick,
  handleCancel,
  loading,
  children,
  isFooter,
  submitButtonText,
  disabled,
  isReset = false,
  handelReset,
}) => {
  const { t } = useTranslation()
  return (
    <Modal
      open={openModal}
      title={title}
      onOk={handleClick}
      onCancel={handleCancel}
      footer={
        isFooter
          ? [
              <>
                <Button key="back" onClick={handleCancel} label={t('cancel')} />
                {isReset && (
                  <Button
                    key="reset"
                    disabled={disabled}
                    onClick={handelReset}
                    label={t('reset')}
                  />
                )}
                <Button
                  key="submit"
                  type="primary"
                  loading={loading}
                  onClick={handleClick}
                  disabled={disabled}
                  label={submitButtonText}
                />
              </>,
            ]
          : ''
      }
    >
      {children}
    </Modal>
  )
}

export default CustomModal
