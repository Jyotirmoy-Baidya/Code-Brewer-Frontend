import React, { useEffect, useState } from 'react'
import ActiveContestHeader from '../components/basic/ActiveContestHeader'
import { FaArrowCircleRight } from 'react-icons/fa'
import { NavLink } from 'react-router-dom';

const contest = {
    name: "Contest A",
    code: 'WEQXY5I',
    startTime: "2024-08-09 18:10:00",
    endTime: "2024-08-09 18:30:00"
}

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


const endTime = "2024-08-09 22:30:00"

const ActiveContest = () => {
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
            <div className="max-h-[84%] font-helvetica flex flex-col gap-4 text-white px-16 pt-7 pb-3">
                <div className='flex justify-between'>
                    <div className='text-4xl font-bold tracking-wider text-gray-300'>Contest A</div>
                    <div className='flex gap-3 items-end'>
                        <div className='tracking-wide'>Time Left :</div>
                        <div className='text-3xl text-primary font-bold tracking-widest'>{timeLeft.hours}<span className='text-xl'>hr</span> {timeLeft.minutes}<span className='text-xl'>min</span> {timeLeft.seconds}<span className='text-xl'>sec</span></div>
                    </div>
                </div>
                <hr className='border-[0.2px]' />
                <div className='flex flex-col py-4 gap-5 w-1/2 overflow-scroll hide-scrollbar'>
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
            </div>
        </>
    )
}

export default ActiveContest