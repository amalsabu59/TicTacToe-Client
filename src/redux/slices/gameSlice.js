import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const addGame = createAsyncThunk("game/add-game", async (data) => {
  try {
    const response = await axios.post(`game/add-game`, JSON.stringify(data));
    return response.data;
  } catch (error) {
    // Re-throw the error to be caught in the rejected action
    throw error;
  }
});
export const updateScore = createAsyncThunk(
  "game/update-score/room_no",
  async (data) => {
    try {
      const response = await axios.put(
        `game/update-score/${data?.roomNo}`,
        data
      );
      return response.data;
    } catch (error) {
      // Re-throw the error to be caught in the rejected action
      throw error;
    }
  }
);
export const getGame = createAsyncThunk("game/get-game", async (id) => {
  try {
    const response = await axios.get(`game/get-game/${id}`);
    return response.data;
  } catch (error) {
    // Re-throw the error to be caught in the rejected action
    throw error;
  }
});
export const getPlayers = createAsyncThunk("game/get-players", async (id) => {
  try {
    const response = await axios.get(`game/get-players/${id}`);
    return response.data;
  } catch (error) {
    // Re-throw the error to be caught in the rejected action
    throw error;
  }
});

export const incrementScore = (data) => {
  return {
    type: "game/incrementScore",
    payload: data,
  };
};
export const updateGameStatus = (data) => {
  return {
    type: "game/updateGameStatus",
    payload: data,
  };
};
const initalState = {
  currentgame: {},
  selectedRoom: "",
};
const gameSlice = createSlice({
  name: "game",
  initialState: initalState,
  reducers: {
    incrementScore: (state, action) => {
      state.currentgame[action.payload] += 1;
    },
    updateGameStatus: (state, action) => {
      if (action.payload.current_game) {
        state.currentgame.current_game = action.payload.current_game;
      }
      if (action.payload.current_player) {
        state.currentgame.current_player = action.payload.current_player;
      }
    },
  },
  extraReducers: {
    [addGame.pending]: (state, action) => {
      state.status = "";
    },
    [addGame.fulfilled]: (state, { payload }) => {
      state.currentgame = payload;
    },
    [addGame.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getGame.pending]: (state, action) => {
      state.status = "";
    },
    [getGame.fulfilled]: (state, { payload }) => {
      state.currentgame = payload;
    },
    [getGame.rejected]: (state, action) => {
      state.status = "failed";
    },
    [updateScore.pending]: (state, action) => {
      state.status = "";
    },
    [updateScore.fulfilled]: (state, { payload }) => {
      // state.currentgame = payload;
    },
    [updateScore.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getPlayers.pending]: (state, action) => {
      state.status = "";
    },
    [getPlayers.fulfilled]: (state, { payload }) => {
      state.currentgame.x_user_id = payload.x_user_id;
      state.currentgame.o_user_id = payload.o_user_id;
    },
    [getPlayers.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const gameActions = gameSlice.actions;
export default gameSlice;
