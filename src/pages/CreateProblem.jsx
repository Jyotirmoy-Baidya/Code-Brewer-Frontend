import React, { useState } from 'react'
import Header from '../components/basic/Header'
import { NavLink } from 'react-router-dom';
import { FaArrowCircleLeft, FaEdit } from 'react-icons/fa';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { ImBin2 } from 'react-icons/im';
import Popup from 'reactjs-popup';

const CreateProblem = () => {
    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [statement, setStatement] = useState("");
    const [testCases, setTestCases] = useState([{ input: "" }])

    const [editTestcase, setEditTestcase] = useState(0);

    const addTestCases = () => {
        setTestCases(testCases.concat({ input: "" }))
    }

    const deleteTestCase = (indexToDelete) => {
        setTestCases((prevTestCases) =>
            prevTestCases.filter((_, index) => index !== indexToDelete)
        );
    };

    const updateTestCaseInput = (index, newInput) => {
        setTestCases((prevTestCases) => {
            return prevTestCases.map((testCase, i) =>
                i === index ? { ...testCase, input: newInput } : testCase
            );
        });
    };


    return (
        <>
            <Header />
            <div className="max-h-[84%] font-helvetica flex flex-col gap-4 text-white px-16 pt-7 pb-3">
                <div className='flex items-center gap-4'>
                    <NavLink to={`/problemstatements`}><FaArrowCircleLeft className='text-2xl text-primary' /></NavLink>
                    <div className='text-4xl'>Create Problem</div>
                </div>
                <div className='grow flex flex-col overflow-scroll design-scrollbar'>
                    <div className='text-2xl mb-2'>Title</div>
                    <input type="text" className='py-2 px-2 rounded-sm bg-transparent outline-none border border-gray-500  focus:border-primary focus:shadow focus:shadow-primary' placeholder='Title' onChange={(e) => setTitle(e.target.value)} value={title} />

                    <div className='text-2xl mt-6 mb-2'>Set Difficulty</div>
                    <div className='flex gap-4 mt-2 select-difficulty'>
                        <div className={`cursor-pointer rounded py-1 px-4 flex justify-center items-center border border-primary ${difficulty === 'Easy' ? 'bg-primary text-black' : 'bg-transparent'}`} onClick={() => setDifficulty("Easy")}>Easy</div>
                        <div className={`cursor-pointer rounded py-1 px-4 flex justify-center items-center border border-blue-400 ${difficulty === 'Medium' ? 'bg-blue-400 text-black' : 'bg-transparent'}`} onClick={() => setDifficulty("Medium")}>Medium</div>
                        <div className={`cursor-pointer rounded py-1 px-4 flex justify-center items-center border border-red-400 ${difficulty === 'Hard' ? 'bg-red-400 text-black' : 'bg-transparent'}`} onClick={() => setDifficulty("Hard")}>Hard</div>
                    </div>
                    <div className='grid grid-cols-2 gap-4 mt-7'>
                        <div className='w-full'>
                            <div className='text-2xl mb-2'>Problem Statement</div>
                            <textarea name="" id="" className='w-full overflow-scroll bg-primary-black p-4 design-scrollbar outline-none resize-none min-h-screen text-base focus:shadow focus:shadow-primary tracking-wider' onChange={(e) => setStatement(e.target.value)} value={statement}></textarea>
                        </div>
                        <div className='flex flex-col test-case'>
                            <div className='text-2xl mb-2'>Testcases</div>
                            <div className='grid grid-cols-2 gap-2'>
                                {
                                    testCases.map((ele, i) => (
                                        <>

                                            <div className={`flex rounded items-center justify-between px-4 h-20 border border-gray-600 bg-primary bg-opacity-10 text-gray-400 ${editTestcase === i + 1 && 'col-span-2 border-primary'} text-2xl`} key={i}>
                                                <div>Testcase {i + 1}</div>
                                                <div className='flex gap-4'>

                                                    <div className={`text-lg hover:text-primary ${editTestcase == i + 1 && 'text-primary'}`} onClick={() => setEditTestcase(i + 1)}><FaEdit /></div>
                                                    <div className='text-lg hover:text-red-600' onClick={() => deleteTestCase(i)}><ImBin2 /></div>
                                                </div>
                                            </div>
                                            {
                                                editTestcase === i + 1 &&
                                                <div className='col-span-2 mb-5'>
                                                    <textarea name="" id="" className='w-full bg-primary-black min-h-64 resize-none overflow-scroll design-scrollbar' onChange={(e) => updateTestCaseInput(i, e.target.value)} value={testCases[i].input}>
                                                    </textarea>
                                                    <div className='flex justify-end'>
                                                        <button className='bg-red-500 font-plex-mono tracking-wide py-2 px-4 text-end' onClick={() => setEditTestcase(0)}>Close</button>
                                                    </div>
                                                </div>
                                            }
                                        </>
                                    ))
                                }
                            </div>
                            <div className='bg-primary w-36 h-12 font-plex-mono text-black flex items-center justify-center mt-5 rounded-full' onClick={() => addTestCases()}>Add Testcase</div>
                        </div >
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateProblem