import endpoints from '@/app/services/axios/endpoints'
import { useFetch } from '@/app/services/react-query/reactQuery'

export const getPermissionByIDs = (params, config) =>{
  return useFetch(endpoints.rolesPermission, params, config)
}
