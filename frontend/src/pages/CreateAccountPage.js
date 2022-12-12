import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUpdateUsername } from "../hook/useUsername";

const CreateAccountPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const func = useUpdateUsername();

  useEffect(()=>{
    localStorage.removeItem("username");
    func();
  },[]);

  const createAccount = async () => {
    if (password !== confirmPassword) {
      setError("Password and confirm password doesn't match.");
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/signup",
        { username, password },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (data === "User already exist!") {
        setError("User already exist!");
        return;
      }

      localStorage.setItem("username", data);
      func();
      navigate("/yoga-form");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <h1>Create Account</h1>
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
      <input
        type="password"
        value={confirmPassword}
        placeholder="Re-type your password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={createAccount}>Create Account</button>
      <Link to="/login" className="account-text">Already have an account? Log in here.</Link>
    </>
  );
};

export default CreateAccountPage;
