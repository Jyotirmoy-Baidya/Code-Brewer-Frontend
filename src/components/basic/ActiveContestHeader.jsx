import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axiosHandler from '../../utils/AxiosInstance'

const ActiveContestHeader = ({ endTime }) => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    //finish the contest
    const finishContest = async () => {
        setLoading(true);
        const response = await axiosHandler('get', 'contest/submitcontest',)

        if (response.success == true) {
            toast.success('Contest finished successfully', {
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
        }
        else {
            toast.error('Error finishing contest', {
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
        setLoading(false);
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