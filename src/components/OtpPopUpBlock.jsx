import { useState } from "react"
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCut } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import axiosHandler from "../utils/AxiosInstance";
import SuccessToast from "./toaster/SuccessToast";
import ErrorToast from "./toaster/ErrorToast";

const OtpPopUpBlock = ({ email, setOtpPopUp }) => {
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState("");

    const navigate = useNavigate();

    const singup = async () => {
        setLoading(true);
        const response = await axiosHandler('post', 'login/user/register', { email, otp });
        console.log(response);
        if (response.success === true) {
            SuccessToast(`${response.data.username}😊 your account has been successfully created.`);
            navigate("/");
        }
        else {
            ErrorToast(response.message);
        }
        setLoading(false);



    }


    return (
        <div className="absolute top-24 w-[35%] mb-10 p-4 bg-primary-black pb-6 rounded-md border">
            <FaCut className='ms-auto text-xl drop-shadow-lg  text-red-500' onClick={() => setOtpPopUp(false)} />
            <div className='text-lg uppercase font-bold tracking-widest font-helvetica drop-shadow-xl text-gray-300'><span className='text-primary'>E</span>nter <span className='text-primary'>Y</span>our <span className='text-primary'>O</span>ne <span className='text-primary'>T</span>ime <span className='text-primary'>P</span>assword</div>
            <div className="text-xs text-gray-500">Enter the 6-digit OTP sent to your email at <span className="text-blue-500">{email}</span>.</div>
            <input type='text' className='text-xl uppercase font-semibold tracking-wider text-primary mt-2 mb-2 shadow-inner outline-none w-full p-3 rounded-lg bg-gray-700' onChange={(e) => setOtp(e.target.value)} />
            <button className={`${otp.length != 6 ? 'bg-opacity-45' : ""} bg-yellow-500 text-black font-plex-mono px-4 h-12 w-48 py-3 rounded-md tracking-widest shadow-lg shadow-slate-900 mx-auto mt-3 active:shadow-none text-lg items-center flex justify-center`}
                onClick={() => {
                    if (otp.length == 6) {
                        singup();
                    }
                }}>
                {
                    loading ? <AiOutlineLoading3Quarters className='text-lg loading-spin' /> : "Sign Up"
                }
            </button>
        </div>
    )
}

export default OtpPopUpBlock