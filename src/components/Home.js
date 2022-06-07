import React from "react";
import { useState } from "react";
import { Alert, Button } from "antd";

export default function Home() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const getPrivateStuff = () => {
    fetch("http://localhost:5050/private", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setMessage("");
          return;
        }
        setMessage(data.message);
        setError("");
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <h1>Home</h1>
      {message && <Alert message={message} type="success" />}
      {error && <Alert message={error} type="error" />}
      <Button type="primary" onClick={getPrivateStuff} size="large">
        Get Private Stuff
      </Button>
    </div>
  );
}
