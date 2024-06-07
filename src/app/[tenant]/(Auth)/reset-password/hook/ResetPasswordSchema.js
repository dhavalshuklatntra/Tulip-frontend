import * as Yup from 'yup'

import { regex } from '@/app/utils/regex'

export const ResetPasswordSchema = () =>
  Yup.object().shape({
    password: Yup.string()
      .required('New password is required')
      .matches(
        regex.password,
        'min 8 characters, 1 uppercase, 1 lowercase, 1 special character'
      ),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Password must match'),
  })
