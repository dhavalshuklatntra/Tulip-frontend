'use client'
import { Space, Table, Typography } from 'antd'
import React, { Suspense } from 'react'
import { IconEye } from '@tabler/icons-react'

import useRoleManagement from './hook/useRoleManagement'
import CustomSearch from '@/app/_component/Search/Search'
import Button from '@/app/_component/Button/Button'
import CustomTable from '@/app/_component/Table/CustomTable'
import { RoleManagementTableColumns } from './hook/RoleManagementTableColumns'
import AddViewPermissionHOC from '../Hoc/AddViewPermissionHOC'
import { EditAction, SwitchAction } from '@/app/_component/Table/Actions'
import ViewEditModel from './_components/ViewEditModel'
import Loader from '@/app/_component/Loader/Loader'

const RolePage = () => {
  const [
    {
      t,
      roleList,
      roleListLoading,
      pagination,
      isViewEdit,
      modalStatus,
      editRecord,
      roleStatusLoading,
    },
    {
      onAddClick,
      onSearch,
      onPaginationChange,
      onEditClick,
      onToggleClick,
      onApplyClick,
      refetchList,
    },
  ] = useRoleManagement()
  return (
    <div>
      <Typography.Title level={3}>{t('role_management')} </Typography.Title>

      <Button onClick={onAddClick} label={t('add')} type="primary" />

      <div>
        <CustomTable
          loading={roleListLoading}
          tableData={roleList}
          translationNameSpace="rolemanagement"
          TotalCount={pagination.TotalCount}
          CurrentPage={pagination.CurrentPage}
          ItemPerPage={pagination.ItemsPerPage}
          onPaginationChange={onPaginationChange}
        >
          {RoleManagementTableColumns.map((column) => (
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
              <AddViewPermissionHOC parentComp="Role Management" compType="add">
                <Space>
                  <EditAction onEditClick={() => onEditClick(record, 'edit')} />
                  <IconEye onClick={() => onEditClick(record, 'view')} />
                  <SwitchAction
                    loading={roleStatusLoading}
                    onToggle={(e) => onToggleClick(e, record)}
                    checked={record.isActive}
                  />
                </Space>
              </AddViewPermissionHOC>
            )}
          />
        </CustomTable>
        <ViewEditModel
          t={t}
          refetchList={refetchList}
          isViewEdit={isViewEdit}
          editRecord={editRecord}
          onApplyClick={onApplyClick}
          modalStatus={modalStatus}
          onEditClick={onEditClick}
        />
      </div>
    </div>
  )
}

export default RolePage
