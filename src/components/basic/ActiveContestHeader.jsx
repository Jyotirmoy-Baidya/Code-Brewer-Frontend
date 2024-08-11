import React from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/AxiosInstance'

const ActiveContestHeader = ({ endTime }) => {

    const navigate = useNavigate()

    //finish the contest
    const finishContest = async () => {
        try {
            const response = await axiosInstance.get(`http://localhost:3010/api/v1/contest/submitcontest`, {
                withCredentials: true
            });
            console.log('Contest finished successfully:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Error finishing contest:', error);
        }
    }
    
    return (
        <div className='h-[16%] flex items-center justify-between py-8 px-8'>
            <div className='w-[20%]'>
                <h1 className='text-3xl font-bold tracking-widest font-helvetica'>CodeCrafters</h1>
            </div>

            <div className='flex justify-end w-[20%]'>
                {
                    new Date(endTime) < new Date() ?
                        <button onClick={() => navigate("/")} className='min-h-12 bg-primary text-black rounded-md px-4 font-plex-mono hover:scale-[102%] active:scale-[100%]'>Exit Contest</button>
                        :
                        <button className='min-h-12 bg-primary text-black rounded-md px-4 font-plex-mono hover:scale-[102%] active:scale-[100%]' onClick={()=>finishContest()}>Finish Contest</button>
                }
            </div>
        </div>
    )
}

export default ActiveContestHeader