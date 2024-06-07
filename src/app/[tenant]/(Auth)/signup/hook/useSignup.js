import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useFormik } from 'formik'

import { useTranslation } from '@/app/i18n/server'
import { SignUpFormSchema } from './SignUpFormSchema'
import { forMateSignUpPayload } from '@/app/utils/common'
import { postSignup } from '@/app/api/Auth/Auth'
import { SET_EMAIL_INFO } from '@/app/redux/Slices/VerifyEmail.Slice'

const useSignUp = () => {
  const { t } = useTranslation('signup')
  const dispatch = useDispatch()
  const router = useRouter()
  const tenantname = useSelector((state) => state.tenant.tenantname)

  const { mutate: signUpMutation, isPending: signupLoading } = postSignup()

  const formik = useFormik({
    initialValues: {},
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: SignUpFormSchema,
    onSubmit: (value) => {
      try {
        handleOnSubmitForm(value)
      } catch (e) {
        console.log(e.message, 'error')
      }
    },
  })

  const handleOnSubmitForm = (values) => {
    signUpMutation(forMateSignUpPayload(values), {
      onSuccess: (data) => {
        const saveData = {
          personalEmail: data?.data.result?.personalEmail,
          gurukulaId: data?.data.result?.gurukulaId,
        }
        dispatch(SET_EMAIL_INFO(saveData))
        router.replace(`/${tenantname}/verify-email`)
      },
    })
  }

  return [{ t, tenantname, formik, signupLoading }, {}]
}

export default useSignUp
