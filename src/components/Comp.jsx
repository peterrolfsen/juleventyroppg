import { useState } from "react";
import "./comp.css";

const encodedSegments = ["MjYz", "NA=="];

export const Comp = () => {
  const [message, setMessage] = useState("Skriv inn kode");
  const [enteredCode, setEnteredCode] = useState("");
  const [isCodeCorrect, setIsCodeCorrect] = useState(false); // New state variable for image visibility
  const [encodedLink, setEncodedLink] = useState(
    "aHR0cHM6Ly9ldC1mcm9udGVuZC1qdWxlZXZlbnR5ci0yMDIzLXJldHJvLnZlcmNlbC5hcHAv"
  );

  const updateDisplay = (newMessage) => {
    setMessage(newMessage);
  };

  const clearDisplay = () => {
    setEnteredCode("");
    setIsCodeCorrect(false); // Hide the image when display is cleared
    updateDisplay("Skriv inn kode");
  };

  const pressKey = (key) => {
    setEnteredCode((prevCode) => prevCode + key);
    updateDisplay(enteredCode + key);
  };

  function decodeBase64Url(encodedUrl) {
    // Replace URL-specific base64 chars to standard base64 chars
    const base64 = encodedUrl.replace(/-/g, "+").replace(/_/g, "/");
    // Decode the base64 string
    const decodedUrl = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          // Convert each character to a '%' followed by the character's Unicode value in hexadecimal
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return decodedUrl;
  }

  const checkCode = () => {
    console.log("Første tall: Hvor mange S er det i Sopra Steria?");
    console.log(encodedLink);
    const isCorrect =
      enteredCode.length === 4 &&
      encodedSegments.every((segment, index) => {
        const part = enteredCode.slice(index * 3, (index + 1) * 3);
        return atob(segment).startsWith(part);
      });

    if (isCorrect) {
      setIsCodeCorrect(true); // Set the state to true to display the image
      updateDisplay("Åpen!");
      setEncodedLink(decodeBase64Url(encodedLink));
    } else {
      updateDisplay("Feil kode!");
      setTimeout(() => {
        clearDisplay();
      }, 2000);
    }
  };

  return (
    <div id="spm3">
      <h1 id="title">Kom deg inn!</h1>
      <div className="smart-lock">
        <div id="lock-display" className="display">
          {message}
        </div>
        <div
          className="number-pad"
          id="andre-tall: Antall siffer i koden delt på 2."
        >
          <div className="row">
            <button className="key" onClick={() => pressKey(1)}>
              1
            </button>
            <button className="key" onClick={() => pressKey(2)}>
              2
            </button>
            <button className="key" onClick={() => pressKey(3)}>
              3
            </button>
          </div>
          <div className="row">
            <button className="key" onClick={() => pressKey(4)}>
              4
            </button>
            <button className="key" onClick={() => pressKey(5)}>
              5
            </button>
            <button className="key" onClick={() => pressKey(6)}>
              6
            </button>
          </div>
          <div className="row">
            <button className="key" onClick={() => pressKey(7)}>
              7
            </button>
            <button className="key" onClick={() => pressKey(8)}>
              8
            </button>
            <button className="key" onClick={() => pressKey(9)}>
              9
            </button>
          </div>
          <div className="row">
            <button className="key" onClick={clearDisplay}>
              Clear
            </button>
            <button className="key" onClick={() => pressKey(0)}>
              0
            </button>
            <button className="key" onClick={checkCode}>
              Enter
            </button>
          </div>
        </div>
      </div>
      {isCodeCorrect && (
        <div className="image-container">
          <img src="/Images/kjell.jpeg" alt="Successful Code Entry" />
          <h1>
            Hei, mitt navn er Kjell. Jeg driver denne sjappa. Velkommen inn til
            oss!
          </h1>
          <button id="nesteOppgave" href={encodedLink}>
            {encodedLink}
          </button>
        </div>
      )}
    </div>
  );
};

export default Comp;
