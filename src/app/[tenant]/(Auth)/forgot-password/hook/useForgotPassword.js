import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'

import { ForgotPasswordSchema } from './ForgotPasswordSchema'
import { useTranslation } from '@/app/i18n/server'
import { postForgotPassword } from '@/app/api/Auth/Auth'

const useForgotPassword = () => {
  const [t] = useTranslation('forgotPassword')
  const dispatch = useDispatch()
  const router = useRouter()
  const tenantname = useSelector((state) => state.tenant.tenantname)
  const formik = useFormik({
    validateOnMount: false,
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values) => {
      handelFormSubmit(values)
    },
  })
  const { mutate: ForgotPasswordMutation } = postForgotPassword()
  const handelFormSubmit = (values) => {
    const isEmail = values.email?.split('')?.includes('@')
    const key = isEmail ? 'email' : 'gurukulaId'
    ForgotPasswordMutation(
      { [key]: values.email },
      {
        onSuccess: () => {
          router.replace(`/${tenantname}/`)
        },
      }
    )
  }
  return [{ t, tenantname, formik }, {}]
}
export default useForgotPassword
