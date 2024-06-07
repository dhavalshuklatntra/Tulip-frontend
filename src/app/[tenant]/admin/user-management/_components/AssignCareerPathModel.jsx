import React from 'react'
import { Table } from 'antd'

import CustomModal from '@/app/_component/Modal/Modal'
import PaginateDropdown from '@/app/_component/PaginatedDropdown/PaginateDropdown'
import useAssignCareerPath from '../hook/useAssignCareerPath'
import { getBaseURL } from '@/app/utils/common'
import endpoints from '@/app/services/axios/endpoints'
import CustomTable from '@/app/_component/Table/CustomTable'
import { AssignModelTableColumns } from '../hook/AssignModelTableColumns'

const AssignCareerPathModel = ({
  isAssignModal,
  onEditClick,
  t,
  editRecord,
}) => {
  const [
    {
      CareerPathData,
      CareerPathDataLoading,
      selectedRowKeys,
      jobtitleId,
      departmentValue,
    },
    {
      onDepartmentChange,
      onRowSelectionChange,
      onJobTitleChange,
      onApplyClick,
    },
  ] = useAssignCareerPath({
    editRecord,
    isAssignModal,
    onEditClick,
  })
  return (
    <CustomModal
      isFooter={true}
      openModal={isAssignModal}
      handleClick={onApplyClick}
      title={t('careerAssignTitle')}
      handleCancel={onEditClick}
      submitButtonText={t('apply')}
      isReset={true}
      handelReset={() => {}}
    >
      <PaginateDropdown
        isMulti={false}
        endpoint={getBaseURL() + endpoints.DepartmentManagement.departmentList}
        value={departmentValue}
        accessLabelKey="name"
        accessValueKey="id"
        label={t('department')}
        closeMenuOnSelect={true}
        onChange={onDepartmentChange}
        className="w-100"
        error={false}
      />
      <CustomTable
        isPagination={false}
        rowKey="id"
        tableData={CareerPathData}
        loading={CareerPathDataLoading}
        rowSelection={{
          type: 'radio',
          selectedRowKeys,
          onChange: onRowSelectionChange,
        }}
      >
        {AssignModelTableColumns.map((column) => (
          <Table.Column
            key={column.key}
            title={t(column.title)}
            dataIndex={column.dataIndex}
          />
        ))}
      </CustomTable>
      <PaginateDropdown
        isMulti={false}
        endpoint={
          getBaseURL() +
          endpoints.DepartmentManagement.jobtitleByCareer(selectedRowKeys)
        }
        value={jobtitleId}
        accessLabelKey="name"
        accessValueKey="id"
        label={t('jobTitle')}
        closeMenuOnSelect={true}
        onChange={onJobTitleChange}
        className="w-100"
        error={false}
        isDisabled={!selectedRowKeys}
      />
    </CustomModal>
  )
}

export default AssignCareerPathModel
