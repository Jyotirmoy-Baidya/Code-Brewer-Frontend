import React, { useState } from 'react'
import { FaCut } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const EnterUsernamePopUp = ({ setUsernamePopUp, contestCode }) => {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    return (
        <div className='absolute top-0 bg-primary-black h-full w-full flex justify-center items-center bg-opacity-30'>
            <div className='flex flex-col w-2/6 p-5 h-fit rounded-lg bg-gray-800'>
                <FaCut className='ms-auto text-xl drop-shadow-lg  text-red-500' onClick={() => setUsernamePopUp(false)} />
                <div className='text-lg uppercase font-bold tracking-widest font-helvetica drop-shadow-xl text-gray-300'><span className='text-primary'>E</span>nter <span className='text-primary'>Y</span>our <span className='text-primary'>U</span>sername</div>
                <input type='text' className='text-xl uppercase font-semibold tracking-wider text-primary mt-2 mb-2 shadow-inner outline-none w-full p-3 rounded-lg bg-gray-700' onChange={(e) => setUsername(e.target.value)} />
                <button className='bg-yellow-500 text-black font-plex-mono px-4 w-fit py-3 rounded-md shadow-lg shadow-slate-900 mx-auto mt-3 active:shadow-none text-lg'
                    onClick={() => {
                        if (username == "") {
                            toast.success('Please enter a username.', {
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
                            return;
                        }
                        navigate(`/problemstatements`);
                    }}>Start Contest</button>
            </div>
        </div>
    )
}

export default EnterUsernamePopUp