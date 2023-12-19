import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

function Dashboard() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome {user?.name}</h2>
    </div>
  );
}

export default Dashboard;
