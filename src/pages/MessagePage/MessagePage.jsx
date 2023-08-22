import { io } from "socket.io-client";
import React, { useState, useEffect, useRef } from "react";

export default function MessagePage() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef(null);
  let socket = io("http://localhost:3001");

  useEffect(() => {
    socketRef.current = socket;
    socketRef.current.on("message", (message) => {
      console.log(message);
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  return (
    <>
      <h1>Message Page</h1>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={() => {
            socketRef.current.emit("send-message", message);
            setMessage("");
          }}
        >
          Send
        </button>
      </div>
    </>
  );
}
