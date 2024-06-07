import { useEffect, useState } from 'react'

import { GetCareerByDeptId } from '@/app/api/DepartmentManagement/DepartmentManagement'
import { GetCareerByUserId } from '@/app/api/UserManagement/UserManagement'
import { PostAssignCareer } from '@/app/api/UserManagement/UserManagement'

const useAssignCareerPath = ({ editRecord, isAssignModal }) => {
  const [{ departmentValue, selectedRowKeys, jobtitleId }, setState] = useState(
    {
      departmentValue: null,
      selectedRowKeys: null,
      jobtitleId: null,
    }
  )
  const { data: CareerData } = GetCareerByUserId(
    { ugid: editRecord?.gurukulaId },
    { enabled: Boolean(editRecord?.gurukulaId) && isAssignModal }
  )

  const { data: CareerPathDataList, isLoading: CareerPathDataLoading } =
    GetCareerByDeptId(
      {
        deptId: CareerData?.result?.departmentId || departmentValue?.id,
      },
      {
        enabled:
          (Boolean(CareerData?.result?.departmentId) ||
            Boolean(departmentValue)) &&
          isAssignModal,
      }
    )
  const { mutate: AssignCareerMutation } = PostAssignCareer()

  useEffect(() => {
    if (!editRecord?.gurukulaID) {
      setState((prev) => ({
        ...prev,
        selectedRowKeys: null,
      }))
    }
    if (CareerPathDataList?.result.length)
      setState((prev) => ({
        ...prev,
        selectedRowKeys: [CareerData?.result?.careerPathId],
      }))
  }, [
    CareerData?.result?.careerPathId,
    CareerPathDataList?.result,
    editRecord?.gurukulaID,
  ])
  useEffect(() => {
    if (!isAssignModal) {
      setState((prev) => ({
        departmentValue: null,
        selectedRowKeys: null,
        jobtitleId: null,
      }))
    }
  }, [isAssignModal])

  const onDepartmentChange = (e, value) => {
    setState((prev) => ({
      ...prev,
      departmentValue: e,
    }))
  }
  const onRowSelectionChange = (newSelectedRowKeys) => {
    setState((prev) => ({
      ...prev,
      selectedRowKeys: newSelectedRowKeys,
    }))
  }
  const onJobTitleChange = (e, value) => {
    setState((prev) => ({
      ...prev,
      jobtitleId: e,
    }))
  }
  const onApplyClick = () => {
    const payload = {
      id: CareerData?.result?.departmentId || departmentValue.id,
      departmentId: CareerData?.result?.departmentId || departmentValue.id,
      gurukulaID: editRecord?.gurukulaId,
      careerPathId: selectedRowKeys[0],
      status: 0,
      jobTitleId: jobtitleId.id,
    }
    AssignCareerMutation(payload, {
      onSuccess: () => {
        onEditClick()
        setState({
          departmentValue: null,
          selectedRowKeys: null,
          jobtitleId: null,
        })
      },
    })
  }

  return [
    {
      departmentValue,
      jobtitleId,
      selectedRowKeys,
      CareerPathData: CareerPathDataList?.result,
      CareerPathDataLoading,
    },
    {
      onDepartmentChange,
      onRowSelectionChange,
      onJobTitleChange,
      onApplyClick,
    },
  ]
}
export default useAssignCareerPath
