import React, { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { FaArrowCircleLeft, FaCircleNotch } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Header from "../components/basic/Header";
import CodingPlayground from "../components/problem/CodingPlayground";

import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import CustomDropdown from "../components/basic/CustomDropDown";
import toast from "react-hot-toast";
import axiosInstance from "../utils/AxiosInstance";
import axiosHandler from "../utils/AxiosInstance";
import { FaClock, FaMemory } from "react-icons/fa";
import Discussion from "../components/Discussion";

const options = [
  // { value: "c", label: "C" },
  // { value: "cpp", label: "C++" },
  { value: "java", label: "Java" },
  { value: "python", label: "Python" },
];

const Problem = () => {
  const boilerplateCode = (lang) => {
    switch (lang) {
      case 'java':
        return `class TempCode {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`;
      case 'python':
        return `print("hello world")`;
      default:
        return "";
    }
  };

  const params = useParams();
  const [runCodeLoading, setRunCodeLoading] = useState(false);
  const [problem, setProblem] = useState({});
  const [loading, setLoading] = useState(false);

  const [testCasesResult, setTestCaseResult] = useState([]);

  //Code By T
  // const [code, setCode] = useState('');
  const [code, setCode] = useState(boilerplateCode("java"));
  const [language, setLanguage] = useState("java"); // Default to java
  const [input, setInput] = useState(""); // New state for user input
  const [output, setOutput] = useState("");
  const [metrics, setMetrics] = useState({ time: "", memory: "" });
  const [customInput, setCustomInput] = useState(false);
  const [outputBox, setOutputBox] = useState(false);
  const [questionView, setQuestionView] = useState("Description");

  // function extractClassName(code) {
  //     const classNameMatch = code.match(/class\s+(\w+)/);
  //     return classNameMatch ? classNameMatch[1] : null;
  // }
  function extractClassName(code) {
    // Regex to match the class that contains the main method
    const mainClassMatch = code.match(
      /class\s+(\w+)\s+.*\{[^]*?public\s+static\s+void\s+main\s*\(\s*String\s*\[\s*\]\s*args\s*\)\s*\{[^]*?\}/
    );

    // If a class with the main method is found, return its name
    if (mainClassMatch) {
      return mainClassMatch[1];
    }

    // Otherwise, return null
    return null;
  }

  const runCodeWithTestCase = async (id) => {
    const className = "TempCode";

    if (className == null) {
      console.log("Error: No class with main method found in your code.");
      setOutput("Error: No class with main method found in your code.");
      return;
    }

    console.log("class name=", className);

    const codepost = convertJavaToJSString(code);
    setRunCodeLoading(true);
    const response = await axiosHandler("post", `question/run/${id}`, {
      language,
      code: codepost,
      className,
    });
    if (response.success == true) {
      setTestCaseResult(response.result);
      toast.success("Output Came", {
        style: {
          border: "1px solid #1BF1A1",
          padding: "16px",
          color: "#1BF1A1",
          backgroundColor: "#0D1418",
        },
        iconTheme: {
          primary: "#1BF1A1",
          secondary: "#0D1418",
        },
      });
    } else {
      toast.error("Sorry couldn't run the test cases", {
        style: {
          border: "1px solid red",
          padding: "16px",
          color: "red",
          backgroundColor: "#0D1418",
        },
        iconTheme: {
          primary: "red",
          secondary: "#0D1418",
        },
      });
    }
    setRunCodeLoading(false);
  };

  const runCode = async () => {
    // console.log(code);
    // const codepost=`${code}`;
    const codepost = convertJavaToJSString(code);
    const className = "TempCode";
    if (className == null) {
      console.log("Error: No class with main method found in your code.");
      setOutput("Error: No class with main method found in your code.");
      return;
    }

    setRunCodeLoading(true);

    const response = await axiosHandler("POST", "compiler/execute", {
      language,
      code: codepost,
      input,
      className,
    });
    if (response.success === true) {
      setOutput(response.output);
      setMetrics({
        time: response.executionTime,
        memory: response.memoryUsed,
      });

      toast.success("Output Came", {
        style: {
          border: "1px solid #1BF1A1",
          padding: "16px",
          color: "#1BF1A1",
          backgroundColor: "#0D1418",
        },
        iconTheme: {
          primary: "#1BF1A1",
          secondary: "#0D1418",
        },
      });
    } else {
      setOutput("Error: " + response.message);
      setMetrics({ time: "", memory: "" });
      toast.error("Error Occured", {
        style: {
          border: "1px solid red",
          padding: "16px",
          color: "red",
          backgroundColor: "#0D1418",
        },
        iconTheme: {
          primary: "red",
          secondary: "#0D1418",
        },
      });
    }
    setRunCodeLoading(false);
  };

  function convertJavaToJSString(javaCode) {
    // Step 1: Remove newlines and excessive whitespace
    const singleLineCode = javaCode.replace(/\s+/g, " ").trim();

    // Step 2: Escape double quotes and backslashes
    const jsCompatibleString = singleLineCode.replace(/\\/g, "\\\\"); // Escape backslashes
    // .replace(/"/g, '\\"');   // Escape double quotes

    return jsCompatibleString;
  }

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
  };

  const getLanguageExtension = (lang) => {
    switch (lang) {
      // case "c":
      //   return cpp();
      // case "cpp":
      //   return cpp();
      case "java":
        return java();
      case "python":
        return python();
      default:
        return java(); // Default to java if no match
    }
  };

  const fetchQuestionDetails = async (id) => {
    setLoading(true);
    if (!id) {
      console.error("No ID provided to fetch question details.");
      return null;
    }

    const response = await axiosHandler(
      "get",
      `question/${id}`
    );
    if (response.success == true) {
      setProblem(response.question);
    } else {
      console.error("Error: ", response.message);
    }
    setLoading(false);
  };

  const changeQuestionView = (value) => {
    setQuestionView(value);
  };

  useEffect(() => {
    fetchQuestionDetails(params.problemid);
  }, []);

  //submissions part
  const [submissions, setSubmissions] = useState([]);
  const putCodeView = (code) => {
    setCode(code);
  };
  const getSubmissions = async () => {
    const response = await axiosHandler(
      "get",
      `http://localhost:3010/api/v1/question/getsubmissions/${params.problemid}`
    );
    console.log(response);
    if (response.success == true) {
      setSubmissions(response.submissions);
    } else {
      console.log(response.message);
    }
  };
  //end

  //disciussion part
  const [comments, setComments] = useState([]);
  const getComments = async () => {
    const response = await axiosHandler(
      "get",
      `http://localhost:3010/api/v1/question/getdiscussions/${params.problemid}`
    );
    console.log(response);
    if (response.success == true) {
      setComments(response.discussions);
    } else {
      console.log(response.message);
    }
  };

  const addComment = async (discussion) => {
    const response = await axiosHandler(
      "post",
      `question/putdiscussion/${params.problemid}`,
      { discussion }
    );
    console.log(response);
    if (response.success == true) {
      getComments();
    } else {
      console.log(response.message);
    }
  };
  //end
  return (
    <>
      <Header />
      {loading === true ? (
        <div className="font-helvetica flex text-2xl text-white px-16 pt-4 pb-3">
          <div className="flex gap-4 items-center">
            Loading{" "}
            <AiOutlineLoading3Quarters className="text-lg loading-spin" />
          </div>
        </div>
      ) : Object.keys(problem).length === 0 ? (
        <div className="font-helvetica flex text-2xl text-white px-16 pt-4 pb-3">
          <div className="flex grow-0 items-center gap-4">
            <NavLink to={`/problemstatements`}>
              <FaArrowCircleLeft className="text-2xl text-primary" />
            </NavLink>
            Sorry could not load the question
          </div>
        </div>
      ) : (
        <div className="h-[84%] font-helvetica flex flex-col gap-4 text-white px-16 pt-4 pb-3">
          <div className="h-[10%] flex gap-8 items-center col-span-2">
            <div className="w-1/2 flex gap-4 items-center">
              <NavLink to={`/problemstatements`}>
                <FaArrowCircleLeft className="text-2xl text-primary" />
              </NavLink>
              <div className={`text-4xl flex items-center gap-4`}>
                {problem.title}{" "}
                <span
                  className={`p-2 rounded text-xs border ${problem.difficulty == "Easy"
                      ? "border-primary"
                      : problem.difficulty == "Medium"
                        ? "border-blue-400"
                        : "border-red-400"
                    }`}>
                  {problem.difficulty}
                </span>
              </div>
            </div>
            <div className="w-1/2 flex items-center justify-between">
              {/* <div className='border border-gray-200 py-1 px-8 rounded-md'>Select</div> */}
              {/* Language Selector */}
              <div className="flex items-center">
                <label htmlFor="language" className="mr-2 text-sm">
                  Select Language :
                </label>
                <CustomDropdown
                  options={options}
                  value={language}
                  onChange={(e) => { setLanguage(e); setCode(boilerplateCode(e)) }}
                />
              </div>
              <div
                className="bg-blue-600 h-10 w-24 flex justify-center items-center rounded-md active:bg-blue-800 cursor-pointer"
                onClick={() => {
                  if (customInput) runCode();
                  else runCodeWithTestCase(problem._id);
                }}>
                {runCodeLoading ? (
                  <AiOutlineLoading3Quarters className="text-lg loading-spin" />
                ) : (
                  "Run Code"
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="h-[90%] flex gap-8">
              <div className="w-1/2 flex flex-col ">
                <div className="relative w-full   rounded-lg">
                  {/* Slider div */}
                  <div
                    className={`absolute bottom-0 h-[4px] bg-green-500 transition-all duration-300 ease-in-out`}
                    style={{
                      width:
                        questionView === "Description"
                          ? "33.33%"
                          : questionView === "Discussion"
                            ? "33.33%"
                            : "33.33%",
                      left:
                        questionView === "Description"
                          ? "0%"
                          : questionView === "Discussion"
                            ? "33.33%"
                            : "66.66%",
                    }}></div>

                  {/* Tabs */}
                  <div className="flex justify-between">
                    <div
                      onClick={() => changeQuestionView("Description")}
                      className={`cursor-pointer px-4 py-2 text-gray-400 text-shadow flex-1 text-center transition-all duration-200 font-bold ${questionView === "Description" ? "text-xl" : ""
                        }`}>
                      Description
                    </div>
                    <div
                      onClick={() => { changeQuestionView("Discussion"); getComments() }}
                      className={`cursor-pointer px-4 py-2 text-gray-400  text-shadow flex-1 text-center transition-all duration-200 font-bold ${questionView === "Discussion" ? "text-xl" : ""
                        }`}>
                      Discussion
                    </div>
                    <div
                      onClick={() => { changeQuestionView("Submission"); getSubmissions() }}
                      className={`cursor-pointer px-4 py-2 text-gray-400 text-shadow flex-1 text-center transition-all duration-200 font-bold ${questionView === "Submission" ? "text-xl" : ""
                        }`}>
                      Submission
                    </div>
                  </div>
                </div>

                {questionView == "Description" && (
                  <div className="w-full flex flex-col text-justify problem-statement">
                    <span className="text-2xl font-semibold mt-2 text-gray-400 font-plex-mono ">
                      Description
                    </span>
                    {problem.description}
                    <span className="text-2xl font-semibold mt-4 text-gray-400 font-plex-mono">
                      Constraints
                    </span>
                    <div className="flex flex-col">
                      {problem.constraints.map((ele, i) => (
                        <div key={i}>
                          {i + 1} {ele}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {questionView == "Submission" && (
                  <div className="w-full flex flex-col text-justify  max-w-4xl mx-auto p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold">
                        Submissions ({submissions.length})
                      </h2>
                    </div>
                    {submissions.length === 0 ? (
                      <p className="text-gray-500">No Submissions Found</p>
                    ) : (
                      submissions.map((subs, index) => {
                        const statusClass = subs.accepted
                          ? "text-green-500"
                          : "text-red-500";
                        const bgColor =
                          index % 2 === 0 ? "bg-gray-800" : "bg-gray-850";

                        return (
                          <div
                            key={index}
                            className={` flex justify-between items-center px-4 py-3 rounded-lg cursor-pointer ${bgColor} text-white`}
                            onClick={() => putCodeView(subs.code)}>
                            <p className={`font-bold ${statusClass}`}>
                              {subs.accepted ? "Accepted" : "Wrong...."}
                            </p>
                            <p className="text-sm font-medium text-gray-400">
                              {subs.language}
                            </p>

                            <p className="text-sm text-gray-400">
                              {new Date(subs.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
                {questionView == "Discussion" && (
                  <div className="w-full flex flex-col text-justify">
                    <Discussion comments={comments} addComment={addComment} />
                  </div>
                )}
              </div>
              {/* <textarea className="vscode-textarea" placeholder="Start typing..."></textarea> */}
              <CodingPlayground
                code={code}
                setCode={setCode}
                language={language}
                input={input}
                setInput={setInput}
                output={output}
                metrics={metrics}
                getLanguageExtension={getLanguageExtension}
                customInput={customInput}
                setCustomInput={setCustomInput}
                testCasesResult={testCasesResult}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Problem;
