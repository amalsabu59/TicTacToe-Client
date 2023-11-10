import React, { useEffect, useState } from "react";
import Dashboard from "../../componets/dashboard/Dashboard";
import TicTacToe from "../../componets/TicTacToe/TicTacToe";
import RoomSelector from "../../componets/roomSelector/RoomSelector";
import { useDispatch, useSelector } from "react-redux";
import {
  loadRoomFromLocalStorage,
  loadUserFromLocalStorage,
} from "../../redux/slices/userSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { getGame } from "../../redux/slices/gameSlice";

const Home = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.currentUser);
  const roomNo = useSelector((state) => state.user.selectedRoom);

  const navigate = useNavigate();
  if (!user?._id) {
    console.log("entering user", user);
    navigate("/login");
  }

  useEffect(() => {
    dispatch(loadRoomFromLocalStorage());
    dispatch(loadUserFromLocalStorage());
    dispatch(getGame(roomNo));
  }, [roomNo]);
  const selectedRoom = useSelector((state) => state.user.selectedRoom);

  if (!selectedRoom) {
    return <RoomSelector />;
  }
  return (
    <div>
      <Dashboard />
      <TicTacToe />
    </div>
  );
};

export default Home;
