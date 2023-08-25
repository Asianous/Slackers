import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from "../AuthPage/AuthPage";
import { io } from "socket.io-client";
import Profile from "../../pages/Profile/profile";
import Search from "../../components/UserSearch/Search";
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
