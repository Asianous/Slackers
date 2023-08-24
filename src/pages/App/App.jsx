import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from "../AuthPage/AuthPage";
import NavBar from '../../components/NavBar/NavBar';
import GroupChat from '../GroupChat/Group';
import MessagePage from "../MessagePage/MessagePage";
import Search from '../../components/UserSearch/Search';
import { io } from "socket.io-client";
import SideBar from '../../components/SideBar/SideBar';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ? (
        <>
          <Routes>
            <Route path="/" element={<SideBar user={user} setUser={setUser} />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}