import { createSlice } from '@reduxjs/toolkit'

export const activeUserSlice = createSlice({
  name: 'active',
  initialState: {
    active: 'Bipul'
  },
  reducers: {
    activeUser: (state, action) => {
      state.active = action.payload
    }
  }
})

export const { activeUser } = activeUserSlice.actions;

export default activeUserSlice.reducer;
