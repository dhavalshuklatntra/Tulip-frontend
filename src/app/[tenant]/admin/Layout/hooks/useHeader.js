import { useDispatch, useSelector } from 'react-redux'
import { Flex } from 'antd'
import { useRouter } from 'next/navigation'

import EnFlag from '@/app/assets/Image/languageFlags/en.svg'
import JpFlag from '@/app/assets/Image/languageFlags/jp.svg'
import { useTranslation } from '@/app/i18n/server'
import { Logout } from '@/app/api/Auth/Auth'
import { LOGOUT } from '@/app/redux/Slices/login.Slice'

export const useHeaderHook = () => {
  const { i18n } = useTranslation()
  const { t } = useTranslation('header')

  const router = useRouter()
  const dispatch = useDispatch()

  const { tenantName, userDetails } = useSelector((state) => ({
    tenantName: state.tenant.tenantName,
    userDetails: state.login.userDetails,
  }))

  const mutationLogout = Logout()

  const handleLogout = async () => {
    await mutationLogout.mutateAsync()
    dispatch(LOGOUT())
  }

  const handleProfileMenu = (e) => {
    switch (e?.key) {
      case 'gurukula':
        router.replace(`/${tenantName}/gurukula/dashboard`)
        break
      case 'yntra':
        router.replace(`/${tenantName}/yntra`)
        break
      case 'profile':
        router.replace(`/${tenantName}/admin/profile`)
        break
      case 'setting':
        router.replace(`/${tenantName}/admin/setting`)
        break
      case 'logout':
        handleLogout()

        break
      default:
        break
    }
  }

  const menuitems = [
    {
      label: (
        <Flex>
          <EnFlag width={18} className="mr-1" />
          EN
        </Flex>
      ),
      key: 'en',
    },
    {
      label: (
        <Flex>
          <JpFlag width={18} className="mr-1" />
          JP
        </Flex>
      ),
      key: 'jp',
    },
  ]

  const profileMenu = [
    {
      label: <p>{t('adminDropdown.switch_to_gurukula')}</p>,
      key: 'gurukula',
    },
    {
      label: <p>{t('adminDropdown.switch_to_yntra')}</p>,
      key: 'yntra',
    },
    {
      label: <p>{t('adminDropdown.profile')}</p>,
      key: 'profile',
    },
    {
      label: <p>{t('adminDropdown.setting')}</p>,
      key: 'setting',
    },
    {
      label: <p>{t('adminDropdown.logout')}</p>,
      key: 'logout',
    },
  ]

  return [
    {
      t,
      i18n,
      menuitems,
      tenantName,
      profileMenu,
      EnFlag,
      JpFlag,
      userDetails,
    },
    { handleProfileMenu },
  ]
}
