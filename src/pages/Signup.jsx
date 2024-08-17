import React, { useState } from 'react'
import LoginHeader from '../components/basic/LoginHeader'
import { BsEye, BsEyeFill } from 'react-icons/bs';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import OtpPopUpBlock from '../components/OtpPopUpBlock';
import axiosHandler from '../utils/AxiosInstance';
import SuccessToast from '../components/toaster/SuccessToast';
import ErrorToast from '../components/toaster/ErrorToast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullname] = useState("");
    const [editPassword, setEditPassword] = useState(false);
    const [otpPopUp, setOtpPopUp] = useState(false);
    const [loading, setLoading] = useState(false);

    const sendOpt = async () => {
        setLoading(true);
        const response = await axiosHandler('post', 'login/user/send-otp', {
            username, email, fullName: fullname, password
        });
        console.log(response);
        if (response.success === true) {
            SuccessToast('Otp Sent');
            setOtpPopUp(true);
        }
        else {
            ErrorToast(response.message);
        }
        setLoading(false);
    }

    return (
        <>
            <LoginHeader />
            <div className='relative h-[84%] flex justify-center items-center text-white gap-4 px-14 pt-7 pb-16'>
                <div className={`w-[30%] mb-10 p-4 bg-primary-black pb-8 rounded-md border ${otpPopUp && 'opacity-55'}`}>
                    <div className='text-3xl text-primary'>Signup</div>
                    <hr className='my-3' />
                    <div className='flex flex-col mt-6 px-2 gap-2'>
                        <label htmlFor="login-email" className='tracking-wider'>Username</label>
                        <input type="text" value={username} className={`p-2 rounded-md bg-transparent outline-none border  `} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className='flex flex-col mt-4 px-2 gap-2'>
                        <label htmlFor="login-fullname" className='tracking-wider'>Fullname</label>
                        <input type="text" value={fullname} className={`p-2 rounded-md bg-transparent outline-none border  `} onChange={(e) => setFullname(e.target.value)} />
                    </div>
                    <div className='flex flex-col mt-4 px-2 gap-2'>
                        <label htmlFor="login-email" className='tracking-wider'>Email</label>
                        <input type="email" value={email} className={`p-2 rounded-md bg-transparent outline-none border  `} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='relative flex flex-col mt-4 px-2 gap-2'>
                        <label htmlFor="login-email" className='tracking-wider'>Password</label>
                        <input type={`${editPassword ? 'text' : 'password'}`} value={password} className={`relative  p-2 rounded-md bg-transparent outline-none border`} onChange={(e) => setPassword(e.target.value)} />
                        <div className='absolute right-5 bottom-3 cursor-pointer' onClick={() => setEditPassword(!editPassword)}>
                            {editPassword ? <FaEye /> : <FaEyeSlash />}
                        </div>
                    </div>
                    <div className='text-end text-xs mt-2 pe-2'>Already have an account? <NavLink to="/login" className="text-primary">Login</NavLink></div>
                    <div className='flex justify-center mt-5'>{
                        email != '' && password != '' ?
                            <button className='min-h-12 w-48 text-center bg-primary text-black rounded-md px-8 font-plex-mono' onClick={() => sendOpt()}>
                                {
                                    loading ? <AiOutlineLoading3Quarters className='text-lg loading-spin' /> : "Send Otp"
                                }
                            </button>
                            :
                            <button className='min-h-12 bg-green-800 text-black rounded-md px-8 font-plex-mono'  >SendOtp</button>
                    }
                    </div>

                </div>
                {otpPopUp && <OtpPopUpBlock email={email} setOtpPopUp={setOtpPopUp} />}
            </div>
        </>
    )
}

export default Signup