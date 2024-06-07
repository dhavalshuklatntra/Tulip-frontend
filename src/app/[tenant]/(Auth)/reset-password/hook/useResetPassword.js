'use Client'
import { useFormik } from 'formik'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'

import { useTranslation } from '@/app/i18n/server'
import { ResetPasswordSchema } from './ResetPasswordSchema'
import { postResetPassword } from '@/app/api/Auth/Auth'
import { Encryptpassword } from '@/app/utils/common'

const useResetPassword = () => {
  const [t] = useTranslation('forgotPassword')
  const dispatch = useDispatch()
  const router = useRouter()
  const tenantname = useSelector((state) => state.tenant.tenantname)

  const params = useSearchParams()
  const uid = params.get('uid') ?? ''
  const token = params.get('token') ?? ''
  const { mutate: resetPasswordMutation, isPending: ResetPasswordLoading } =
    postResetPassword({
      'access-token': token,
    })
  const formik = useFormik({
    validateOnMount: false,
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: (values) => {
      handelFormSubmit(values)
    },
  })
  const handelFormSubmit = (values) => {
    resetPasswordMutation(
      {
        gurukulaId: uid,
        password: Encryptpassword(values.password),
      },
      {
        onSuccess: () => {
          router.replace(`/${tenantname}`)
        },
      }
    )
  }

  return [{ t, tenantname, formik, ResetPasswordLoading }]
}
export default useResetPassword
