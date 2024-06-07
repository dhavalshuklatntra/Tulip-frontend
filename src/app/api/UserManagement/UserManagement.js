import endpoints from '@/app/services/axios/endpoints'
import { useFetch, usePost } from '@/app/services/react-query/reactQuery'

export const GetUserList = (params, config) =>
  useFetch(endpoints.UserManagement.userList, params, config)

export const PostInviteUser = (config) =>
  usePost(endpoints.UserManagement.sentInvite, undefined, config)
export const PostUpdateStatus = (updater) =>
  usePost(endpoints.UserManagement.updateStatus, undefined, updater, undefined)
export const GetUserListSearch = (params, config) =>
  useFetch(endpoints.UserManagement.userListSearch, params, config)
export const GetUserRoles = (params, config) =>
  useFetch(endpoints.UserManagement.rolesList(params.id), undefined, config)
export const PostUpdateRole = () =>
  usePost(endpoints.UserManagement.updateRole, undefined, undefined, undefined)
export const GetCareerByUserId = (params, config) =>
  useFetch(endpoints.UserManagement.usercareer(params.ugid), undefined, config)

export const PostAssignCareer = () =>
  usePost(
    endpoints.UserManagement.updateCareer,
    undefined,
    undefined,
    undefined
  )
