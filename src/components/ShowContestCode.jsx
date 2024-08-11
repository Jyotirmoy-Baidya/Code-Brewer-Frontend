import React from 'react'
import { FaCut } from 'react-icons/fa'
import CopyToClipboard from './CopyToClipboard'
import { useNavigate } from 'react-router-dom'

const ShowContestCode = ({ code, setShowCodePopUp }) => {
    const navigate = useNavigate();
    return (
        <div className='absolute top-0 bg-primary-black h-full w-full flex justify-center items-center bg-opacity-30'>
            <div className='flex flex-col w-2/6 p-5 h-fit rounded-lg bg-gray-800'>
                <FaCut className='ms-auto text-xl drop-shadow-lg  text-red-500' onClick={() => { setShowCodePopUp(false); navigate("/contests") }} />
                <div className='text-lg uppercase font-bold tracking-widest font-helvetica drop-shadow-xl text-gray-300'><span className='text-primary'>Y</span>our <span className='text-primary'>C</span>ontent <span className='text-primary'>C</span>ode</div>
                <div className='text-xl uppercase font-semibold tracking-wider text-primary mt-2 mb-2 shadow-inner outline-none w-full p-3 rounded-lg bg-gray-700 flex justify-between'>{code} <CopyToClipboard textToCopy={code} /></div>

            </div>
        </div>
    )
}

export default ShowContestCode