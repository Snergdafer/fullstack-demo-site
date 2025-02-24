import { useState, useEffect } from "react";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Cookies from "js-cookie";
import "./output.css";
import "material-icons/iconfont/material-icons.css";
import { jwtDecode } from "jwt-decode";

export const StatusOptions = {
  todo: "To Do",
  inProgress: "In Progress",
  complete: "Complete",
};

function App() {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(null);

  return (
    <div className="p-0, m-0 w-full flex flex-col items-center">
      {token ? (
        <Dashboard setToken={setToken} userId={userId} />
      ) : (
        <Login setToken={setToken} setUserId={setUserId} />
      )}
    </div>
  );
}

export default App;
