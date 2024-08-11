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
import axiosInstance from "./utils/AxiosInstance"
import Redirect from "./components/basic/Redirect"
import About from "./pages/About"

const App = () => {
  //   try {
  //     const response = await axiosInstance.get("http://localhost:3010/api/v1/contest/getuser", {
  //       withCredentials: true
  //     });


  return (
    <div className="relative h-screen w-screen bg-black text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/contestactive/:code" element={<ActiveContest />} />
          <Route path="/contest/problem/:code/:problemid" element={<ContestProblem />} />
          <Route path="/problemstatements" element={<ProblemStatements />} />
          <Route path="/problem/:problemid" element={<Problem />} />
          <Route path="/createproblem" element={<CreateProblem />} />
          <Route path="/codearea" element={<CodeArea />} />
          <Route path="/contests" element={<Contests />} />
          <Route path="/createcontest" element={<CreateContest />} />
          <Route path="/aboutus" element={<About/>} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div >
  )
}

export default App