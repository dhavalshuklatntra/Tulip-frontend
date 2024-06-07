import { useEffect, useState } from 'react'

import {
  GetRoleList,
  PostUpdateStatus,
} from '@/app/api/RoleManagement/RoleMangement'
import { useTranslation } from '@/app/i18n/server'

const useRoleManagement = () => {
  const { t } = useTranslation('rolemanagement')
  const [
    { pagination, roleList, searchValue, isViewEdit, editRecord, modalStatus },
    setState,
  ] = useState({
    pagination: { ItemsPerPage: 10, page: 1 },
    roleList: [],
    searchValue: '',
    isViewEdit: false,
    editRecord: null,
    modalStatus: null,
  })
  const {
    data: roleListData,
    isLoading: roleListLoading,
    refetch,
  } = GetRoleList(
    {
      page: pagination.page,
      ItemsPerPage: pagination.ItemsPerPage,
    },
    {
      enabled: Boolean(pagination.page) || Boolean(pagination.ItemsPerPage),
    }
  )
  const updater = (elem, newdata) => {
    setState((prev) => ({
      ...prev,
      roleList: prev.roleList.map((role) =>
        role.id === newdata.id ? { ...role, isActive: newdata.isActive } : role
      ),
    }))
  }
  const { mutate: UpdateStatusMutation, isPending: roleStatusLoading } =
    PostUpdateStatus(updater)
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      roleList: searchValue == '' ? roleListData?.result : roleListData?.result,
      pagination: { ...prev.pagination, ...roleListData?.pagination },
    }))
  }, [roleListData?.pagination, roleListData?.result, searchValue])
  const onAddClick = () => {
    setState((prev) => ({
      ...prev,
      modalStatus: 'add',
      isViewEdit: !prev.isViewEdit,
    }))
  }
  const onPaginationChange = (page, pageSize) => {
    setState((prev) => ({
      ...prev,
      userLIst: roleListData?.result,
      pagination: { ...prev.pagination, page: page, ItemsPerPage: pageSize },
    }))
  }
  const onEditClick = (record, type) => {
    setState((prev) => ({
      ...prev,
      modalStatus: type,
      isViewEdit: !prev.isViewEdit,
      editRecord: record,
    }))
  }
  const onToggleClick = (e, result) => {
    UpdateStatusMutation(
      { ...result, isActive: e },
      {
        onSuccess: () => {
          refetch()
        },
      }
    )
  }

  return [
    {
      t,
      roleList,
      roleListLoading,
      pagination,
      isViewEdit,
      editRecord,
      modalStatus,
      roleStatusLoading,
    },
    {
      onAddClick,
      refetchList: refetch,
      onPaginationChange,
      onEditClick,
      onToggleClick,
    },
  ]
}
export default useRoleManagement
