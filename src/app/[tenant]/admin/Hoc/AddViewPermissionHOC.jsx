import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const AddViewPermissionHOC = ({ parentComp, compType, children }) => {
  const [compStatus, setState] = useState(false)

  const peromssionMatix =
    useSelector((state) => state.adminNavList.navList) ?? []

  const compPermission = peromssionMatix?.find(
    (elem) => elem.title === parentComp
  )
  useEffect(() => {
    setState(compType === 'view' ? compPermission.read : compPermission?.write)
  }, [compPermission?.read, compPermission?.write, compType])
  return <>{compStatus ? children : null}</>
}

export default AddViewPermissionHOC
