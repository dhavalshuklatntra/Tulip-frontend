import React, { useEffect } from 'react'
import { Col, Descriptions, Row } from 'antd'

import CustomModal from '@/app/_component/Modal/Modal'
import PaginateDropdown from '@/app/_component/PaginatedDropdown/PaginateDropdown'
import { dropdownValueFormatter, overRideData } from '@/app/utils/common'
import endpoints from '@/app/services/axios/endpoints'
import SimpleSelect from '@/app/_component/Select/Select'
import useEditUser from '../hook/useEditUser'

const EditUserModel = ({
  refetchList,
  isEditModal,
  onEditClick,
  t,
  editRecord,
}) => {
  const [
    { rolesList, currentUserRoles },
    { onChange, onUpdateClick, onSelectDeselect },
  ] = useEditUser({
    currentId: editRecord?.id,
    currentRoles: editRecord?.roles,
    onEditClick,
    refetchList,
    isEditModal,
  })

  const fullName = `${editRecord?.firstname ?? ''} ${editRecord?.lastname ?? ''}`
  return (
    <>
      <CustomModal
        isFooter={true}
        openModal={isEditModal}
        handleClick={onUpdateClick}
        title={t('edit_user')}
        handleCancel={onEditClick}
        submitButtonText={t('update')}
      >
        {rolesList && (
          <>
            <Row>
              <strong>{t('name')}:</strong>
              {fullName}
            </Row>
            <Row style={{ width: 500 }}>
              <SimpleSelect
                onSelect={(e, option) => {
                  onSelectDeselect(e, option, 'select')
                }}
                onDeselect={(e, option) => {
                  onSelectDeselect(e, option, 'deselect')
                }}
                style={{ width: 400 }}
                onChange={onChange}
                options={rolesList}
                value={dropdownValueFormatter(
                  currentUserRoles,
                  'rolename',
                  'roleId'
                )}
                mode="multiple"
                fieldNames={{ label: 'rolename', value: 'roleId' }}
                optionRender={(option) => <span>{option.data.rolename}</span>}
              />
            </Row>
          </>
        )}
      </CustomModal>
    </>
  )
}

export default EditUserModel
