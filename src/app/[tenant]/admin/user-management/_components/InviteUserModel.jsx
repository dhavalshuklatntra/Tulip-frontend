import React from 'react'

import CustomModal from '@/app/_component/Modal/Modal'
import InputTags from '@/app/_component/InputTags/InputTags'

const InviteUserModel = ({
  isInviteModal,
  onSendClick,
  onInviteUserClick,
  emailList,
  onChange,
  onInputChange,
  onKeyDown,
  email,
  t,
}) => {
  return (
    <CustomModal
      isFooter={true}
      openModal={isInviteModal}
      handleClick={onSendClick}
      title={t('invite_user')}
      handleCancel={onInviteUserClick}
      submitButtonText={t('send')}
    >
      <InputTags
        placeholder={'Enter Email'}
        value={emailList}
        onChange={(e) => onChange(e)}
        onInputChange={(e) => onInputChange(e)}
        isMulti={true}
        onKeyDown={(e) => {
          if (!email) return
          switch (e.key) {
            case 'Enter':
            case 'Tab':
              onKeyDown(email)
              break
            default:
              break
          }
        }}
      />
    </CustomModal>
  )
}

export default InviteUserModel
