import React, { useState } from "react";
import "./roomSelector.css";
import { useDispatch, useSelector } from "react-redux";
import { selectRoom } from "../../redux/slices/userSlice";
import { addGame } from "../../redux/slices/gameSlice";
function RoomSelector() {
  const dispatch = useDispatch();

  // State to store the selected room number
  const [roomNumber, setRoomNumber] = useState("");
  const userId = useSelector((state) => state.user?.currentUser?._id);
  // Event handler for input changes
  const handleRoomNumberChange = (event) => {
    setRoomNumber(event.target.value);
  };

  // Event handler for saving the room selection (you can replace this with your save logic)
  const handleSave = () => {
    if (roomNumber) {
      dispatch(selectRoom(roomNumber));
      dispatch(addGame({ user_id: userId, room_no: roomNumber }));
      // Add your save logic here, e.g., send the roomNumber to an API.
    } else {
      alert("Please enter a valid room number.");
    }
  };

  return (
    <div className="container">
      <div className="room-selector">
        <label htmlFor="roomNumber">Join a room:</label>
        <input
          type="number"
          id="roomNumber"
          value={roomNumber}
          onChange={handleRoomNumberChange}
          min="1"
        />
        <button className="joinRoom" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}

export default RoomSelector;
