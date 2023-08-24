import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from "../AuthPage/AuthPage";
import GroupChat from '../GroupChat/Group';
import MessagePage from "../MessagePage/MessagePage";
import Search from '../../components/UserSearch/Search';
import SideBar from '../../components/SideBar/SideBar';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ? (
        <>
          <SideBar user={user} setUser={setUser} />
          {/* <NavBar user={user} setUser={setUser} /> */}
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
