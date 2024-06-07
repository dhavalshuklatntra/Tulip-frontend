import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserOutlined } from '@ant-design/icons'
import { Flex, theme } from 'antd'
import { uniqBy } from 'lodash'
import { useRouter } from 'next/navigation'

import { getPermissionByIDs } from '@/app/api/adminRbackSideMenu/adminRbackSideMenu'
import { generatePath, replaceHyphenWithSpace } from '@/app/utils/common'
import { SET_NAV_LIST } from '@/app/redux/Slices/adminNavigation.Slice'
import { useTranslation } from '@/app/i18n/server'
import { Translation } from 'react-i18next'

export const useAdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [{ navList }, setState] = useState({ navList: [] })

  const dispatch = useDispatch()
  const { t } = useTranslation()
  const router = useRouter()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const { rolesList, tenantName, auth } = useSelector((state) => ({
    rolesList: state?.login?.userDetails?.roles,
    tenantName: state?.tenant?.tenantname,
  }))

  const roleIds = rolesList
    ?.map((role) => role.name !== 'Mentee' && role.id)
    .filter(Boolean)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const { data: rolePermissionData, isLoading: navListLoading } =
    getPermissionByIDs(
      {
        roleIds,
      },
      {
        enabled: Boolean(roleIds?.length) && Boolean(tenantName),
      }
    )

  const dashboardRoute = [
    {
      title: 'Dashboard',
      label: <Translation>{(t) => <>{t('headers.dashboard')}</>}</Translation>,
      icon: <UserOutlined />,
      path: `/${tenantName}/admin/dashboard`,
    },
  ]

  useEffect(() => {
    if (rolePermissionData) {
      setState((prevState) => ({
        ...prevState,
        navList: [
          ...dashboardRoute,
          ...createNavList(rolePermissionData.result),
        ],
      }))
    }
  }, [rolePermissionData])

  const createNavList = (data) => {
    const finalList = data.flatMap((item) =>
      item.modulePermissions
        .filter((permission) => permission?.read || permission.write)
        .map((permission, index) => {
          return {
            title: permission.modulename,
            label: (
              <Translation>
                {(t) => (
                  <>
                    {t(
                      'headers.' + replaceHyphenWithSpace(permission.modulename)
                    )}
                  </>
                )}
              </Translation>
            ),
            // icon: getIconForModule(elem.modulename),
            path: generatePath(permission.modulename, tenantName),
            read: permission.read,
            write: permission.write,
            key: index,
          }
        })
    )
    const uniqueNavList = uniqBy(finalList, 'title')
    dispatch(SET_NAV_LIST(uniqueNavList))
    return uniqueNavList
  }

  const handelMenuRedirection = (e) => {
    const clickedMenu = navList[parseInt(e.key) + 1]
    router.replace(clickedMenu.path)
  }
  return [
    { collapsed, colorBgContainer, borderRadiusLG, navList: navList },
    { toggleCollapsed, handelMenuRedirection },
  ]
}
