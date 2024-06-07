import React from 'react'
import Link from 'next/link'

import Modal from '@/app/_component/Modal/Modal'
import SimpleSelect from '@/app/_component/Select/Select'
import { feedbackOptions, profileNotCompleteMsg } from '@/app/utils/Constants'
import { useTranslation } from '@/app/i18n/server'
import TextField from '@/app/_component/TextField/TextField'

const BecomeGuruModal = ({
  openModal,
  title,
  openBecomeGuruModal,
  becomeGuruModalSubmit,
  loading,
  becomeGuruSuccess,
  becomeGuruError,
}) => {
  const [t] = useTranslation('header')

  const isUserProfileComplete =
    becomeGuruError?.displayMessage !== profileNotCompleteMsg

  return (
    <div>
      <Modal
        openModal={openModal}
        loading={loading}
        title={t('Be_guru.become_guru')}
        // disabled={feedbackValue?.additionalDetails ? true : false}
        submitButtonText={t('Be_guru.submit')}
        handleCancel={() => openBecomeGuruModal()}
        handleClick={becomeGuruModalSubmit}
        isFooter={isUserProfileComplete}
      >
        <>
          {isUserProfileComplete ? (
            <>
              <p>{t('Be_guru.embrace_thought')}</p>
            </>
          ) : (
            <>
              <p>{t('Be_guru.unlock_mentorship')}</p>
              <p>{t('Be_guru.enhance_mentorship')}</p>
              <p>{t('Be_guru.personal_info')}</p>
              <Link href="/gurukula/profile" target="__blank">
                <p>{t('Be_guru.click_here')}</p>
              </Link>

              <p>{t('Be_guru.complete_profile')}</p>
            </>
          )}
        </>
      </Modal>
    </div>
  )
}

export default BecomeGuruModal
