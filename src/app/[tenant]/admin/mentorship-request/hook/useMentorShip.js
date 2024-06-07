import { debounce } from 'lodash'
import { useState } from 'react'

import { useTranslation } from '@/app/i18n/server'
import {
  GetMentorRequest,
  PostMentorRequest,
} from '@/app/api/MentorShipRequest/MentorShipRequest'

const useMentorShip = () => {
  const { t } = useTranslation('mentorship')
  const [{ searchValue }, setState] = useState({
    searchValue: '',
  })
  const {
    data: requestListData,
    isLoading: requestListLoading,
    refetch,
  } = GetMentorRequest()
  const { mutate: UpdateMentorMutation } = PostMentorRequest()

  const onApproveRejectClick = (record, type) => {
    UpdateMentorMutation(
      {
        ...record,
        isApproved: type == 'reject' ? false : true,
      },
      {
        onSuccess: () => {
          refetch()
        },
      }
    )
  }
  return [
    { t, requestListLoading, requestList: requestListData?.result },
    { onApproveRejectClick },
  ]
}
export default useMentorShip
