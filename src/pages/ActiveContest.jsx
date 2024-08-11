import React, { useEffect, useState } from 'react'
import ActiveContestHeader from '../components/basic/ActiveContestHeader'
import { FaArrowCircleRight } from 'react-icons/fa'
import { NavLink, useParams } from 'react-router-dom';
import { MdOutlineLeaderboard } from 'react-icons/md';
import Podium from '../components/podium/Podium';
import { GiCrossMark } from 'react-icons/gi';
import axiosInstance from '../utils/AxiosInstance';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Timer from '../components/Timer';
import { TiTickOutline } from 'react-icons/ti';



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


const ActiveContest = () => {
    const params = useParams();
    console.log(params);
    const [leaderBoardPopUp, setLeaderBoardPopUp] = useState(false);
    const [contest, setContest] = useState({});
    const [loading, setLoading] = useState(false);

    const [solvedQuestionsId, setSolvedQuestionsId] = useState([]);


    //Fetch the contest details
    const fetchContestDetails = async () => {
        setLoading(true);
        try {
            // Send GET request to fetch contest details using the contest code
            const response = await axiosInstance.get(`http://localhost:3010/api/v1/contest/get/${params.code}`);

            // Handle the response (e.g., log the details or return them)
            console.log('Contest details fetched successfully:', response.data);

            // Return the contest details
            setContest(response.data);
        } catch (error) {
            // Handle any errors (e.g., show error message)
            console.error('Error fetching contest details:', error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    //Get User Data
    const getUserData = async () => {
        try {
            const response = await axiosInstance.get("http://localhost:3010/api/v1/contest/getuser", {
                withCredentials: true
            });
            console.log('User data fetched successfully:', response.data.findUser.questions);
            setSolvedQuestionsId(response.data.findUser.questions);
        }
        catch (error) {
            console.log("Error fetching user data" + error);
        }
    }

    

    useEffect(() => {
        fetchContestDetails();
        getUserData();
    }, [])

    return (
        <>
            <ActiveContestHeader endTime={contest.endTime}/>
            {
                loading ?
                    <div className='font-helvetica flex text-2xl text-white px-16 pt-4 pb-3'>
                        <div className='flex gap-4 items-center'>Loading <AiOutlineLoading3Quarters className='text-lg loading-spin' /></div>
                    </div> :
                    <div className="relative h-[84%] max-h-[84%] font-helvetica flex flex-col gap-4 text-white px-16 pt-7 pb-3">
                        <div className='flex justify-between'>
                            <div className='text-4xl font-bold tracking-wider text-gray-300'>{contest.title}</div>
                            <div className='flex gap-3 items-end'>
                                <Timer endTime={contest.endTime} />
                            </div>
                        </div>
                        <hr className='border-[0.2px]' />
                        <div className='flex flex-col py-4 gap-5 w-1/2 overflow-scroll design-scrollbar'>
                        {
                            contest?.questions?.filter(
                                (problem) => solvedQuestionsId.includes(problem._id))
                                .map((ele, i) => {
                                    if (new Date(contest.endTime) < new Date()) {
                                        {/* if quiz ended return div and can't redirect to the problems anymore */ }
                                        return (<div key={i} className=' border-l bg-primary-black border-r border-primary h-24 rounded-lg flex items-center justify-between px-4 py-4 shadow shadow-primary active:shadow-none'>
                                            <div className=' flex flex-col gap-2'>
                                                <div className='text-lg font-bold tracking-wider uppercase'>{ele.title}</div>
                                                <div className={`text-xs ${ele.difficulty == 'Easy' ? 'text-primary' : ele.difficulty == 'Medium' ? 'text-blue-400' : 'text-red-400'} flex`}>{ele.difficulty}</div>
                                            </div>
                                            <TiTickOutline className='text-3xl text-primary' />
                                        </div>)
                                    }
                                    else
                                        return (
                                            <NavLink to={`/contest/problem/${params.code}/${ele._id}`} key={i} className=' border-l border-r border-primary h-24 rounded-lg flex items-center justify-between px-4 py-4 shadow shadow-primary active:shadow-none'>
                                                <div className='flex flex-col gap-2'>
                                                    <div className='text-lg font-bold tracking-wider uppercase'>{ele.title}</div>
                                                    <div className={`text-xs ${ele.difficulty == 'Easy' ? 'text-primary' : ele.difficulty == 'Medium' ? 'text-blue-400' : 'text-red-400'} flex`}>{ele.difficulty}</div>
                                                </div>
                                                <TiTickOutline className='text-3xl text-primary' />
                                            </NavLink>
                                        )
                                })

                        }
                            {
                                contest?.questions?.filter(
                                    (problem) => !solvedQuestionsId.includes(problem._id))
                                    .map((ele, i) => {
                                        if (new Date(contest.endTime) < new Date()) {
                                            {/* if quiz ended return div and can't redirect to the problems anymore */ }
                                            return (<div key={i} className=' border-l bg-primary-black border-r border-primary h-24 rounded-lg flex items-center justify-between px-4 py-4 shadow shadow-primary active:shadow-none'>
                                                <div className=' flex flex-col gap-2'>
                                                    <div className='text-lg font-bold tracking-wider uppercase'>{ele.title}</div>
                                                    <div className={`text-xs ${ele.difficulty == 'Easy' ? 'text-primary' : ele.difficulty == 'Medium' ? 'text-blue-400' : 'text-red-400'} flex`}>{ele.difficulty}</div>
                                                </div>
                                                <FaArrowCircleRight className='text-3xl text-blue-500' />
                                            </div>)
                                        }
                                        else
                                            return (
                                                <NavLink to={`/contest/problem/${params.code}/${ele._id}`} key={i} className=' border-l border-r border-primary h-24 rounded-lg flex items-center justify-between px-4 py-4 shadow shadow-primary active:shadow-none'>
                                                    <div className=' flex flex-col gap-2'>
                                                        <div className='text-lg font-bold tracking-wider uppercase'>{ele.title}</div>
                                                        <div className={`text-xs ${ele.difficulty == 'Easy' ? 'text-primary' : ele.difficulty == 'Medium' ? 'text-blue-400' : 'text-red-400'} flex`}>{ele.difficulty}</div>
                                                    </div>
                                                    <FaArrowCircleRight className='text-3xl text-primary' />
                                                </NavLink>
                                            )
                                    })
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
            }
        </>
    )
}

export default ActiveContest