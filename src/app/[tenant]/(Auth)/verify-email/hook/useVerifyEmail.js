import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'

import { useTranslation } from '@/app/i18n/server'
import { postResendEmail } from '@/app/api/Auth/Auth'

const useVerifyEmail = () => {
  const { t } = useTranslation('verifyEmail')
  const tenantname = useSelector((state) => state.tenant.tenantname)
  const user = useSelector((state) => state.verifyEmail?.info)

  const { mutate: resendEmailMutation, isPending: resentEmailLoading } =
    postResendEmail({ guid: user?.gurukulaId ?? '' })

  const handleSendVerificationEmail = () => {
    resendEmailMutation()
  }
  return [
    { t, tenantname, user, resentEmailLoading },
    { handleSendVerificationEmail },
  ]
}
export default useVerifyEmail
