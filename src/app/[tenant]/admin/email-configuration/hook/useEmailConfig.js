import { useFormik } from 'formik'
import { useEffect, useState } from 'react'

import { useTranslation } from '@/app/i18n/server'
import { EmailConfigSchema } from './EmailConfigScema'
import {
  GetEmailConfig,
  PostEmailConfig,
} from '@/app/api/EmailConfiguration/EmailConfig'

const useEmailConfig = () => {
  const { t } = useTranslation('emailconfig')
  const [{ initialValues }, setState] = useState({
    initialValues: {
      fromEmail: '',
      smtpHost: '',
      poP3Host: '',
      smtPort: '',
      poP3Port: '',
      username: '',
      password: '',
      smtpAuthentication: '',
    },
  })
  const { mutate: EmailConfigMutation } = PostEmailConfig()
  const { data: emailConfig, isLoading: EmailConfigLoading } = GetEmailConfig()
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: EmailConfigSchema,
    onSubmit: (values) => {
      onFormSubmit(values)
    },
  })

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      initialValues: emailConfig?.result,
    }))
  }, [emailConfig?.result])
  const { setFieldValue } = formik

  const onFieldChange = (field, value) => {
    setFieldValue(field, value)
  }

  const onFormSubmit = (values) => {
    EmailConfigMutation(values, {
      onSuccess: () => {},
    })
  }
  return [{ t, formik, EmailConfigLoading }, { onFieldChange }]
}
export default useEmailConfig
