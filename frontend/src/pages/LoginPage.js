import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const logIn = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/login",
        {
          username,
          password,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      localStorage.setItem("username", data);
      navigate("/yoga-form");
    } catch (err) {
      setError(err.response.data);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <h1>Log In</h1>
      {error && <p className="error">{error}</p>}
      <input
        value={username}
        placeholder="Your username addrress"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Your password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={logIn}>Log In</button>
      <Link to="/create-account">Don't have an account? Create one here.</Link>
    </>
  );
};

export default LoginPage;
