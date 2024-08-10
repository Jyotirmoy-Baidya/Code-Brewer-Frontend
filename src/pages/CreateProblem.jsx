import React, { useState } from 'react'
import Header from '../components/basic/Header'
import { NavLink } from 'react-router-dom';
import { FaArrowCircleLeft, FaEdit } from 'react-icons/fa';
import { ImBin2 } from 'react-icons/im';
import axiosInstance from '../utils/AxiosInstance';

const CreateProblem = () => {
    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [statement, setStatement] = useState("");
    const [constraints, setConstraints] = useState("");
    const [testCases, setTestCases] = useState([{ input: "", output: "" }])
    const [editTestcase, setEditTestcase] = useState(0);
    const [author, setAuthor] = useState("Jyoti");

    //Add new testcase
    const addTestCases = () => {
        setTestCases(testCases.concat({ input: "" }))
    }

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
        console.log("check");
        // Validation: Check if any field is empty
        if (
            !title.trim() ||
            !difficulty.trim() ||
            !statement.trim() ||
            !constraints.trim() ||
            testCases.some(tc => !tc.input.trim() || !tc.output.trim()) ||
            !author.trim()
        ) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            console.log({
                title,
                description: statement,  // Assuming description corresponds to statement
                difficulty,
                constraints,
                testCases,
                author,
            });
            const response = await axiosInstance.post('http://localhost:3010/api/v1/question/add', {
                title,
                description: statement,  // Assuming description corresponds to statement
                difficulty,
                constraints,
                testCases,
                author,
            });
            console.log(response);
            alert('Question added successfully!');
            // Optionally clear form fields or handle success
        } catch (error) {
            console.error('Error adding question:', error);
            alert('Failed to add question.');
        }
    };

    return (
        <>
            <Header />
            <div className="max-h-[84%] font-helvetica flex flex-col gap-4 text-white px-16 pt-7 pb-3">

                <div className='flex items-center gap-4'>
                    <NavLink to={`/problemstatements`}><FaArrowCircleLeft className='text-2xl text-primary' /></NavLink>
                    <div className='text-4xl'>Create Problem</div>
                    <button className='text-lg bg-yellow-400 font-plex-mono px-4 py-2 text-black ms-auto rounded-md' onClick={(e) => handleSubmit(e)}>Create Problem</button>
                </div>

                {/* Title and difficulty  */}
                <div className='grow flex flex-col overflow-scroll design-scrollbar'>
                    <div className='w-full flex gap-10'>
                        <div className='w-1/2 flex flex-col'>
                            <div className='text-2xl mb-2'>Title</div>
                            <input type="text" className='py-2 px-2 rounded-sm bg-transparent outline-none border border-gray-500  focus:border-primary focus:shadow focus:shadow-primary' placeholder='Title' onChange={(e) => setTitle(e.target.value)} value={`${title}`} />
                        </div>
                        <div className='flex flex-col'>
                            <div className='text-2xl mb-2'>Set Difficulty</div>
                            <div className='ms-auto flex gap-4 mt-2 select-difficulty'>
                                <div className={`cursor-pointer rounded py-1 px-4 flex justify-center items-center border border-primary ${difficulty === 'Easy' ? 'bg-primary text-black' : 'bg-transparent'}`} onClick={() => setDifficulty("Easy")}>Easy</div>
                                <div className={`cursor-pointer rounded py-1 px-4 flex justify-center items-center border border-blue-400 ${difficulty === 'Medium' ? 'bg-blue-400 text-black' : 'bg-transparent'}`} onClick={() => setDifficulty("Medium")}>Medium</div>
                                <div className={`cursor-pointer rounded py-1 px-4 flex justify-center items-center border border-red-400 ${difficulty === 'Hard' ? 'bg-red-400 text-black' : 'bg-transparent'}`} onClick={() => setDifficulty("Hard")}>Hard</div>
                            </div>
                        </div>
                    </div>

                    {/* problem statement and testcases  */}
                    <div className='grid grid-cols-2 gap-4 mt-7'>

                        {/* Definting the problem statement and constraint */}
                        <div className='w-full'>
                            {/* Problem statement  */}
                            <div className='text-2xl mb-2'>Problem Statement</div>
                            <textarea name="" id="" className='w-full overflow-scroll bg-primary-black p-4 design-scrollbar outline-none h-fit max-h-screen min-h-64 text-base focus:shadow focus:shadow-primary tracking-wider' onChange={(e) => setStatement(e.target.value)} value={statement}></textarea>

                            {/* Constraint  */}
                            <div className='text-2xl mt-4 mb-2'>Constraints</div>
                            <textarea name="" id="" className='w-full overflow-scroll bg-primary-black p-4 design-scrollbar outline-none min-h-64 text-base focus:shadow focus:shadow-primary tracking-wider' onChange={(e) => setConstraints(e.target.value)} value={constraints}></textarea>
                        </div>

                        {/* Testcases section  */}
                        <div className='flex flex-col test-case'>
                            <div className='text-2xl mb-2'>Testcases</div>

                            {/* testcases list  */}
                            <div className='grid grid-cols-2 gap-2'>
                                {
                                    testCases.map((ele, i) => (
                                        <React.Fragment key={i}>

                                            <div className={`flex rounded items-center justify-between px-4 h-20 border border-gray-600 bg-primary bg-opacity-10 text-gray-400 ${editTestcase === i + 1 && 'col-span-2 border-primary'} text-2xl`} >
                                                <div>Testcase {i + 1}</div>
                                                <div className='flex gap-4'>

                                                    <div
                                                        className={`text-lg hover:text-primary ${editTestcase == i + 1 && 'text-primary'}`}
                                                        onClick={() => setEditTestcase(editTestcase == 0 ? (i + 1) : (0))}>
                                                        <FaEdit />
                                                    </div>
                                                    <div className='text-lg hover:text-red-600' onClick={() => deleteTestCase(i)}><ImBin2 /></div>
                                                </div>
                                            </div>
                                            {
                                                editTestcase === i + 1 &&
                                                <div className='col-span-2 flex gap-3 mb-14 relative'>
                                                    <div className='p-3 bg-primary-black w-1/2'>
                                                        <div className='text-sm text-gray-400'><span className='text-lg text-white'>Input</span> for testcase {i + 1}</div>
                                                        <hr className='mb-2' />
                                                        <textarea name="" id="" className='w-full focus:bg-gray-900 bg-gray-950 min-h-72 resize-none overflow-scroll design-scrollbar p-1' placeholder={`Enter input for testcase ${i + 1}`} onChange={(e) => updateTestCaseInput(i, e.target.value)} value={testCases[i].input}>
                                                        </textarea>

                                                    </div>
                                                    <div className='p-3 bg-primary-black w-1/2'>
                                                        <div className='text-sm text-gray-400'><span className='text-lg text-white tracking-wider'>Output</span> for testcase {i + 1}</div>
                                                        <hr className='mb-2' />
                                                        <textarea name="" id="" className='w-full focus:bg-gray-900 bg-gray-950 min-h-72 resize-none overflow-scroll design-scrollbar p-1' placeholder={`Enter Output for testcase ${i + 1}`} onChange={(e) => updateTestCaseOutput(i, e.target.value)} value={testCases[i].output}>
                                                        </textarea>

                                                    </div>
                                                    <div className='absolute -bottom-10 right-0 flex justify-end'>
                                                        <button className='bg-red-500 font-plex-mono tracking-wide py-2 px-4 text-end' onClick={() => setEditTestcase(0)}>Close</button>
                                                    </div>

                                                </div>
                                            }
                                        </React.Fragment>
                                    ))
                                }
                            </div>

                            {/* add testcase  */}
                            <div className='bg-primary w-36 h-12 font-plex-mono text-black flex items-center justify-center mt-5 rounded-full' onClick={() => addTestCases()}>Add Testcase</div>
                        </div >
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateProblem