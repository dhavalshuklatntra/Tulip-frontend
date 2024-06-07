import { useEffect, useState } from 'react'

import {
  GetUserRoles,
  PostUpdateRole,
} from '@/app/api/UserManagement/UserManagement'
import { useTranslation } from '@/app/i18n/server'

const useEditUser = ({
  currentId,
  currentRoles,
  onEditClick,
  refetchList,
  isEditModal,
}) => {
  const { t } = useTranslation('usermanagement')
  const { data: rolesListData } = GetUserRoles(
    { id: currentId },
    {
      enabled: Boolean(currentId) && isEditModal,
    }
  )
  const { mutate: UpdateRoleMutation } = PostUpdateRole()
  const [{ currentUserRoles, rolesList, updatePayload }, setState] = useState({
    currentUserRoles: [],
    updatePayload: [],
    rolesList: [],
  })
  useEffect(() => {
    if (rolesListData) {
      setState((prev) => ({
        ...prev,
        rolesList: rolesListData?.result,
        currentUserRoles: rolesListData?.result?.filter((elem) =>
          currentRoles.includes(elem.rolename)
        ),
      }))
    }
  }, [rolesListData?.result])

  const onSelectDeselect = (e, option, type) => {
    const currentRoles = currentUserRoles
    switch (type) {
      case 'select':
        setState((prev) => ({
          ...prev,
          updatePayload: [
            ...currentRoles,
            { ...option, userId: currentId, modifyStatus: true },
          ],
        }))
        break
      case 'deselect':
        const isModifyStatus = option.modifyStatus
        setState((prev) => ({
          ...prev,
          updatePayload: isModifyStatus
            ? [
                ...currentRoles,
                { ...option, userId: currentId, modifyStatus: false },
              ]
            : [...prev.currentUserRoles],
        }))
        break
    }
  }
  const onChange = (e, option) => {
    setState((prev) => ({
      ...prev,
      currentUserRoles: option,
    }))
  }
  const onUpdateClick = () => {
    UpdateRoleMutation(updatePayload, {
      onSuccess: () => {
        onEditClick()
        refetchList()
      },
    })
  }

  return [
    { rolesList, currentUserRoles },
    { onChange, onUpdateClick, onSelectDeselect },
  ]
}
export default useEditUser
