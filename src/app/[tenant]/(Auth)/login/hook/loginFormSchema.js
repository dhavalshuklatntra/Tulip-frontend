import * as Yup from 'yup'

import { regex } from '@/app/utils/regex'

// const { t } = useTranslation();
export const LoginSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .required('error.login.email')
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
    password: Yup.string().required('error.login.password'),
  })
