'use client'

import { Collapse } from 'antd'
import React from 'react'

const Filter = ({ renderItems }) => {
  return (
    <>
      <Collapse items={renderItems}></Collapse>
    </>
  )
}

export default Filter
