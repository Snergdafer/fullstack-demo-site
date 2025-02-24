import { useState } from "react";
import { login, register } from "../Api";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  const handleLoginClick = () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    login(formData, setToken);
  };

  const handleRegisterNewUser = () => {
    if (password === setPassword) {
      register({ username, password }, setToken);
    } else {
      setError("Passwords do not match");
    }
  };

  return (
    <div className="flex flex-col w-110 h-100 mt-25 justify-center items-center bg-[#7998b3] rounded-2xl px-6">
      {!isRegistering ? (
        <>
          <h2 className="mb-12 mt-2 text-2xl font-bold">Login</h2>
          <div className="flex flex-row w-full">
            <text className="">Email:</text>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-2 border-blue-300 rounded-md w-60 bg-gray-700 ml-auto"
            />
          </div>
          <div className="flex flex-row w-full mt-4">
            <text>Password:</text>
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-blue-300 rounded-md w-60 bg-gray-700 ml-auto"
            />
          </div>
          <div className="mt-8">
            <button onClick={handleLoginClick} className="w-40 h-10 rounded-sm">
              Login
            </button>
          </div>
          <div className="mt-4">
            <button
              onClick={() => setIsRegistering(true)}
              className="w-40 h-10 rounded-sm"
            >
              Register
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="mb-8 mt-2 text-2xl font-bold">Register</h2>
          <div className="flex flex-row w-full">
            <text className="mr-13">Email:</text>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-2 border-blue-300 rounded-md w-60 bg-gray-700 ml-auto"
            />
          </div>
          <div className="flex flex-row w-full mt-4">
            <text>Password:</text>
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-blue-300 rounded-md w-60 bg-gray-700 ml-auto"
            />
          </div>
          <div className="flex flex-row w-full mt-4">
            <text>Verify Password:</text>
            <input
              value={verifyPassword}
              type="password"
              onChange={(e) => setVerifyPassword(e.target.value)}
              className="border-2 border-blue-300 rounded-md w-60 bg-gray-700 ml-auto"
            />
          </div>
          <button
            onClick={handleRegisterNewUser}
            className="w-40 h-10 mt-8 rounded-sm"
          >
            Register
          </button>
          <button
            onClick={() => setIsRegistering(false)}
            className="w-40 h-10 mt-4 rounded-sm"
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
};

export default Login;
