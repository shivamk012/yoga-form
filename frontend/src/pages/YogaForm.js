import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsername } from "../hook/useUsername";
import axios from "axios";
import BatchDropDown from "../components/BatchDropDown";

const YogaForm = () => {
  const month = new Date().toLocaleString('default', { month: 'long' });
  const username = useUsername();
  const navigate = useNavigate();
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [age, setAge] = useState(null);
  const [batchNumber, setBatchNumber] = useState(null);
  const [displayBatch, setDisplayBatch] = useState("");
  const [isPayed, setIsPayed] = useState(false);
  const [error, setError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const giveBatch = () => {
    switch (batchNumber) {
      case 1:
        setDisplayBatch("Timing: 7:00-8:00 AM");
        break;
      case 2:
        setDisplayBatch("Timing: 8:00-9:00 AM");
        break;
      case 3:
        setDisplayBatch("Timing: 5:00-6:00 PM");
        break;
      default:
        setDisplayBatch("Timing: 6:00-7:00 AM");
    }
  };

  useEffect(() => {
    if (username) {
      const func = async () => {
        const { data } = await axios.get(
          `http://localhost:8000/api/user-detail?username=${username}`
        );
        if (data) {
          setFormSubmitted(true);
        }
      };
      func();
    }
  }, []);

  const handleForm = async () => {
    if (!name) {
      setError("Please enter your name");
      return;
    } else if (!phone) {
      setError("Please enter your mobile number");
      return;
    } else if (!age || age < 18 || age > 65) {
      setError("Please enter your age correctly");
      return;
    } else if (!batchNumber) {
      setError("Please select your batch");
      return;
    } else if (!isPayed) {
      setError("Payment not done");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8000/api/yoga-form`,
        { username, name, phone, age, batch: batchNumber },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );

      setFormSubmitted(true);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <>
      <h1>Yoga Form</h1>
      {username ? (
        <>
          {formSubmitted ? (
            <p className="error">You Yoga form for {month} has been resgistered</p>
          ) : (
            <>
              {error && <p className="error">{error}</p>}
              <input
                value={name}
                placeholder="Your name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                value={phone}
                placeholder="Your mobile number"
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                value={age}
                placeholder="age criteria 18-65"
                onChange={(e) => setAge(e.target.value)}
              />
              {batchNumber && <input value={displayBatch} disabled />}
              {isPayed && <input value="Paying: 500" disabled />}
              <BatchDropDown
                setBatchNumber={setBatchNumber}
                giveBatch={giveBatch}
              />
              <button
                className="pay"
                onClick={() => setIsPayed((prev) => !prev)}
              >
                Pay Now
              </button>
              <button className="submit" onClick={handleForm}>
                Submit details
              </button>
            </>
          )}
        </>
      ) : (
        <button className="submit" onClick={() => navigate("/login")}>
          Log in to fill the form
        </button>
      )}
    </>
  );
};

export default YogaForm;
