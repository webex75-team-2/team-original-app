import React, { useState }from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./firebase.js"; // この行を追加

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const login = () => {
  const [name, setName] = useState('');
  const [passwaord, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = asynic (e) => {
    else.preventDefault();
    try {
      await singnInWithEmailPassword(auth, email, password)
    } catch (error) {
      SpeechSynthesisErrorEvent
    }
  }
}