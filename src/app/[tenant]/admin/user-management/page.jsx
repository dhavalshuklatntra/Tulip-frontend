'use client'
import { Space, Table, Typography } from 'antd'
import React from 'react'
import { IconSchool } from '@tabler/icons-react'

import useUserManagement from './hook/useUserManagement'
import CustomSearch from '@/app/_component/Search/Search'
import Button from '@/app/_component/Button/Button'
import CustomTable from '@/app/_component/Table/CustomTable'
import { UserColumns } from './hook/UserTableColumns'
import { EditAction, SwitchAction } from '@/app/_component/Table/Actions'
import AddViewPermissionHOC from '../Hoc/AddViewPermissionHOC'
import InviteUserModel from './_components/InviteUserModel'
import EditUserModel from './_components/EditUserModel'
import AssignCareerPathModel from './_components/AssignCareerPathModel'

const UserPage = () => {
  const [
    {
      refetch,
      t,
      userList,
      isInviteModal,
      isEditModal,
      email,
      emailList,
      UserStateLoading,
      pagination,
      UserListLoading,
      editRecord,
      isAssignEditModal,
    },
    {
      onSearch,
      onInviteUserClick,
      onInputChange,
      onKeyDown,
      onChange,
      onSendClick,
      onToggleClick,
      onPaginationChange,
      onEditClick,
      onAssignEditClick,
    },
  ] = useUserManagement()
  return (
    <div>
      <Typography.Title level={3}>{t('user_management')} </Typography.Title>
      <div>
        <CustomSearch onSearch={onSearch} allowClear={true} />
        <Button
          onClick={onInviteUserClick}
          label={t('invite_user')}
          type="primary"
        />
      </div>
      <div>
        <CustomTable
          loading={UserListLoading}
          tableData={userList}
          translationNameSpace="usermanagement"
          TotalCount={pagination.TotalCount}
          CurrentPage={pagination.CurrentPage}
          ItemPerPage={pagination.ItemsPerPage}
          onPaginationChange={onPaginationChange}
        >
          {UserColumns.map((column) => (
            <Table.Column
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
              <AddViewPermissionHOC parentComp="User Management" compType="add">
                <Space>
                  <EditAction onEditClick={() => onEditClick(record)} />
                  <IconSchool onClick={() => onAssignEditClick(record)} />
                  <SwitchAction
                    loading={UserStateLoading}
                    onToggle={(e) => onToggleClick(e, record.id)}
                    checked={record.isActive}
                  />
                </Space>
              </AddViewPermissionHOC>
            )}
          />
        </CustomTable>
      </div>
      <InviteUserModel
        isInviteModal={isInviteModal}
        onSendClick={onSendClick}
        onInviteUserClick={onInviteUserClick}
        emailList={emailList}
        onChange={onChange}
        onInputChange={onInputChange}
        email={email}
        onKeyDown={onKeyDown}
        t={t}
      />
      <EditUserModel
        refetchList={refetch}
        isEditModal={isEditModal}
        onEditClick={onEditClick}
        editRecord={editRecord}
        t={t}
      />
      <AssignCareerPathModel
        refetchList={refetch}
        isAssignModal={isAssignEditModal}
        onEditClick={onAssignEditClick}
        editRecord={editRecord}
        t={t}
      />
    </div>
  )
}

export default UserPage
