import React from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/AxiosInstance'
import toast from 'react-hot-toast'

const ActiveContestHeader = ({ endTime }) => {

    const navigate = useNavigate()

    //finish the contest
    const finishContest = async () => {
        try {
            const response = await axiosInstance.get(`http://localhost:3010/api/v1/contest/submitcontest`, {
                withCredentials: true
            });
            console.log('Contest finished successfully:', response.data);
            toast.success('Contest finished succesfully', {
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
                        <button onClick={() => navigate("/")} className='min-h-12 bg-primary text-black rounded-md px-4 font-plex-mono '>Exit Contest</button>
                        :
                        <button className='min-h-12 bg-primary text-black rounded-md px-4 font-plex-mono' onClick={() => finishContest()}>Finish Contest</button>
                }
            </div>
        </div>
    )
}

export default ActiveContestHeader