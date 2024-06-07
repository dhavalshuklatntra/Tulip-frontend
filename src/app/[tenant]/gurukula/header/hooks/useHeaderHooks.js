import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'

import { useTranslation } from '@/app/i18n/server'
import GurukulaLogo from '@/app/assets/Image/logo/logo.svg'
import YntraLogo from '@/app/assets/Image/logo/yntra-logo.svg'
import EnFlag from '@/app/assets/Image/languageFlags/en.svg'
import JpFlag from '@/app/assets/Image/languageFlags/jp.svg'
import { submitFeedBack } from '@/app/api/Feedback/Feedback'
import { sendMentorReq } from '@/app/api/becomeMentor/BecomeMentor'
import { Logout } from '@/app/api/Auth/Auth'

const useHeaderHooks = () => {
  const { t } = useTranslation('header')
  const { i18n } = useTranslation()

  const currentLang = i18n.language

  const profile =
    useSelector((state) => state.login?.userDetails) ||
    localStorage.getItem('profile')

  const [
    { currentLogo, showFeedbackModal, feedbackValue, showBecomeGuruModal },
    setState,
  ] = useState({
    currentLogo: 'gurukula',
    showFeedbackModal: false,
    feedbackValue: {
      selectedOption: '',
      additionalDetails: '',
    },
    showBecomeGuruModal: false,
  })

  const updateState = (field, value) => {
    setState((state) => ({
      ...state,
      [field]: value,
    }))
  }

  const { mutate: feedBackSubmit, isPending } = submitFeedBack({
    showSuccMsg: true,
    showErrorMsg: true,
  })
  const {
    isLoading: sentMentorReqLoader,
    mutate: requestForMentorship,
    isSuccess: becomeGuruSuccess,
    error: becomeGuruError,
  } = sendMentorReq({
    refetchOnWindowFocus: false,
    enabled: false,
    showSuccMsg: true,
  })

  const mutationLogout = Logout()

  const onMenuClickOnLogo = (e) => {
    if (e?.key == 'gurukulaLogo') {
      router.push(`gurukula/dashboard`)

      setState((state) => ({
        ...state,
        currentLogo: e?.key,
      }))
    }
  }

  const onMenuClickOnLang = (e) => {
    i18n.changeLanguage(e?.key)
  }

  const handleFeedBack = () => {
    updateState('showFeedbackModal', !showFeedbackModal)
  }

  const updateFeedbackState = (key, value) => {
    setState((state) => ({
      ...state,
      feedbackValue: {
        ...feedbackValue,
        [key]: value,
      },
    }))
  }
  const handleFeedbackSubmit = (values) => {
    const { selectedOption, additionalDetails } = feedbackValue
    const payload = {
      typeOfFeedback: selectedOption,
      content: additionalDetails,
    }
    feedBackSubmit(payload, { onSuccess: () => handleFeedBack() })
  }

  const becomeGuruModalSubmit = () => {
    const payload = {
      id: 0,
      ugRefId: profile?.gurukulaId,
      requestedDate: new Date(),
    }
    requestForMentorship(payload, {
      onSuccess: () => {
        // handleModal();
        tracker.trackEventBecomeGuru()
      },
    })
  }

  const openBecomeGuruModal = () => {
    updateState('showBecomeGuruModal', !showBecomeGuruModal)
  }

  const handleLogout = async () => {
    await mutationLogout.mutateAsync()
    Cookies.remove('user')
    Cookies.remove('Ugid')
    Cookies.remove('Tenant')
    const tenantname = Cookies.get('tenantname')
    router.push(`/${tenantname}`)
    dispatch(logout())
    router.refresh()
  }

  const logoMenu = [
    {
      label: (
        <p>
          <GurukulaLogo />
          Gurukula
        </p>
      ),
      key: 'gurukulaLogo',
    },
    {
      label: (
        <p onClick={() => router.push(`yntra/dashboard`)}>
          <YntraLogo />
          Yntra
        </p>
      ),
      key: 'yntraLogo',
    },
  ]

  const langMenu = [
    {
      label: (
        <p>
          <JpFlag /> JP
        </p>
      ),
      key: 'JP',
    },
    {
      label: (
        <p>
          <EnFlag /> EN
        </p>
      ),
      key: 'EN',
    },
  ]

  const profileMenu = [
    {
      label: (
        <>
          Mentor Panel
          {/* {CheckOfMentorRole(roleList) >= 0 && (
      <p 
      onClick={() =>
        router.replace(
          `${getYntraURL()}/${tenantname}/admin/dashboard/`
        )
      }
      >
        {t("navbar.switch_to_admin")} Mentor Panel
        </p>
      )} */}
        </>
      ),
      key: 'mentor-panel',
    },

    {
      label: (
        <p onClick={() => router.replace(`/yntra/`)}>
          Yntra
          {/* {t("navbar.switch_to")} Yntra */}
        </p>
      ),
      key: 'yntra',
    },
    {
      label: (
        <p onClick={() => router.push(`/gurukula/profile`)}>
          Profile
          {/* {t("navbar.profile")} */}
        </p>
      ),
    },
    {
      label: <p onClick={() => handleLogout()}>{t('navbar.logout')}</p>,
    },
  ]

  return [
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
  ]
}

export default useHeaderHooks
