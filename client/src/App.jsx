import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AddPoll from "./pages/AddPoll";
import Login from "./pages/Login";
import MyPoll from "./pages/MyPoll";
import Poll from "./pages/Poll";
import Signup from "./pages/Signup";
import UpdatePoll from "./pages/UpdatePoll";
import Navigation from "./components/Navigation";
import PrivateComponent from "./components/PrivateComponent";
import Users from './pages/Users';
import { AppContext, socket } from "./context/appContext";


function App() {


  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState({});
  


  return (
    <>
    <AppContext.Provider value={{ socket, currentRoom, setCurrentRoom, members, setMembers, messages, setMessages, rooms, setRooms, newMessages, setNewMessages}}  >
      <Router>

        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateComponent />}>

            <Route path="/profile" element={<Profile />} />
            <Route path="/addpoll" element={<AddPoll />} />
            <Route path="/poll" element={<Poll />} />
            <Route path="/updatepoll" element={<UpdatePoll />} />
            <Route path="/mypoll" element={<MyPoll />} />
            <Route path="/users" element={<Users />} />

          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />


        </Routes>
      </Router>
      </AppContext.Provider>
    </>

  )
}

export default App
