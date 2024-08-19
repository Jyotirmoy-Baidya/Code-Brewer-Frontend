import { BrowserRouter, Route, Routes, } from "react-router-dom"
import Landing from "./pages/Landing"
import Contests from "./pages/Contests"
import ActiveContest from "./pages/ActiveContest"
import Problem from "./pages/Problem"
import ProblemStatements from "./pages/ProblemStatements"
import ContestProblem from "./pages/ContestProblem"
import CreateProblem from "./pages/CreateProblem"
import { Toaster } from "react-hot-toast"
import CodeArea from "./pages/CodeArea"
import Broiler from "./components/basic/Broiler"
import { useEffect, useState } from "react"
import EnterUsernamePopUp from "./components/EnterUsernamePopUp"
import Podium from "./components/podium/Podium"
import CreateContest from "./pages/CreateContest"
import About from "./pages/About"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import RoomHost from "./videoConfe/RoomHost"
import AgoraRTC, { AgoraRTCProvider, useRTCClient } from "agora-rtc-react"
import RoomHostMessaging from "./videoConfe/RoomHostWithMessaging"
import Profile from "./pages/Profile"

const App = () => {
  //   try {
  //     const response = await axiosInstance.get("http://localhost:3010/api/v1/contest/getuser", {
  //       withCredentials: true
  //     });
  const agoraClient = useRTCClient(AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })); // Initialize Agora Client


  return (
    <div className="relative flex flex-col h-screen bg-black text-white design-scrollbar">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/contests" element={<Contests />} />
          <Route path="/problemstatements" element={<ProblemStatements />} />

          <Route path="/contestactive/:code" element={<ActiveContest />} />
          <Route path="/contest/problem/:code/:problemid" element={<ContestProblem />} />
          <Route path="/problem/:problemid" element={<Problem />} />
          <Route path="/createproblem" element={<CreateProblem />} />
          <Route path="/codearea" element={<CodeArea />} />
          <Route path="/createcontest" element={<CreateContest />} />
          <Route path="/aboutus" element={<About />} />
          <Route path='/profile' element={<Profile />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Room Video Call  */}
          <Route path="/room/host/:roomid" element={
            <AgoraRTCProvider client={agoraClient}>
              <RoomHost />
            </AgoraRTCProvider>
          } />
          <Route path="/room/participant/:roomid" element={<>Participant</>} />

          <Route path="*" element={<Landing />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div >
  )
}

export default App