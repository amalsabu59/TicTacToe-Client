import React, { useState } from "react";
import "./Login.css";
import { login } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  if (user?._id) {
    // If the user is logged in, navigate to the desired route
    navigate("/");
  }
  const handleLogin = () => {
    dispatch(login({ username, password }));
  };

  return (
    <div className="login-container">
      {/* <h2>Login</h2> */}
      <form>
        <label>Username:</label>
        <input
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
