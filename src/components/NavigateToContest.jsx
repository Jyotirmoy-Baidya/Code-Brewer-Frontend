import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/AxiosInstance';
import axiosHandler from '../utils/AxiosInstance';
import toast from 'react-hot-toast';

const NavigateToContest = () => {
    const navigate = useNavigate();
    const checkUser = async () => {
        const response = await axiosHandler('get', 'contest/getuser')
        if (response.success === true) {
            navigate(`/contestactive/${response.contestCode}`);
            toast.success('You can continue.', {
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
        }
    }

    useEffect(() => {
        checkUser();
    }, [])

    return (
        <div className='hidden'>NavigateToContest</div>
    )
}

export default NavigateToContest