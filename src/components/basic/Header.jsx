import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <div className='h-[16%] flex items-center py-8 px-8'>
            <div className='w-[20%]'>
                <h1 className='cursor-pointer text-3xl font-bold tracking-widest font-helvetica' onClick={() => navigate("/")}>CodeCrafters</h1>
            </div>
            <div className='text-lg font-plex-mono px-16 flex justify-between items-center w-[60%]'>
                <NavLink to="/codearea" className={`${location.pathname === '/codearea' && "text-primary"}`}>CodingPlayground</NavLink>
                <NavLink to="/problemstatements" className={`${location.pathname === '/problemstatements' && "text-primary"}`}>CodingArena</NavLink>
                <NavLink to="/contests" className={`${location.pathname === '/contests' && "text-primary"}`}>CodingBattleground</NavLink>
                <NavLink to="/aboutus" className={`${location.pathname === '/aboutus' && "text-primary"}`}>About us</NavLink>
            </div>
            <div className='flex justify-end w-[20%]'>
                <button onClick={() => navigate("/codearea")} className='min-h-12 bg-primary text-black rounded-md px-4 font-plex-mono'>Start Code</button>
            </div>
        </div>

    )
}

export default Header