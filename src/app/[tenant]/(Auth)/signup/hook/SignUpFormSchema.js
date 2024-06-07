import * as Yup from 'yup'

import { regex } from '@/app/utils/regex'

export const SignUpFormSchema = () =>
  Yup.object().shape({
    firstName: Yup.string()
      .required('error.sigunup.first_name')
      .max(50, 'Too Long!')
      .matches(regex.name, 'Min 3 charcter and only alphabets are allowed'),
    lastName: Yup.string()
      .required('error.sigunup.last_name')
      .max(50, 'Too Long!')
      .matches(regex.name, 'Min 3 charcter and only alphabets are allowed'),
    email: Yup.string()
      .matches(regex.email, 'Enter valid email')
      .required('error.sigunup.email'),
    password: Yup.string()
      .required('error.sigunup.password')
      .matches(
        regex.password,
        'min 8 characters, 1 uppercase, 1 lowercase, 1 special character'
      ),
    confirmPassword: Yup.string()
      .required('error.sigunup.confirm_password')
      .oneOf([Yup.ref('password'), null], 'Password must match'),
    dob: Yup.date()
      .required('error.sigunup.dob')
      .test(
        'dob',
        'Age should be within a reasonable range (e.g., 18-80 years)',
        (value, ctx) => {
          const dob = new Date(value)
          const validDate = new Date()
          const valid =
            validDate.getFullYear() - dob.getFullYear() >= 18 &&
            validDate.getFullYear() - dob.getFullYear() <= 80
          return !valid ? ctx.createError() : valid
        }
      ),
    countryname: Yup.object().required('error.sigunup.country'),
  })
