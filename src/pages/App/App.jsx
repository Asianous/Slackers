import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from "../AuthPage/AuthPage";
import NavBar from '../../components/NavBar/NavBar';
import GroupChat from '../GroupChat/Group';
import MessagePage from "../MessagePage/MessagePage";
import { io } from "socket.io-client";
import SideBar from '../../components/SideBar/SideBar';
import Profile from "../../pages/Profile/profile";
import Search from "../../components/UserSearch/Search";
import Messages from "../../components/Messages/Messages";
import Dashboard from "../../components/Dashboard/Dashboard";

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ? (
        <>
          <Routes>
            {/* Route components in here */}
            <Route
              path="/"
              element={<Dashboard user={user} setUser={setUser} />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
