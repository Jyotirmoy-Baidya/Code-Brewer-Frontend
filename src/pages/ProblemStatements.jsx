import React, { useState } from 'react'
import Header from "../components/basic/Header"
import { IoSearch } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { FaArrowCircleRight } from 'react-icons/fa';

const problemstatements = [
    {
        name: "Maximum Sum",
        difficulty: "Medium",
        problemId: 101
    },
    {
        name: "Binary Tree Inorder Traversal",
        difficulty: "Easy",
        problemId: 102
    },
    {
        name: "Longest Substring Without Repeating Characters",
        difficulty: "Hard",
        problemId: 103
    },
    {
        name: "Merge Two Sorted Lists",
        difficulty: "Easy",
        problemId: 104
    },
    {
        name: "Kth Largest Element in an Array",
        difficulty: "Medium",
        problemId: 105
    }
];


const ProblemStatements = () => {
    const [search, setSearch] = useState("");
    return (
        <>
            <Header />
            <div className="max-h-[84%] flex flex-col gap-4 text-white px-16 pt-7 pb-3">
                <div className='flex gap-4 justify-center'>
                    <div className="flex gap-4 w-1/2">
                        <input type="text" className='grow px-4 py-2 rounded-md text-lg uppercase tracking-wider outline-none border border-white focus:border-primary bg-transparent text-primary' placeholder='Search Problems' onChange={(e) => setSearch(e.target.value)} value={search} />
                        <button className='text-primary text-2xl'><IoSearch /></button>
                    </div>
                    <div className="flex items-center justify-end w-1/2">
                        <NavLink to="/createproblem" className="bg-blue-500 py-2 px-4 rounded-md text-black font-plex-mono">Create Problem</NavLink>
                    </div>
                </div>
                <hr />
                <div className="p-2 grow grid grid-cols-2 gap-10 overflow-scroll hide-scrollbar contest-list">
                    {
                        problemstatements.map((problem, i) => {
                            if (problem.name.toUpperCase().includes(search.toUpperCase()))
                                return (
                                    <NavLink to={`/problem/${problem.problemId}`} key={i} className=' border-l border-r border-primary h-24 rounded-lg flex items-center justify-between px-4 py-4 shadow shadow-primary active:shadow-none'>
                                        <div className=' flex flex-col gap-2'>
                                            <div className='text-lg font-bold tracking-wider uppercase'>{problem.name}</div>
                                            <div className={`text-xs ${problem.difficulty == 'Easy' ? 'text-primary' : problem.difficulty == 'Medium' ? 'text-blue-400' : 'text-red-400'} flex`}>{problem.difficulty}</div>
                                        </div>
                                        <FaArrowCircleRight className='text-3xl text-primary' />
                                    </NavLink>
                                )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default ProblemStatements