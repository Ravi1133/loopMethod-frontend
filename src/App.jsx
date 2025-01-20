import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import User from "./components/user"
import Event from "./components/event"
import AddEvent from "./components/event/AddEvent";
import ProfitLoss from "./components/event/ProfitLoss";
import ScanTicket from "./components/ticket";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="" style={{width:"100vw",height:"100vh" }}>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/user" element={<User/>}></Route>
          <Route path="/event" element={<Event/>}></Route>
          <Route path="/addEvent" element={<AddEvent/>}></Route>
          <Route path="/updateEvent" element={<AddEvent/>}></Route>

          <Route path="/profitLoss" element={<ProfitLoss/>}></Route>
          <Route path="/scan" element={<ScanTicket/>}></Route>
          <Route path="/bookTicket" element={<ScanTicket/>}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
