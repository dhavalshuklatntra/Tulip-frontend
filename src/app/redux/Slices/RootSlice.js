import { combineReducers } from 'redux'

import loginSlice from './login.Slice'
import TenantSlice from './Tenant.Slice'
import adminNavigationSlice from './adminNavigation.Slice'

const rootReducer = combineReducers({
  login: loginSlice,
  tenant: TenantSlice,
  adminNavList: adminNavigationSlice,
})

const RootSlice = (state, action) => {
  if (action.type === 'LOGOUT') {
    return rootReducer(undefined, action)
  }

  return rootReducer(state, action)
}

export default RootSlice
