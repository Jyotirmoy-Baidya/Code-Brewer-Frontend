import React, { useState } from 'react'
import { FaCut } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/AxiosInstance';
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import axiosHandler from '../utils/AxiosInstance';

const EnterUsernamePopUp = ({ setUsernamePopUp, contestCode }) => {
    const navigate = useNavigate();
    //Defining States
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);

    //User Joining contest using username
    const joinContest = async () => {
        if (!username) {
            console.error('Username is required.');
            return; // Exit the function if validation fails
        }

        setLoading(true);
        // Send POST request to join the contest
        const response = await axiosHandler('post', 'contest/join', {
            contestCode,
            userName: username,
        }, {
            withCredentials: true,
        });
        if (response.success === true) {
            toast.success('Successfully joined the contest', {
                style: {
                    border: '1px solid #1BF1A1',
                    padding: '16px',
                    color: '#1BF1A1',
                    backgroundColor: '#0D1418'
                },
                iconTheme: {
                    primary: '#1BF1A1',
                    secondary: '#0D1418',
                },
            });
            navigate(`/contestactive/${contestCode}`);
        }
        else {
            if (response.message == 'Contest not found') {
                toast.error('Invalid contest code.', {
                    style: {
                        border: '1px solid red',
                        padding: '16px',
                        color: 'red',
                        backgroundColor: '#0D1418'
                    },
                    iconTheme: {
                        primary: 'red',
                        secondary: '#0D1418',
                    },
                });
            }
            console.warn('Error joining contest:', response.message);
        }

        setUsernamePopUp(false);
        setUsername("");
        setLoading(false);
    };


    return (
        <div className='absolute top-0 bg-primary-black h-full w-full flex justify-center items-center bg-opacity-30'>
            <div className='flex flex-col w-2/6 p-5 h-fit rounded-lg bg-gray-800'>
                <FaCut className='ms-auto text-xl drop-shadow-lg  text-red-500' onClick={() => setUsernamePopUp(false)} />
                <div className='text-lg uppercase font-bold tracking-widest font-helvetica drop-shadow-xl text-gray-300'><span className='text-primary'>E</span>nter <span className='text-primary'>Y</span>our <span className='text-primary'>U</span>sername</div>
                <input type='text' className='text-xl uppercase font-semibold tracking-wider text-primary mt-2 mb-2 shadow-inner outline-none w-full p-3 rounded-lg bg-gray-700' onChange={(e) => setUsername(e.target.value)} />
                <button className={`${username == '' ? 'bg-opacity-45' : ""} bg-yellow-500 text-black font-plex-mono px-4 h-12 w-48 py-3 rounded-md shadow-lg shadow-slate-900 mx-auto mt-3 active:shadow-none text-lg items-center flex justify-center`}
                    onClick={() => { joinContest() }}>
                    {
                        loading ? <AiOutlineLoading3Quarters className='text-lg loading-spin' /> : "Start Contest"
                    }
                </button>
            </div>
        </div>
    )
}

export default EnterUsernamePopUp