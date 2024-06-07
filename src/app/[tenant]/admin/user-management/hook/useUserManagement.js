import { debounce } from 'lodash'
import { useEffect, useState } from 'react'

import { useTranslation } from '@/app/i18n/server'
import {
  GetUserList,
  GetUserListSearch,
  PostInviteUser,
  PostUpdateStatus,
} from '@/app/api/UserManagement/UserManagement'

const useUserManagement = () => {
  const { t } = useTranslation('usermanagement')
  const [
    {
      isInviteModal,
      editRecord,
      emailList,
      email,
      userLIst,
      pagination,
      isEditModal,
      searchValue,
      isAssignEditModal,
    },
    setState,
  ] = useState({
    isInviteModal: false,
    emailList: [],
    editRecord: null,
    isEditModal: false,
    isAssignEditModal: false,
    email: '',
    pagination: { ItemsPerPage: 10, page: 1 },
    searchValue: '',
  })

  const onSearch = debounce((e) => {
    setState((prev) => ({
      ...prev,
      searchValue: e.target.value,
    }))
  }, 400)
  const onButtonClick = () => {}
  const {
    data: UserListdata,
    refetch,
    isLoading: UserListLoading,
  } = GetUserList(
    {
      page: pagination.page,
      ItemsPerPage: pagination.ItemsPerPage,
    },
    {
      enabled: Boolean(pagination.page) || Boolean(pagination.ItemsPerPage),
    }
  )
  const { data: UserSeachtdata, isLoading: UserSearchLoading } =
    GetUserListSearch(
      {
        value: searchValue,
      },
      { enabled: Boolean(searchValue) }
    )
  useEffect(() => {
    // if (UserListdata?.result > 0)
    setState((prev) => ({
      ...prev,
      userLIst:
        searchValue == '' ? UserListdata?.result : UserSeachtdata?.result,
      pagination: { ...prev.pagination, ...UserListdata?.pagination },
    }))
  }, [UserListdata?.result, UserSeachtdata?.result])

  const updater = (elem, newdata) => {
    setState((prev) => ({
      ...prev,
      userLIst: prev.userLIst.map((user) =>
        user.id === newdata.id ? { ...user, isActive: newdata.isActive } : user
      ),
    }))
  }
  const { mutate: sentInviteMutation } = PostInviteUser()
  const { mutate: updateStateMutation, isPending: UserStateLoading } =
    PostUpdateStatus(updater)

  const onInviteUserClick = () => {
    setState((prevState) => ({
      ...prevState,
      isInviteModal: !prevState.isInviteModal,
    }))
  }
  const onInputChange = (e) => {
    setState((prev) => ({ ...prev, email: e }))
  }
  const onKeyDown = (email) => {
    setState((prev) => ({
      ...prev,
      emailList: [...prev.emailList, { label: email, value: email }],
    }))
  }
  const onChange = (newlist) => {
    setState((prev) => ({
      ...prev,
      emailList: newlist,
    }))
  }
  const onSendClick = () => {
    sentInviteMutation(
      emailList.map((elem) => elem.value),
      {
        onSuccess: () => onInviteUserClick(),
      }
    )
  }
  const onToggleClick = (e, result) => {
    updateStateMutation(
      {
        isActive: e,
        id: result,
      },
      {
        onSuccess: () => {
          refetch()
        },
      }
    )
  }
  const onPaginationChange = (page, pageSize) => {
    setState((prev) => ({
      ...prev,
      userLIst: UserListdata?.result,
      pagination: { ...prev.pagination, page: page, ItemsPerPage: pageSize },
    }))
  }

  const onEditClick = (record) => {
    setState((prevState) => ({
      ...prevState,
      editRecord: prevState.isEditModal ? record : null,
      isEditModal: !prevState.isEditModal,
    }))
  }
  const onAssignEditClick = (record) => {
    setState((prevState) => ({
      ...prevState,
      editRecord: record,
      isAssignEditModal: !prevState.isAssignEditModal,
    }))
  }

  return [
    {
      refetch,
      t,
      userList: userLIst,
      isInviteModal,
      email,
      UserStateLoading,
      emailList,
      isEditModal,
      pagination,
      UserListLoading: UserSearchLoading || UserListLoading,
      editRecord,
      isAssignEditModal,
    },
    {
      onButtonClick,
      onSearch,
      onInviteUserClick,
      onInputChange,
      onKeyDown,
      onChange,
      onSendClick,
      onToggleClick,
      onPaginationChange,
      onEditClick,
      onAssignEditClick,
    },
  ]
}
export default useUserManagement
