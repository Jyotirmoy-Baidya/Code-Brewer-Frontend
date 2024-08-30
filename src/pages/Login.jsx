import React, { useState } from 'react'
import LoginHeader from '../components/basic/LoginHeader'
import { BsEye, BsEyeFill } from 'react-icons/bs';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axiosHandler from '../utils/AxiosInstance';
import SuccessToast from '../components/toaster/SuccessToast';
import ErrorToast from '../components/toaster/ErrorToast';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [editPassword, setEditPassword] = useState(false);

    const navigate = useNavigate();

    const login = async () => {
        const response = await axiosHandler('post', 'login/user/login', { email, password });

        if (response.success === true) {
            SuccessToast(`Welcome ${response.data.validUser?.username}😊`);
            navigate('/');
        }
        else {
            ErrorToast('Login Failed');
        }
    }
    return (
        <>
            <LoginHeader />
            <div className='h-[84%] flex justify-center items-center text-white gap-4 px-14 pt-7 pb-16'>
                <div className='w-[30%] mb-10 p-4 bg-primary-black pb-8 rounded-md border'>
                    <div className='text-3xl text-primary'>Login</div>
                    <hr className='my-3' />
                    <div className='flex flex-col mt-6 px-2 gap-2'>
                        <label htmlFor="login-email" className='tracking-wider'>Email</label>
                        <input type="text" className={`p-2 rounded-md bg-transparent outline-none border  `} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='relative flex flex-col mt-4 px-2 gap-2'>
                        <label htmlFor="login-email" className='tracking-wider'>Password</label>
                        <input type={`${editPassword ? 'text' : 'password'}`} className={`relative  p-2 rounded-md bg-transparent outline-none border`} onChange={(e) => setPassword(e.target.value)} />
                        <div className='absolute right-5 bottom-3 cursor-pointer' onClick={() => setEditPassword(!editPassword)}>
                            {editPassword ? <FaEye /> : <FaEyeSlash />}
                        </div>
                    </div>
                    <div className='text-end text-xs mt-2 pe-2'>Don't have an account? <NavLink to="/signup" className="text-primary">Sign Up</NavLink></div>
                    <div className='flex justify-center mt-5'>{
                        email != '' && password != '' ?
                            <button className='min-h-12 bg-primary text-black rounded-md px-8 font-plex-mono' onClick={() => login()}>Login</button>
                            :
                            <button className='min-h-12 bg-green-800 text-black rounded-md px-8 font-plex-mono' >Login</button>
                    }
                    </div>

                </div>
            </div>
        </>
    )
}

export default Login