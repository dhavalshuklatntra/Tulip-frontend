import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

import { createTranslation, useTranslation } from '@/app/i18n/server'
import { constants } from '@/app/utils/Constants'
import { LoginSchema } from './loginFormSchema'
import { postLogin } from '@/app/api/Auth/Auth'
import { Encryptpassword } from '@/app/utils/common'
import { SET_USER_DATA } from '@/app/redux/Slices/login.Slice'

const useLogin = () => {
  const { t } = useTranslation('login')
  const dispatch = useDispatch()
  const router = useRouter()
  const tenantname = useSelector((state) => state.tenant.tenantname)
  // const { data: emailConfigData, isPending, isSuccess } = GetEmailConfiguration();
  const [{ showPassword, loginPayload, rememberMe, initialValues }, setState] =
    useState({
      showPassword: false,
      rememberMe: false,
      loginPayload: {},
      initialValues: {
        email: '',
        password: '',
        rememberMe: false,
      },
    })
  const { mutate: loginMutation, isPending: loginLoading } = postLogin()

  useEffect(() => {
    const savedEmail = localStorage.getItem(constants.KeyForEmailOrGurukulaId)
    if (Boolean(savedEmail)) {
      formik.setFieldValue('email', savedEmail)
      formik.setFieldValue('rememberMe', true)
    }
  }, [])

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    validateOnChange: true,
    validateOnBlur: true,
    enableReinitialize: true,
    onSubmit: (value) => {
      try {
        const isEmail = value.email?.split('')?.includes('@')
        const key = isEmail ? 'email' : 'gurukulaId'
        handleOnSubmitForm({
          [key]: value.email,
          password: Encryptpassword(value.password),
          rememberMe: value.rememberMe,
        })
      } catch (e) {
        console.log(e, 'error')
      }
    },
  })

  const handleOnSubmitForm = (values) => {
    const payload = { ...values }
    loginMutation(payload, {
      onSuccess: (data) => {
        dispatch(SET_USER_DATA(data.data.result))
        Cookies.set('user', data.data.result.token)
        Cookies.set('UgId', data.data.result.gurukulaId)
        router.replace(`/${tenantname}/platform-selection`)
      },
    })
  }

  return [{ t, showPassword, rememberMe, formik, loginLoading, tenantname }, {}]
}

export default useLogin
