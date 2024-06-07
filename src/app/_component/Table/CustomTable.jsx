import { Table } from 'antd'
import React from 'react'

import { useTranslation } from '@/app/i18n/server'

const CustomTable = ({
  children,
  tableData,
  translationNameSpace,
  TotalCount,
  loading,
  CurrentPage,
  ItemPerPage,
  isPagination = true,
  onPaginationChange,
  ...props
}) => {
  const { t } = useTranslation(translationNameSpace)
  return (
    <Table
      loading={loading}
      dataSource={tableData}
      pagination={
        isPagination && {
          onShowSizeChange: onPaginationChange,
          onChange: onPaginationChange,
          total: TotalCount,
          current: CurrentPage,
          pageSize: ItemPerPage,
          position: ['bottomCenter'],
        }
      }
      {...props}
    >
      {children}
    </Table>
  )
}

export default CustomTable
