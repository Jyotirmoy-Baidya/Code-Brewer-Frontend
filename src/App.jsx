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

const App = () => {
  const [usernamePopUp, setUsernamePopUp] = useState(false);
  const [contestCode, setContestCode] = useState("");
  return (
    <div className="relative h-screen w-screen bg-black text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/contests" element={<Contests />} />
          <Route path="/contestactive/:id" element={<ActiveContest />} />
          <Route path="/contest/problem/:contestcode/:problemid" element={<ContestProblem />} />
          <Route path="/problemstatements" element={<ProblemStatements />} />
          <Route path="/problem/:problemid" element={<Problem />} />
          <Route path="/createproblem" element={<CreateProblem />} />
          <Route path="/codearea" element={<CodeArea />} />
          <Route path="/test" element={<Broiler />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  )
}

export default App