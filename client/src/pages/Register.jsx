import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const { data } = await axios.post("/register", {
        name,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
        console.log("ERROR:", data.error);
      } else {
        setData({});
        toast.success("Registration Success! Please login.");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      console.log("Catch Block Error:", err);
      toast.error("An error occurred during registration.");
    }
  };

  return (
    <div>
      <form onSubmit={registerUser}>
        <label>Username</label>
        <input
          type="text"
          placeholder="name"
          value={data.name}
          onChange={(e) =>
            setData((prevData) => ({ ...prevData, name: e.target.value }))
          }
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={(e) =>
            setData((prevData) => ({ ...prevData, email: e.target.value }))
          }
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) =>
            setData((prevData) => ({ ...prevData, password: e.target.value }))
          }
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
