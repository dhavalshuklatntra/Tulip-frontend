import endpoints from '@/app/services/axios/endpoints'
import {
  useFetch,
  usePost,
  usePut,
} from '@/app/services/react-query/reactQuery'

export const GetRoleList = (params, config) =>
  useFetch(endpoints.RoleManagement.roleList, params, config)

export const PostUpdateStatus = (updater) =>
  usePost(endpoints.RoleManagement.updateStatus, undefined, updater, undefined)
export const GetPermissionById = (params, config) =>
  useFetch(
    endpoints.RoleManagement.permissionById(params.id),
    undefined,
    config
  )
export const PutUpdatePermission = () =>
  usePut(endpoints.RoleManagement.permission, undefined, undefined, undefined)
export const PostNewRole = () =>
  usePost(endpoints.RoleManagement.permission, undefined, undefined, undefined)
export const GetAllModules = (config) =>
  useFetch(endpoints.RoleManagement.modules, undefined, config)
