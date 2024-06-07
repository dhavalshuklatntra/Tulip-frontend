import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { postConfirmEmail } from '@/app/api/Auth/Auth'

const useConfirmEmail = () => {
  const router = useRouter()
  const tenantname = useSelector((state) => state.tenant.tenantname)

  const params = useSearchParams()
  const uid = params.get('uid') ?? ''
  const token = params.get('token') ?? ''

  const { mutate: ConfirmEmailMutation } = postConfirmEmail(
    {
      uid,
    },
    {
      'access-token': token,
    }
  )

  useEffect(() => {
    if (uid && token) {
      ConfirmEmailMutation(undefined, {
        onSuccess: () => {
          router.push(`/${tenantname}/login`)
        },
      })
    }
  }, [uid])
}

export default useConfirmEmail
