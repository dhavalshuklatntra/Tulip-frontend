import { Header } from 'antd/es/layout/layout'
import React from 'react'
import {
  DownOutlined,
  MessageOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar } from 'antd'

import GurukulaLogo from '@/app/assets/Image/logo/logo.svg'
import YntraLogo from '@/app/assets/Image/logo/yntra-logo.svg'
import CustomDropdown from '@/app/_component/Dropdown/Dropdown'
import useHeaderHooks from '../hooks/useHeaderHooks'
import EnFlag from '@/app/assets/Image/languageFlags/en.svg'
import JpFlag from '@/app/assets/Image/languageFlags/jp.svg'
import CustomTooltip from '@/app/_component/ToolTip/Tooltip'
import FeedBack from './feedback/FeedBack'
import BecomeGuruModal from './BecomeGuruModal/BecomeGuruModal'

const GurukulaHeader = () => {
  const [
    {
      t,
      currentLogo,
      logoMenu,
      langMenu,
      currentLang,
      profileMenu,
      showFeedbackModal,
      feedbackValue,
      isPending,

      showBecomeGuruModal,
      becomeGuruSuccess,
      becomeGuruError,
    },
    {
      onMenuClickOnLogo,
      onMenuClickOnLang,
      handleFeedBack,
      updateFeedbackState,
      handleFeedbackSubmit,
      openBecomeGuruModal,
      becomeGuruModalSubmit,
    },
  ] = useHeaderHooks()

  return (
    <>
      <Header style={{ background: '#fff' }}>
        <CustomDropdown menu={logoMenu} onMenuClick={onMenuClickOnLogo}>
          {currentLogo == 'yntraLogo' ? <YntraLogo /> : <GurukulaLogo />}
        </CustomDropdown>
        <CustomDropdown menu={langMenu} onMenuClick={onMenuClickOnLang}>
          {currentLang == 'JP' ? <JpFlag /> : <EnFlag />}
        </CustomDropdown>
        <div onClick={() => handleFeedBack()} className="feedback">
          <CustomTooltip title={t('navbar.feedback')}>
            <MessageOutlined />
          </CustomTooltip>
        </div>
        <div onClick={() => openBecomeGuruModal()} className="feedback">
          <CustomTooltip title={t('navbar.become_guru')}>
            <UserAddOutlined />
          </CustomTooltip>
        </div>
        <CustomDropdown menu={profileMenu}>
          <Avatar size={64} icon={<UserOutlined />} />
        </CustomDropdown>

        {/* <span>
        {!isLessonRoute && ( // Conditionally render only if not a mentor
        <NextLink
           href={`gurukula/courses/details/`}
           text={courseDetails?.courseName}
           className="accept-challenge"
        />
        )}
        </span> */}

        <FeedBack
          openModal={showFeedbackModal}
          handleFeedBack={handleFeedBack}
          updateFeedbackState={updateFeedbackState}
          feedbackValue={feedbackValue}
          loading={isPending}
          handleFeedbackSubmit={handleFeedbackSubmit}
        />

        <BecomeGuruModal
          openModal={showBecomeGuruModal}
          openBecomeGuruModal={openBecomeGuruModal}
          becomeGuruSuccess={becomeGuruSuccess}
          becomeGuruError={becomeGuruError}
          loading={isPending}
          becomeGuruModalSubmit={becomeGuruModalSubmit}
        />
      </Header>
    </>
  )
}

export default GurukulaHeader
