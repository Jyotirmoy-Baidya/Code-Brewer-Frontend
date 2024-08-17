import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import axiosHandler from '../../utils/AxiosInstance';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    const getUser = async () => {
        setLoading(true);
        const response = await axiosHandler('get', 'login/user/get-user');
        console.log(response);
        if (response.success === true) {
            setLogin(true);
            setUser(response.data);
        }
        else {
            setLogin(false);
        }
        setLoading(false);

    }

    useEffect(() => {
        getUser();
    }, [])
    return (
        <div className='h-[16%] flex items-center py-8 px-8'>
            <div className='w-[20%]'>
                <h1 className='cursor-pointer text-3xl font-bold tracking-widest font-helvetica' onClick={() => navigate("/")}>CodeCrafters</h1>
            </div>
            <div className='text-lg font-plex-mono px-16 flex justify-between items-center w-[60%]'>
                <NavLink to="/codearea" className={`${location.pathname === '/codearea' && "text-primary"}`}>Code Area</NavLink>
                <NavLink to="/problemstatements" className={`${location.pathname === '/problemstatements' && "text-primary"}`}>Problem statements</NavLink>
                <NavLink to="/contests" className={`${location.pathname === '/contests' && "text-primary"}`}>Battleground</NavLink>
                <NavLink to="/aboutus" className={`${location.pathname === '/aboutus' && "text-primary"}`}>About us</NavLink>
            </div>
            <div className='flex justify-end w-[20%]'>
                {
                    loading ? <></> :
                        login ?
                            <NavLink to="/profile" className='flex justify-center items-center rounded-full h-10 w-10 uppercase border-primary border-4'>
                                {user.username[0]}</NavLink> :
                            <button onClick={() => navigate("/login")} className='min-h-12 bg-primary text-black rounded-md px-8 font-plex-mono'>Login</button>
                }
            </div>
        </div>

    )
}

export default Header