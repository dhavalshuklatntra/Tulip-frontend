import { Input } from 'antd'
import React from 'react'

import { useTranslation } from '@/app/i18n/server'

const CustomSearch = ({ onSearch, allowClear }) => {
  const { t } = useTranslation()
  return (
    <Input.Search
      placeholder={t('search')}
      onChange={onSearch}
      allowClear={allowClear}
      style={{
        width: 200,
      }}
    />
  )
}

export default CustomSearch
