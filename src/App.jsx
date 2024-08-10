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
import { useState } from "react"
import EnterUsernamePopUp from "./components/EnterUsernamePopUp"
import Podium from "./components/podium/Podium"
import CreateContest from "./pages/CreateContest"

const App = () => {
  const [usernamePopUp, setUsernamePopUp] = useState(false);
  const [contestCode, setContestCode] = useState("");
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
          <Route path="/test" element={<Podium players={[
            { name: 'Alice', score: 120 },
            { name: 'Bob', score: 110 },
            { name: 'Charlie', score: 105 },
          ]} />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  )
}

export default App