import React from 'react'

import Modal from '@/app/_component/Modal/Modal'
import SimpleSelect from '@/app/_component/Select/Select'
import { feedbackOptions } from '@/app/utils/Constants'
import { useTranslation } from '@/app/i18n/server'
import TextField from '@/app/_component/TextField/TextField'

const FeedBack = ({
  openModal,
  title,
  handleFeedBack,
  updateFeedbackState,
  feedbackValue,
  handleFeedbackSubmit,
  loading,
}) => {
  const [t] = useTranslation('header')

  return (
    <div>
      <Modal
        openModal={openModal}
        title={t('Give_feedback.share_thought')}
        isFooter={true}
        loading={loading}
        disabled={feedbackValue?.additionalDetails ? true : false}
        submitButtonText={t('Give_feedback.send_feedback')}
        handleCancel={() => handleFeedBack()}
        handleClick={() => handleFeedbackSubmit(feedbackValue)}
      >
        <>
          <p>
            {t('Give_feedback.required')}
            <span className="redTxt">*</span>
          </p>

          <p className="mt-3 mb-2">
            {t('Give_feedback.select_feedback')}

            <span className="redTxt">*</span>
          </p>

          <SimpleSelect
            onChange={(e) => {
              updateFeedbackState('selectedOption', e)
            }}
            value={feedbackValue.selectedOption || ''}
            options={feedbackOptions}
          />
          <p className="mt-3 mb-2">
            {t('Give_feedback.letus_know')}
            <span className="redTxt">*</span>
          </p>
          <TextField
            placeholder={t('Give_feedback.aditional_details')}
            value={feedbackValue.additionalDetails || ''}
            onChange={(e) => {
              updateFeedbackState('additionalDetails', e.target.value)
            }}
          />
        </>
      </Modal>
    </div>
  )
}

export default FeedBack
