import { Checkbox } from 'antd'

export const PermissionTableColumns = [
  {
    title: 'Module Name',
    dataIndex: 'modulename',
    render: (text) => <span>{text}</span>,
    responsive: ['md'],
  },
  {
    title: 'Read',
    dataIndex: 'read',
    render: (text, record, index, onchange, isDisabled) => (
      <Checkbox
        disabled={isDisabled}
        checked={record.read}
        onChange={(e) => onchange(record.moduleId, 'read', e.target.checked)}
      />
    ),
    responsive: ['md'],
  },
  {
    title: 'Write',
    dataIndex: 'write',
    render: (text, record, index, onchange, isDisabled) => (
      <Checkbox
        disabled={isDisabled}
        checked={record.write}
        onChange={(e) => onchange(record.moduleId, 'write', e.target.checked)}
      />
    ),
    responsive: ['md'],
  },
]
