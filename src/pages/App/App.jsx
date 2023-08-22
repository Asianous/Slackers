import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from "../AuthPage/AuthPage";
import NavBar from '../../components/NavBar/NavBar';
import GroupChat from '../GroupChat/Group';
import MessagePage from "../MessagePage/MessagePage";
import { io } from "socket.io-client";

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            {/* Route components in here */}
            <Route path="/group" element={<GroupChat />} />
            <Route path="/message" element={<MessagePage />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}