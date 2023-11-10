import logo from "./logo.svg";
import "./App.css";
import TicTacToe from "./componets/TicTacToe/TicTacToe";
import Dashboard from "./componets/dashboard/Dashboard";
import Login from "./pages/login/Login";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFromLocalStorage } from "./redux/slices/userSlice";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserFromLocalStorage());
  }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
