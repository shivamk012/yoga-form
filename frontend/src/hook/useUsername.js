import { useState, useEffect } from "react";

const useUsername = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const foundUsername = localStorage.getItem("username");
    if (foundUsername) {
      setUsername(foundUsername);
    }
  }, []);

  return username;
};

export default useUsername;