import { Link } from "react-router-dom";
import { useEffect } from "react";
import useUsername from "../hook/useUsername";

const NavBar = () => {
  const username = useUsername();

  useEffect(()=>{
  },[username]);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/yoga-form">Yoga Form</Link>
        </li>
        <li>
          {!username ? (
            <Link to="/login">Login</Link>
          ) : (
            <Link to="/" onClick={() => localStorage.removeItem("username")}>
              Sign Out
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
