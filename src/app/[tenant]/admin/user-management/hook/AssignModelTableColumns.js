export const AssignModelTableColumns = [
  {
    title: 'assignTable.title',
    dataIndex: 'title',
    key: 'id',
    render: (text) => <span>{text}</span>,
    responsive: ['md'],
  },
  {
    title: 'assignTable.level_count',
    dataIndex: 'levelCount',
    key: 'levelCount',
    render: (text) => <span>{text}</span>,
    responsive: ['md'],
  },
  {
    title: 'assignTable.career_type',
    dataIndex: 'careerType',
    key: 'careerType',
    render: (text) => <span>{text}</span>,
    responsive: ['md'],
  },
]
