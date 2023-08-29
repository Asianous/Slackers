import { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import "./App.css";
import AuthPage from "../AuthPage/AuthPage";
import { io } from "socket.io-client";
import Profile from "../../pages/Profile/profile";
import Dashboard from "../../components/Dashboard/Dashboard";
import axios from "axios";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);
  const socket = io("http://localhost:3001");
  socketRef.current = socket;

  useEffect(() => {
    socket.on("newMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      // console.log("NewMessageModal: Received new message:", msg);
    });

    return () => {
      socket.removeAllListeners("newMessage");
      socket.disconnect();
    };
  }, []);

  return (
    <main className="App">
      {user ? (
        <>
          <Routes>
            {/* Route components in here */}
            <Route
              path="/"
              element={
                <Dashboard user={user} setUser={setUser} socket={socket} />
              }
            />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
