import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from "../AuthPage/AuthPage";
import NavBar from '../../components/NavBar/NavBar';
import GroupChat from '../GroupChat/Group';
import MessagePage from "../MessagePage/MessagePage";
import Search from '../UserSearch/Search';
import { io } from "socket.io-client";

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/group" element={<GroupChat />} />
            <Route path="/message" element={<MessagePage />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}