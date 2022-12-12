import { Link } from "react-router-dom";
import { useUpdateUsername, useUsername } from "../hook/useUsername";

const NavBar = () => {
  const username = useUsername();
  const func = useUpdateUsername();

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
            <Link to="/" onClick={() => {
              localStorage.removeItem("username");
              func();
            }}>
              Sign Out
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
