import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: localStorage.getItem("userLoginInfo")
      ? JSON.parse(localStorage.getItem("userLoginInfo"))
      : null,
  },
  reducers: {
    userLoginInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    resetUserState: (state)=>{
      state.userInfo = null;
    }
  },
});

export const { userLoginInfo, resetUserState } = userSlice.actions;

export default userSlice.reducer;
