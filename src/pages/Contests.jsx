import { useEffect, useState } from "react"
import Header from "../components/basic/Header"
import { IoSearch } from "react-icons/io5";

import ContestBlock from "../components/ContestBlock";
import { NavLink } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import EnterUsernamePopUp from "../components/EnterUsernamePopUp";
import NavigateToContest from "../components/NavigateToContest";
import axiosHandler from "../utils/AxiosInstance";


const Contests = () => {
    const [search, setSearch] = useState("");
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [usernamePopUp, setUsernamePopUp] = useState(false);
    const [contestCode, setContestCode] = useState("");

    const fetchAllContests = async () => {
        setLoading(true);
        const response = await axiosHandler('get', 'contest/all');
        if (response.success == true) {
            console.log('Contests fetched successfully:', response.contests);
            setContests(response.contests);
        }
        else {
            console.error('Error fetching contests:', response.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAllContests();
    }, [])

    return (
        <>
            <NavigateToContest />
            <Header />
            <div className="h-[84%] flex flex-col gap-4 text-white px-16 pt-7 pb-4">
                {/* <div className="text-3xl tracking-wider font-semibold font-helvetica">Contests</div> */}
                <div className='flex gap-4 justify-center'>
                    <div className="flex gap-4 w-1/2">
                        <input type="text" className='grow px-4 py-2 rounded-md text-lg uppercase tracking-wider outline-none border border-white focus:border-primary bg-transparent text-primary' placeholder='Search Contests' onChange={(e) => setSearch(e.target.value)} value={search} />
                        <button className='text-primary text-2xl'><IoSearch /></button>
                    </div>
                    <div className="flex items-center justify-end w-1/2">
                        <NavLink to={"/createcontest"} className="bg-blue-500 py-2 px-4 rounded-md text-black font-plex-mono" >Create Contest</NavLink>
                    </div>
                </div>
                <hr />
                <div className="p-2 grid grid-cols-2 gap-10 overflow-scroll design-scrollbar contest-list">
                    {
                        loading === true ? <div className='flex text-xl gap-4 items-center'>Fetching Contests<AiOutlineLoading3Quarters className='text-lg loading-spin' /></div> :
                            !contests?.length > 0 ?
                                <div className='flex text-xl gap-4 items-center'>
                                    Due to server issue unable to fetch the contests.
                                </div> :
                                <>{
                                    contests.map((ele, i) => {
                                        if (ele.title.toUpperCase().includes(search.toUpperCase()))
                                            return (
                                                <ContestBlock key={i} contest={ele} setContestCode={setContestCode} setUsernamePopUp={setUsernamePopUp} />
                                            )
                                    })
                                }</>
                    }
                </div>
            </div >
            {
                usernamePopUp && contestCode != "" &&
                <EnterUsernamePopUp setUsernamePopUp={setUsernamePopUp} contestCode={contestCode} />
            }
        </>
    )
}

export default Contests