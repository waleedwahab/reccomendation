import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: [],
    sellingUser: null,
  },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
      console.log(JSON.stringify(state, undefined, 2));
    },
    setSellingUser(state, action) {
      state.sellingUser = action.payload;
    },
  },
});
export const userActions = userSlice.actions;
export const { setUserInfo, setSellingUser } = userSlice.actions;
export default userSlice.reducer;
