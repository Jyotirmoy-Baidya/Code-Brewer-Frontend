import React, { useEffect, useState } from 'react'
import ActiveContestHeader from '../components/basic/ActiveContestHeader'
import { FaArrowCircleRight } from 'react-icons/fa'
import { NavLink } from 'react-router-dom';
import { MdOutlineLeaderboard } from 'react-icons/md';
import Podium from '../components/podium/Podium';
import { GiCrossMark } from 'react-icons/gi';

const contest = {
    name: "Contest A",
    code: 'WEQXY5I',
    startTime: "2024-08-09 18:10:00",
    endTime: "2024-08-09 18:30:00"
}

const players = [
    { name: 'Alice', q: 5 },
    { name: 'Bob', q: 4 },
    { name: 'Charlie', q: 3 },
]

const usersArray = [
    { name: 'Alice', questionSolved: 8 },
    { name: 'Bob', questionSolved: 7 },
    { name: 'Charlie', questionSolved: 6 },
    { name: 'David', questionSolved: 5 },
    { name: 'Eve', questionSolved: 5 },
    { name: 'Frank', questionSolved: 4 },
    { name: 'Grace', questionSolved: 3 },
    { name: 'Hank', questionSolved: 2 },
    { name: 'Ivy', questionSolved: 2 },
    { name: 'Jyoti', questionSolved: 1 }
];



const dsaProblems = [
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


const endTime = "2024-08-10 22:30:00"

const ActiveContest = () => {
    const [leaderBoardPopUp, setLeaderBoardPopUp] = useState(false);

    const calculateTimeLeft = () => {
        const difference = new Date(endTime) - new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());


    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(timer);
    }, [endTime]);

    return (
        <>
            <ActiveContestHeader />
            <div className="relative max-h-[84%] font-helvetica flex flex-col gap-4 text-white px-16 pt-7 pb-3">
                <div className='flex justify-between'>
                    <div className='text-4xl font-bold tracking-wider text-gray-300'>Contest A</div>
                    <div className='flex gap-3 items-end'>
                        <div className='tracking-wide'>Time Left :</div>
                        <div className='text-3xl text-primary font-bold tracking-widest'>{timeLeft.hours}<span className='text-xl'>hr</span> {timeLeft.minutes}<span className='text-xl'>min</span> {timeLeft.seconds}<span className='text-xl'>sec</span></div>
                    </div>
                </div>
                <hr className='border-[0.2px]' />
                <div className='flex flex-col py-4 gap-5 w-1/2 overflow-scroll design-scrollbar'>
                    {
                        dsaProblems.map((ele, i) => (
                            <NavLink to={`/contest/problem/${contest.code}/${ele.problemId}`} key={i} className=' border-l border-r border-primary h-24 rounded-lg flex items-center justify-between px-4 py-4 shadow shadow-primary active:shadow-none'>
                                <div className=' flex flex-col gap-2'>
                                    <div className='text-lg font-bold tracking-wider uppercase'>{ele.name}</div>
                                    <div className={`text-xs ${ele.difficulty == 'Easy' ? 'text-primary' : ele.difficulty == 'Medium' ? 'text-blue-400' : 'text-red-400'} flex`}>{ele.difficulty}</div>
                                </div>
                                <FaArrowCircleRight className='text-3xl text-primary' />
                            </NavLink>
                        ))
                    }

                </div>
                <div className='w-[45%] flex flex-col items-center absolute bottom-10 right-10'>
                    {
                        usersArray.length > 0 && <Podium players={usersArray} />
                    }
                    <button className='mt-10 py-4 px-4 rounded-md bg-cyan-950 shadow shadow-cyan-100 text-lg tracking-wider items-center  flex active:shadow-none' onClick={() => setLeaderBoardPopUp(true)}>Show Leaderboard <MdOutlineLeaderboard className='text-primary text-xl ms-1' /></button>
                </div>
                {
                    leaderBoardPopUp &&
                    <>
                        <div className='z-20 absolute px-2 bottom-12 right-[10%] h-[70%] bg-primary-black w-[30%] flex flex-col'>
                            <div className='p-2 text-2xl tracking-widest text-gray-300 uppercase flex items-end'><span className='text-4xl text-primary'>L</span>eaderboard <GiCrossMark className='my-auto ms-auto' onClick={() => setLeaderBoardPopUp(false)} /></div>
                            <hr />
                            <div className='grow flex flex-col gap-2 my-2 overflow-scroll design-scrollbar'>
                                {
                                    usersArray.map((ele, i) => (
                                        <div key={i} className='flex py-4 px-6 rounded-md border cursor-pointer uppercase  items-center border-slate-600 bg-slate-900 '>
                                            <span className='me-2 text-yellow-400 text-xl '>{i + 1}</span>
                                            <div className='font-semibold tracking-wider text-xl'>{ele.name}</div>
                                            <span className='ms-auto capitalize'>{ele.questionSolved} solved</span>
                                        </div>
                                    ))
                                }


                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default ActiveContest