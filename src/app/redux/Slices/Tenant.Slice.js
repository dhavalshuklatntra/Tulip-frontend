import { createSlice } from '@reduxjs/toolkit'
const TenantSlice = createSlice({
  name: 'Tenant',
  initialState: {
    tenantname: '',
  },
  reducers: {
    SET_DATA: (state, action) => {
      state.tenantid = action.payload.tenantid
      state.tenantname = action.payload.tenantname
    },
  },
})

export const { SET_DATA } = TenantSlice.actions
export default TenantSlice.reducer
