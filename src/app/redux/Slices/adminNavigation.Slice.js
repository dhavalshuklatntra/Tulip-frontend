import { createSlice } from '@reduxjs/toolkit'
const AdminNavigationSlice = createSlice({
  name: 'AdminNavigationSlice',
  initialState: {},
  reducers: {
    SET_NAV_LIST: (state, action) => {
      state.navList = action.payload
    },
  },
})

export const { SET_NAV_LIST } = AdminNavigationSlice.actions
export default AdminNavigationSlice.reducer
