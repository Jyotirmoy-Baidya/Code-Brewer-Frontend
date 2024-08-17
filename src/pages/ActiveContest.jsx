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
import axiosHandler from '../utils/AxiosInstance';
import LeaderBoard from '../components/LeaderBoard';



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





const ActiveContest = () => {
    const params = useParams();
    console.log(params);
    const [contest, setContest] = useState({});
    const [loading, setLoading] = useState(false);

    const [solvedQuestionsId, setSolvedQuestionsId] = useState([]);

    //Fetch the contest details
    const fetchContestDetails = async () => {
        setLoading(true);
        const response = await axiosHandler('get', `contest/get/${params.code}`);
        if (response.success == true) {
            console.log('Contest details fetched successfully:', response.contest);
            setContest(response.contest);
        }
        else {
            console.error('Error fetching contest details:', response.message);
        }
        setLoading(false);
    };

    //Get User Data
    const getUserData = async () => {
        const response = await axiosHandler('get', "contest/getuser");
        if (response.success == true) {
            console.log(response.findUser.question);
            setSolvedQuestionsId(response.findUser.questions);
        }
        else {
            console.log("Error fetching user data" + response.message);
        }
    }

    // get the paricipants
    const getParticipants = async () => {
        const response = await axiosHandler('get', `contest/getleaderboard/${params.code}`);
        console.log('Participants fetched successfully:', response.data);
        try {
            setParticipants(response.data);
        } catch (error) {
            console.error('Error fetching participants:', error);
        }
    };



    useEffect(() => {
        fetchContestDetails();
        getUserData();
    }, [])


    return (
        <>
            <ActiveContestHeader endTime={contest.endTime} />
            {
                loading ?
                    <div className='font-helvetica flex text-2xl text-white px-16 pt-4 pb-3'>
                        <div className='flex gap-4 items-center'>Loading <AiOutlineLoading3Quarters className='text-lg loading-spin' /></div>
                    </div> :
                    <div className="h-[84%] font-helvetica flex flex-col gap-4 text-white px-16 pt-7 pb-3">
                        <div className='flex justify-between'>
                            <div className='text-4xl font-bold tracking-wider text-gray-300'>{contest.title}</div>
                            <div className='flex gap-3 items-end'>
                                <Timer endTime={contest.endTime} />
                            </div>
                        </div>
                        <hr className='border-[0.2px]' />
                        <div className='flex h-[84%]'>
                            <div className='w-1/2 flex flex-col py-4 gap-5 overflow-scroll design-scrollbar'>
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
                        </div>
                        <div className='w-1/2 h-full'>
                            <LeaderBoard code={params.code} />
                        </div>

                    </div>
            }
        </>
    )
}

export default ActiveContest