import endpoints from '@/app/services/axios/endpoints'
import { useFetch } from '@/app/services/react-query/reactQuery'

export const GetCareerByDeptId = (params, config) =>
  useFetch(
    endpoints.DepartmentManagement.careerPathByDepartment(params.deptId),
    undefined,
    config
  )
