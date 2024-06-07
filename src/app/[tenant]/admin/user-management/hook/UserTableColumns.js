import Link from 'next/link'

export const UserColumns = [
  {
    title: 'Gurukula ID',
    dataIndex: 'gurukulaId',
    key: 'gurukulaId',
    render: (text) => <Link>{text}</Link>,
    responsive: ['md'],
  },
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <span>{text}</span>,
    responsive: ['md'],
  },
  {
    title: 'email',
    dataIndex: 'email',
    key: 'email',
    render: (text) => <span>{text}</span>,
    responsive: ['md'],
  },
  {
    title: 'contact_no',
    dataIndex: 'mobile',
    key: 'mobile',
    render: (text) => <span>{text}</span>,
    responsive: ['md'],
  },
  {
    title: 'user_platform',
    dataIndex: 'platform',
    key: 'platform',
    render: (text) => <span>{text}</span>,
    responsive: ['md'],
  },
  {
    title: 'role',
    dataIndex: 'roles',
    key: 'roles',
    render: (text) =>
      text.map((elem, indx) => (
        <span key={indx}>
          {elem}
          {','}
        </span>
      )),
    responsive: ['md'],
  },
  {
    title: 'career',
    dataIndex: 'careerPathTitle',
    key: 'careerPathTitle',
    render: (text) => <span>{text}</span>,
    responsive: ['md'],
  },
  {
    title: 'status',
    dataIndex: 'status',
    key: 'status',
    render: (text) => <span>{text}</span>,
    responsive: ['md'],
  },
]
