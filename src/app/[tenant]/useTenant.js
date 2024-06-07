import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'

import { SET_USER_DATA } from '../redux/Slices/login.Slice'
import { getTenant, useUserData } from '../api/Auth/Auth'
import { SET_DATA } from '../redux/Slices/Tenant.Slice'

const useTenant = () => {
  const pathname = usePathname()
  const router = useRouter()
  const tenantname = pathname.split('/')[1]
  const userdata = useSelector((state) => state?.login?.userDetails?.roles)
  const dispatch = useDispatch()
  const token = Cookies.get('user')
  const { data: tenantData, isLoading: tenantDataLoading } = getTenant(
    {
      tenantname,
    },
    { enabled: !!tenantname }
  )
  const { data: userData } = useUserData({
    enabled: !userdata && Boolean(token),
  })
  useEffect(() => {
    if (tenantData) {
      Cookies.set('Tenant', tenantData.result)
      Cookies.set('tenantname', tenantname)
      dispatch(SET_DATA({ tenantid: tenantData, tenantname: tenantname }))
    }

    if (tenantData == '') {
      router.replace(`/${tenantname}/not-found`)
    }
  }, [tenantData])

  useEffect(() => {
    if (userData) {
      dispatch(SET_USER_DATA(userData))
    }
  }, [userData])

  return [{ tenantData, tenantDataLoading }, {}]
}
export default useTenant
