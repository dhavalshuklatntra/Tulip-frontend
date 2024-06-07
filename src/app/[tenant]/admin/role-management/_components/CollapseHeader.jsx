import React from 'react'
import { Space, Switch } from 'antd'

const CollapseHeader = ({
  platform,
  isAllRead,
  isAllWrite,
  onReadWriteChange,
  isDisabled,
}) => {
  return (
    <>
      {platform}
      <Space direction="vertical">
        Read
        {!isDisabled && (
          <Switch
            checked={isAllRead[platform]}
            onChange={(e, record) =>
              onReadWriteChange(e, 'isAllRead', platform)
            }
          />
        )}
      </Space>
      <Space direction="vertical">
        Write
        {!isDisabled && (
          <Switch
            disabled={isDisabled}
            checked={isAllWrite[platform]}
            onChange={(e) => onReadWriteChange(e, 'isAllWrite', platform)}
          />
        )}
      </Space>
    </>
  )
}

export default CollapseHeader
