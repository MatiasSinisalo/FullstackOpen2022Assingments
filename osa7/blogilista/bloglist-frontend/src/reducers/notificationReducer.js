import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: {
    message: "",
    style: "",
  },
  timeutID: undefined,
};

const notificationReducer = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotificationMessage(state, action) {
      return { ...state, notification: action.payload };
    },
  },
});

export const { setNotificationMessage } = notificationReducer.actions;

export default notificationReducer.reducer;
