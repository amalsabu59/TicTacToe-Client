import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import gameSlice from "./slices/gameSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    game: gameSlice.reducer,
  },
});

export default store;
