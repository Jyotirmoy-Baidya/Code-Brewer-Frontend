import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/AxiosInstance';

const NavigateToContest = () => {
    const navigate = useNavigate();
    const checkUser = async () => {
        try {
            const response = await axiosInstance.get('http://localhost:3010/api/v1/contest/getuser', {
                withCredentials: true
            })
            console.log(response.data.success);
            if (response.data.success === true) {
                console.log("S")
                navigate(`/contestactive/${response.data.contestCode}`);
            }
        } catch (error) {
            console.log(error);
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