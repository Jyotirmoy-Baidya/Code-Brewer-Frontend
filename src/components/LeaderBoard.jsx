import React, { useEffect, useState } from 'react'
import axiosHandler from '../utils/AxiosInstance';

import { MdOutlineLeaderboard } from 'react-icons/md';
import Podium from '../components/podium/Podium';
import { GiCrossMark } from 'react-icons/gi';


const LeaderBoard = ({ code }) => {
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [leaderBoardPopUp, setLeaderBoardPopUp] = useState(false);

    // get the paricipants
    const getParticipants = async () => {
        const response = await axiosHandler('get', `contest/getleaderboard/${code}`);
        console.log(response);
        if (response.success == true) {
            setParticipants(response.participants);
        }
        else {
            console.log(response.error);
        }
    };


    useEffect(() => {
        getParticipants();
    }, [])

    useEffect(() => {
        const par = setInterval(() => {
            getParticipants();
        }, 10000);

        // Cleanup the interval on component unmount
        return () => clearInterval(par);
    }, []);


    return (
        <>
            <div className='w-[45%] flex flex-col items-center absolute bottom-10 right-10'>
                {
                    participants.length > 0 && <Podium players={participants} />
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
                                participants.map((ele, i) => (
                                    <div key={i} className='flex py-4 px-6 rounded-md border cursor-pointer uppercase  items-center border-slate-600 bg-slate-900 '>
                                        <span className='me-2 text-yellow-400 text-xl '>{i + 1}</span>
                                        <div className='font-semibold tracking-wider text-xl'>{ele.name}</div>
                                        <span className='ms-auto capitalize'>{ele.noq} solved</span>
                                    </div>
                                ))
                            }


                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default LeaderBoard