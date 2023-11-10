import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const login = createAsyncThunk("auth/login", async (data) => {
  try {
    const response = await axios.post(`auth/login`, JSON.stringify(data));
    return response.data;
  } catch (error) {
    // Re-throw the error to be caught in the rejected action
    throw error;
  }
});

// userSlice.js or wherever your Redux actions are defined
export const loadUserFromLocalStorage = (data) => {
  const user = localStorage.getItem("user");
  const parsedUser = JSON.parse(user);
  return {
    type: "user/loadUserFromLocalStorage",
    payload: parsedUser,
  };
};
export const loadRoomFromLocalStorage = (data) => {
  const room = localStorage.getItem("selectedRoom");
  return {
    type: "user/loadRoomFromLocalStorage",
    payload: room,
  };
};

export const selectRoom = (room) => {
  return {
    type: "user/selectRoom",
    payload: room,
  };
};

const initalState = {
  currentUser: {
    username: "",
  },
  selectedRoom: "",
};
const userSlice = createSlice({
  name: "user",
  initialState: initalState,
  reducers: {
    selectRoom: (state, action) => {
      localStorage.setItem("selectedRoom", action.payload);
      state.selectedRoom = action.payload;
    },
    loadRoomFromLocalStorage: (state, action) => {
      state.selectedRoom = action.payload;
    },
    loadUserFromLocalStorage: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.status = "loading";
    },
    [login.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
      localStorage.setItem("user", JSON.stringify(payload));
      state.loginModal = false;
    },
    [login.rejected]: (state, action) => {
      state.status = "failed";
      state.failedStatus = "Wrong Credentials";
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
