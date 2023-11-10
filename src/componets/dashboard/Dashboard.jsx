import React, { useState } from "react";
import "./dashboard.css";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const userId = useSelector((state) => state.user?.currentUser?._id);

  const game = useSelector((state) => state.game.currentgame);

  const playerX = game.x_user_id;
  const playerO = game.o_user_id;
  return (
    <div className="dashboard-container">
      {/* <h1 className="title">Tic Tac Toe Game</h1> */}
      <div className="score">
        {playerX === userId ? (
          <p className="score-label">You are player X</p>
        ) : playerO === userId ? (
          <p className="score-label">You are player O </p>
        ) : (
          <p className="score-label"> </p>
        )}

        {/* <p>score</p> */}
        <div className="score-container">
          <p className="user-score">X: {game.x_score}</p>
          <p className="user-score">O: {game.o_score}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
