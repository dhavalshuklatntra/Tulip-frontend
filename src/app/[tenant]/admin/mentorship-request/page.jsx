'use client'
import { Table, Typography } from 'antd'
import React from 'react'
import { IconCircleDashedCheck, IconCircleX } from '@tabler/icons-react'

import CustomSearch from '@/app/_component/Search/Search'
import useMentorShip from './hook/useMentorShip'
import CustomTable from '@/app/_component/Table/CustomTable'
import { MentorShipTableColumns } from './hook/mentorShipTableColumn'
import AddViewPermissionHOC from '../Hoc/AddViewPermissionHOC'
const MentorShipPage = () => {
  const [{ t, requestListLoading, requestList }, { onApproveRejectClick }] =
    useMentorShip()
  return (
    <div>
      <Typography.Title level={3}>{t('mentorship_request')} </Typography.Title>

      <CustomTable
        loading={requestListLoading}
        tableData={requestList}
        isPagination={false}
        translationNameSpace="mentorship"
        // TotalCount={pagination.TotalCount}
        // CurrentPage={pagination.CurrentPage}
        // ItemPerPage={pagination.ItemsPerPage}
        // onPaginationChange={onPaginationChange}
      >
        {MentorShipTableColumns.map((column) => (
          <Table.Column
            render={column.render}
            key={column.key}
            title={t(column.title)}
            dataIndex={column.dataIndex}
          />
        ))}
        <Table.Column
          responsive={['md']}
          title={t('action')}
          key="action"
          render={(text, record) => (
            <AddViewPermissionHOC
              parentComp="Mentorship Request"
              compType="add"
            >
              <IconCircleDashedCheck
                className="pointer"
                onClick={() => onApproveRejectClick(record, 'approve')}
              />
              <IconCircleX
                className="pointer"
                onClick={() => onApproveRejectClick(record, 'reject')}
              />
            </AddViewPermissionHOC>
          )}
        />
      </CustomTable>
    </div>
  )
}

export default MentorShipPage
