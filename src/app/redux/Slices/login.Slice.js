import { createSlice } from '@reduxjs/toolkit'
const LoginSlice = createSlice({
  name: 'Login',
  initialState: {
    isShow: false,
    isProfileUpdated: false,
  },
  reducers: {
    SET_MODAL: (state, action) => {
      state.isShow = !state.isShow
    },
    SET_USER_DATA: (state, action) => {
      // state.userDetails = action.payload;
      state.userDetails = { ...state?.userDetails, ...action.payload }
    },
    UPDATE_PROFILE_STATUS: (state, action) => {
      state.isProfileUpdated = action.payload
    },
    LOGOUT: (state, action) => {
      state = {}
    },
  },
})

export const { SET_MODAL, SET_USER_DATA, UPDATE_PROFILE_STATUS, LOGOUT } =
  LoginSlice.actions
export default LoginSlice.reducer
