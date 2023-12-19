import "./App.css";
import Navbar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/userContext";
import axios from "axios";
import Dashboard from "./pages/Dashboard";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:5000";

function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
