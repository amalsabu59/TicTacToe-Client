import React, { useState, useEffect } from "react";
import "./TicTacToe.css";
import io from "socket.io-client";
import cricle_icon from "../../assets/circle.png";
import cross_icon from "../../assets/cross.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getGame,
  getPlayers,
  incrementScore,
  updateGameStatus,
  updateScore,
} from "../../redux/slices/gameSlice";

const TicTacToe = () => {
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  // const [currentPlayer, setCurrentPlayer] = useState("");

  const userId = useSelector((state) => state.user?.currentUser?._id);
  const socket = io.connect("https://tictactoe-jt2p.onrender.com");
  const dispatch = useDispatch();
  const room = useSelector((state) => state.user?.selectedRoom);

  const game = useSelector((state) => state.game.currentgame);

  const playerX = game.x_user_id;
  const playerO = game.o_user_id;

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };
  joinRoom();

  const currentPlayer = game.current_player;

  useEffect(() => {
    if (!playerO || !playerX) dispatch(getGame(room));
  }, [playerX, playerO]);

  const sendMoves = (newData) => {
    console.log(
      "currentPlayer,playerX,playerO",
      currentPlayer,
      playerX,
      playerO
    );
    socket.emit("send_moves", {
      newData,
      room,
      userIdForNextMove: currentPlayer !== playerX ? playerX : playerO,
    });
  };
  // const sendWinner = (winner) => {
  //   socket.emit("wins", {
  //     room,
  //     winner,
  //   });
  // };

  useEffect(() => {
    socket.on("receive_moves", (receivedData) => {
      if (receivedData.winner) {
        if (receivedData.winner === "x") {
          dispatch(incrementScore("x_score"));
        }
        if (receivedData.winner === "o") {
          dispatch(incrementScore("o_score"));
        }
        let message = "";
        if (receivedData.winner === "tie") {
          message = "Game on Tie";
        } else {
          message = `${receivedData.winner} wins! Press OK to reset the data.`;
        }

        setTimeout(() => {
          const confirmation = window.confirm(message);
          if (confirmation) {
            handleReset();
          }
        }, 100);
      }
      const dataReceived = receivedData.data.newData;
      // console.log("dataReceived", dataReceived);
      if (receivedData.winner) {
        dispatch(updateScore({ roomNo: room, wonUser: receivedData.winner }));
      }
      // dispatch(getGame(room));
      // setCurrentPlayer(receivedData.userIdForNextMove);
      // console.log(
      //   "entering..................,receivedData.userIdForNextMove",
      //   receivedData.userIdForNextMove
      // );

      dispatch(
        updateGameStatus({
          current_game: dataReceived,
          current_player: receivedData.userIdForNextMove
            ? receivedData.userIdForNextMove
            : null,
        })
      );
    });

    // return () => {
    //   socket.disconnect();
    // };

    // });
  }, []);

  const handleboxclick = async (num) => {
    if (!playerO) dispatch(getPlayers(room));
    if (currentPlayer !== "" && currentPlayer !== userId) return;
    // if (lock) {
    //   return;
    // }
    if (game?.current_game[num] === "") {
      const newData = [...game?.current_game];
      if (currentPlayer === playerX) {
        newData[num] = "x";
      } else {
        newData[num] = "o";
      }
      dispatch(
        updateGameStatus({
          current_game: newData,
          current_player: null,
        })
      );
      sendMoves(newData);
    }
  };

  const handleReset = () => {
    sendMoves(["", "", "", "", "", "", "", "", ""]);
    dispatch(
      updateGameStatus({
        current_game: ["", "", "", "", "", "", "", "", ""],
        current_player: null,
      })
    );
  };

  const checkUserStatus = () => {
    // console.log(
    //   "currentPlayer, userId, playerX, playerO",
    //   currentPlayer,
    //   userId,
    //   playerX,
    //   playerO
    // );
    if (currentPlayer !== userId && userId !== playerX && userId !== playerO) {
      return "";
    }
    if (currentPlayer === userId) {
      return "Your Turn";
    }
    if (
      currentPlayer !== userId &&
      (userId === playerX || userId === playerO)
    ) {
      return "Opponent Turn";
    }
  };

  // console.log(checkUserStatus());
  return (
    <div className="container">
      <p>{checkUserStatus()}</p>
      <div className="board">
        {game?.current_game?.map((value, index) => (
          <div
            key={index}
            className="boxes"
            onClick={() => handleboxclick(index)}
          >
            {value === "x" && <img src={cross_icon} alt="X" />}
            {value === "o" && <img src={cricle_icon} alt="O" />}
          </div>
        ))}
      </div>
      {checkUserStatus() ? (
        <button className="reset" onClick={handleReset}>
          Reset
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default TicTacToe;
