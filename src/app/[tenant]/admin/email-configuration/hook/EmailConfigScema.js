import * as Yup from 'yup'

import { regex } from '@/app/utils/regex'

export const EmailConfigSchema = () =>
  Yup.object().shape({
    fromEmail: Yup.string()
      .required('validations.email_req')
      .email('validations.valid_email'),
    smtpHost: Yup.string()
      .required('validations.smtp_host_req')
      .matches(regex.host, 'validations.valid_smtp_host'),
    poP3Host: Yup.string()
      .required('validations.pop3host_req')
      .matches(regex.host, 'validations.valid_pop3host'),
    smtPort: Yup.string()
      .required('validations.smtp_port_req')
      .matches(regex.port, 'validations.valid_smtp_port'),
    poP3Port: Yup.string()
      .required('validations.pop3port_req')
      .matches(regex.port, 'validations.valid_pop3port'),
    username: Yup.string()
      .required('validations.user_name_req')
      .min(1, 'validations.user_name_minmax')
      .max(15, 'validations.user_name_minmax'),
    password: Yup.string()
      .required('validations.password_req')
      .matches(regex.password, 'validations.valid_password'),
  })
