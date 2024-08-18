import React, { useState } from "react";
import Header from "../components/basic/Header";
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowCircleLeft, FaEdit } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import axiosInstance from "../utils/AxiosInstance";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import NavigateToContest from "../components/NavigateToContest";
import axiosHandler from "../utils/AxiosInstance";

const CreateProblem = () => {
  //Defining States
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [statement, setStatement] = useState("");
  const [constraints, setConstraints] = useState("");
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);
  const [editTestcase, setEditTestcase] = useState(0);
  const [author, setAuthor] = useState("Jyoti");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [category, setCategory] = useState("basic");

  const categories = [
    { name: "basic", points: 0 },
    { name: "array", points: 3 },
    { name: "matrix", points: 6 },
    { name: "linked list", points: 9 },
    { name: "tree", points: 12 },
    { name: "graph", points: 15 },
    { name: "hash table", points: 18 },
    { name: "set", points: 21 },
    { name: "map", points: 24 },
    { name: "recursion", points: 27 },
    { name: "backtracking", points: 30 },
    { name: "divide and conquer", points: 33 },
    { name: "greedy", points: 39 },
    { name: "dynamic programming", points: 42 },
    { name: "trie", points: 45 },
    { name: "misc", points: 50 },
  ];
  //Add new testcase
  const addTestCases = () => {
    setTestCases(testCases.concat({ input: "" }));
  };

  //Delete the testcase
  const deleteTestCase = (indexToDelete) => {
    setTestCases((prevTestCases) =>
      prevTestCases.filter((_, index) => index !== indexToDelete)
    );
  };

  //Update the test case input
  const updateTestCaseInput = (index, newInput) => {
    setTestCases((prevTestCases) => {
      return prevTestCases.map((testCase, i) =>
        i === index ? { ...testCase, input: newInput } : testCase
      );
    });
  };

  //Update the test case output
  const updateTestCaseOutput = (index, newOutput) => {
    setTestCases((prevTestCases) => {
      return prevTestCases.map((testCase, i) =>
        i === index ? { ...testCase, output: newOutput } : testCase
      );
    });
  };

  //Saving the problem to the database
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Validation: Check if any field is empty
    if (
      !title.trim() ||
      !difficulty.trim() ||
      !statement.trim() ||
      !constraints.trim() ||
      testCases.some((tc) => !tc.input.trim() || !tc.output.trim()) ||
      !author.trim()
    ) {
      toast.error("Please fill all the fields.", {
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
      return null;
    }
    // console.log("category = ",)
    const categoriesObject=categories.filter((ele)=>ele.name == category)[0];
    setLoading(true);
    const response = await axiosHandler(
      "post",
      "http://localhost:3010/api/v1/question/add",
      {
        title,
        description: statement,
        difficulty,
        constraints,
        testCases,
        author,
        categories:categoriesObject
      }
    );
    if (response.success == true) {
      toast.success("Question added successfully!", {
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
      navigate("/problemstatements");
    } else {
      toast.error("Failed to create the problem", {
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
  };

  return (
    <>
      <NavigateToContest />
      <Header />
      <div className="max-h-[84%] font-helvetica flex flex-col gap-4 text-white px-16 pt-7 pb-3">
        <div className="flex items-center gap-4">
          <NavLink to={`/problemstatements`}>
            <FaArrowCircleLeft className="text-2xl text-primary" />
          </NavLink>
          <div className="text-4xl">Create Problem</div>
          <button
            className="text-lg w-44 flex justify-center items-center h-12 bg-yellow-400 font-plex-mono px-4 py-2 text-black ms-auto rounded-md"
            onClick={(e) => handleSubmit(e)}>
            {loading ? (
              <AiOutlineLoading3Quarters className="text-lg loading-spin" />
            ) : (
              "Create Problem"
            )}
          </button>
        </div>

        {/* Title and difficulty  */}
        <div className="grow flex flex-col overflow-scroll design-scrollbar">
          <div className="w-full flex gap-10">
            <div className="w-1/2 flex flex-col">
              <div className="text-2xl mb-2">Title</div>
              <input
                type="text"
                className="py-2 px-2 rounded-sm bg-transparent outline-none border border-gray-500  focus:border-primary focus:shadow focus:shadow-primary"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                value={`${title}`}
              />
            </div>
            <div className="flex flex-col">
              <div className="text-2xl mb-2">Set Difficulty</div>
              <div className="ms-auto flex gap-4 mt-2 select-difficulty">
                <div
                  className={`cursor-pointer rounded py-1 px-4 flex justify-center items-center border border-primary ${
                    difficulty === "Easy"
                      ? "bg-primary text-black"
                      : "bg-transparent"
                  }`}
                  onClick={() => setDifficulty("Easy")}>
                  Easy
                </div>
                <div
                  className={`cursor-pointer rounded py-1 px-4 flex justify-center items-center border border-blue-400 ${
                    difficulty === "Medium"
                      ? "bg-blue-400 text-black"
                      : "bg-transparent"
                  }`}
                  onClick={() => setDifficulty("Medium")}>
                  Medium
                </div>
                <div
                  className={`cursor-pointer rounded py-1 px-4 flex justify-center items-center border border-red-400 ${
                    difficulty === "Hard"
                      ? "bg-red-400 text-black"
                      : "bg-transparent"
                  }`}
                  onClick={() => setDifficulty("Hard")}>
                  Hard
                </div>
              </div>
            </div>

            <div className="flex flex-col relative font-helvetica">
              <div className="text-2xl mb-2">Set Category</div>
              <select
                className="py-2 px-2 rounded-sm bg-transparent text-white outline-none border border-primary focus:border-primary focus:shadow focus:shadow-primary appearance-none pr-10"
                style={{ backgroundColor: "#0D1418", color: "#FFFFFF" }}
                onChange={(e) => setCategory(e.target.value.toLowerCase())}>
                {/* <option value="" disabled selected>
                  Select Category
                </option> */}
                {categories.map((category, index) => (
                  <option
                    key={index}
                    value={category.name}
                    className="bg-[#0D1418] text-white">
                    {category.name.toUpperCase()}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 top-[50%] right-0 flex items-center px-2 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* problem statement and testcases  */}
          <div className="grid grid-cols-2 gap-4 mt-7">
            {/* Definting the problem statement and constraint */}
            <div className="w-full">
              {/* Problem statement  */}
              <div className="text-2xl mb-2">Problem Statement</div>
              <textarea
                name=""
                id=""
                className="w-full overflow-scroll bg-primary-black p-4 design-scrollbar outline-none h-fit max-h-screen min-h-64 text-base focus:shadow focus:shadow-primary tracking-wider"
                onChange={(e) => setStatement(e.target.value)}
                value={statement}></textarea>

              {/* Constraint  */}
              <div className="text-2xl mt-4 mb-2">Constraints</div>
              <textarea
                name=""
                id=""
                className="w-full overflow-scroll bg-primary-black p-4 design-scrollbar outline-none min-h-64 text-base focus:shadow focus:shadow-primary tracking-wider"
                onChange={(e) => setConstraints(e.target.value)}
                value={constraints}></textarea>
            </div>

            {/* Testcases section  */}
            <div className="flex flex-col test-case">
              <div className="text-2xl mb-2">Testcases</div>

              {/* testcases list  */}
              <div className="grid grid-cols-2 gap-2">
                {testCases.map((ele, i) => (
                  <React.Fragment key={i}>
                    <div
                      className={`flex rounded items-center justify-between px-4 h-20 border border-gray-600 bg-primary bg-opacity-10 text-gray-400 ${
                        editTestcase === i + 1 && "col-span-2 border-primary"
                      } text-2xl`}>
                      <div>Testcase {i + 1}</div>
                      <div className="flex gap-4">
                        <div
                          className={`text-lg hover:text-primary ${
                            editTestcase == i + 1 && "text-primary"
                          }`}
                          onClick={() =>
                            setEditTestcase(editTestcase == 0 ? i + 1 : 0)
                          }>
                          <FaEdit />
                        </div>
                        <div
                          className="text-lg hover:text-red-600"
                          onClick={() => deleteTestCase(i)}>
                          <ImBin2 />
                        </div>
                      </div>
                    </div>
                    {editTestcase === i + 1 && (
                      <div className="col-span-2 flex gap-3 mb-14 relative">
                        <div className="p-3 bg-primary-black w-1/2">
                          <div className="text-sm text-gray-400">
                            <span className="text-lg text-white">Input</span>{" "}
                            for testcase {i + 1}
                          </div>
                          <hr className="mb-2" />
                          <textarea
                            name=""
                            id=""
                            className="w-full focus:bg-gray-900 bg-gray-950 min-h-72 resize-none overflow-scroll design-scrollbar p-1"
                            placeholder={`Enter input for testcase ${i + 1}`}
                            onChange={(e) =>
                              updateTestCaseInput(i, e.target.value)
                            }
                            value={testCases[i].input}></textarea>
                        </div>
                        <div className="p-3 bg-primary-black w-1/2">
                          <div className="text-sm text-gray-400">
                            <span className="text-lg text-white tracking-wider">
                              Output
                            </span>{" "}
                            for testcase {i + 1}
                          </div>
                          <hr className="mb-2" />
                          <textarea
                            name=""
                            id=""
                            className="w-full focus:bg-gray-900 bg-gray-950 min-h-72 resize-none overflow-scroll design-scrollbar p-1"
                            placeholder={`Enter Output for testcase ${i + 1}`}
                            onChange={(e) =>
                              updateTestCaseOutput(i, e.target.value)
                            }
                            value={testCases[i].output}></textarea>
                        </div>
                        <div className="absolute -bottom-10 right-0 flex justify-end">
                          <button
                            className="bg-red-500 font-plex-mono tracking-wide py-2 px-4 text-end"
                            onClick={() => setEditTestcase(0)}>
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* add testcase  */}
              <div
                className="bg-primary w-36 h-12 font-plex-mono text-black flex items-center justify-center mt-5 rounded-full"
                onClick={() => addTestCases()}>
                Add Testcase
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProblem;
