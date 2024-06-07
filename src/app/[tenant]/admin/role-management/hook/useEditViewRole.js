import { Children, useEffect, useState } from 'react'

import {
  GetAllModules,
  GetPermissionById,
  PostNewRole,
  PutUpdatePermission,
} from '@/app/api/RoleManagement/RoleMangement'

const useEditViewRole = ({
  editRecord,
  onEditClick,
  modalStatus,
  refetchList,
}) => {
  const { data: permissionData, isLoading: permissionDataLoading } =
    GetPermissionById(
      { id: editRecord?.id },
      { enabled: Boolean(editRecord?.id) }
    )

  const { data: allModuleList } = GetAllModules({
    enabled: modalStatus === 'add',
  })
  const { mutate: UpdatePermissionMutation } = PutUpdatePermission()
  const { mutate: NewRoleMutation } = PostNewRole()
  // const [permissions] = useState(permissionData)
  const [{ item, permissions, newRoleName, isAllRead, isAllWrite }, setState] =
    useState({
      item: [],
      permissions: [],
      newRoleName: '',
      isAllRead: {},
      isAllWrite: {},
    })
  const onTextChange = (e) => {
    setState((prev) => ({
      ...prev,
      newRoleName: e.target.value,
    }))
  }
  const onReadWriteChange = (value, type, platform) => {
    console.log(value, type, platform, 'onReadWriteChange')
    setState((prev) => ({
      ...prev,
      [type]: { [platform]: value },
      permissions: prev.permissions.map((permission) =>
        permission.platform === platform
          ? { ...permission, [type == 'isAllRead' ? 'read' : 'write']: value }
          : permission
      ),
    }))
  }
  useEffect(() => {
    // permissionData?.result?.modulePermissions
    //   .filter((module) => module.platform === platform)
    //   .map((module) => module)

    setState((prev) => ({
      ...prev,
      permissions:
        permissionData?.result?.modulePermissions ?? allModuleList?.result,
    }))
  }, [permissionData?.result, allModuleList?.result])

  const updatePermission = (moduleId, type, value) => {
    setState((prev) => ({
      ...prev,
      permissions: prev.permissions.map((permission) =>
        permission.moduleId === moduleId
          ? { ...permission, [type]: value }
          : permission
      ),
    }))
  }
  const onApplyClick = (type) => {
    if (type == 'edit') {
      UpdatePermissionMutation(
        {
          modulePermissions: permissions,
          roleDto: permissionData?.result?.roleDto,
        },
        {
          onSuccess: () => {
            onEditClick()
            refetchList()
          },
        }
      )
    } else {
      NewRoleMutation(
        {
          modulePermissions: permissions,
          roleDto: {
            id: 0,
            name: newRoleName,
          },
        },
        {
          onSuccess: () => {
            onEditClick()
            refetchList()
          },
        }
      )
    }
  }
  return [
    {
      modules: permissions,
      permissionDataLoading,
      isAllRead,
      isAllWrite,
      newRoleName,
    },
    { updatePermission, onReadWriteChange, onApplyClick, onTextChange },
  ]
}
export default useEditViewRole
