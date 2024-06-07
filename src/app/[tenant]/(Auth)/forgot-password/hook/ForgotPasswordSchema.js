import * as Yup from 'yup'

import { regex } from '@/app/utils/regex'

export const ForgotPasswordSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .required('Email or GurukulaID is required')
      .test('check-validation', (value, { createError, path }) => {
        if (value.includes('@')) {
          const isEmailValid = regex.email.test(value)
          return (
            isEmailValid ||
            createError({ path, message: 'Invalid email format' })
          )
        } else {
          const isGurukulaIdValid = regex.gurukulaId.test(value)
          return (
            isGurukulaIdValid ||
            createError({ path, message: 'Invalid GurukulaID format' })
          )
        }
      }),
  })
