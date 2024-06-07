import CustomTags from '@/app/_component/Tags/CustomTags'

export const RoleManagementTableColumns = [
  {
    title: 'role_name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <span>{text}</span>,
    responsive: ['md'],
  },
  {
    title: 'status',
    dataIndex: 'isActive',
    render: (status) => (
      <>
        {console.log(status, 'status')}
        <CustomTags
          color={status ? 'success' : 'warning'}
          text={status ? 'Active' : 'Inactive'}
        />
      </>
    ),
    responsive: ['md'],
  },
]
