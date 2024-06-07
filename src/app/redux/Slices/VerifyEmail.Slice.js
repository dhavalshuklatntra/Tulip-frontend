'use client'
import { createSlice } from '@reduxjs/toolkit'

const initialState = { info: null }

export const VerifyEmailSlice = createSlice({
  name: 'VerifyEmail',
  initialState,
  reducers: {
    SET_EMAIL_INFO: (state, action) => {
      state.info = action.payload
    },
    CLEAR_EMAIL_INFO: (state) => {
      state.info = null
    },
  },
})

export const { SET_EMAIL_INFO, CLEAR_EMAIL_INFO } = VerifyEmailSlice.actions

export default VerifyEmailSlice.reducer
