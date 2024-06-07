import React from 'react'
import { Collapse, Space, Table } from 'antd'

import CustomModal from '@/app/_component/Modal/Modal'
import useEditViewRole from '../hook/useEditViewRole'
import CustomTable from '@/app/_component/Table/CustomTable'
import { PermissionTableColumns } from '../hook/PermissionTableColumns'
import CollapseHeader from './CollapseHeader'
import TextField from '@/app/_component/TextField/TextField'

const ViewEditModel = ({
  isViewEdit,
  t,
  modalStatus,
  onEditClick,
  editRecord,
  refetchList,
}) => {
  const [
    { modules, permissionDataLoading, isAllRead, isAllWrite, newRoleName },
    { updatePermission, onReadWriteChange, onApplyClick, onTextChange },
  ] = useEditViewRole({
    refetchList,
    editRecord,
    onEditClick,
    modalStatus,
  })

  const platforms = [...new Set(modules?.map((module) => module.platform))]
  return (
    <CustomModal
      isFooter={true}
      disabled={modalStatus == 'view' ? true : newRoleName == '' ? true : false}
      openModal={isViewEdit}
      handleClick={() => onApplyClick(modalStatus)}
      title={
        modalStatus == 'edit'
          ? t('edit_role')
          : modalStatus == 'add'
            ? t('add_role')
            : t('view_role')
      }
      handleCancel={onEditClick}
      submitButtonText={modalStatus == 'add' ? t('add') : t('apply')}
      isReset={false}
    >
      <Space direction="vertical">
        {modalStatus == 'add' && (
          <TextField
            type="text"
            onChange={onTextChange}
            value={newRoleName}
            label={t('role_name')}
          />
        )}
        <Collapse defaultActiveKey={platforms} collapsible="icon">
          {platforms.map((platform, index) => (
            <Collapse.Panel
              header={
                <CollapseHeader
                  isDisabled={modalStatus == 'view' ? true : false}
                  platform={platform}
                  isAllRead={isAllRead}
                  isAllWrite={isAllWrite}
                  onReadWriteChange={onReadWriteChange}
                />
              }
              key={index}
            >
              <CustomTable
                showHeader={false}
                loading={permissionDataLoading}
                tableData={modules
                  .filter((module) => module.platform === platform)
                  .map((module) => module)}
                isPagination={false}
              >
                {PermissionTableColumns.map((column) => (
                  <Table.Column
                    render={(text, record, index) =>
                      column.render(
                        text,
                        record,
                        index,
                        updatePermission,
                        modalStatus == 'view' ? true : false
                      )
                    }
                    key={column.key}
                    dataIndex={column.dataIndex}
                  />
                ))}
              </CustomTable>
            </Collapse.Panel>
          ))}
        </Collapse>
      </Space>
    </CustomModal>
  )
}

export default ViewEditModel
