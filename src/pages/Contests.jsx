import { useState } from "react"
import Header from "../components/basic/Header"
import { IoSearch } from "react-icons/io5";

import ContestBlock from "../components/ContestBlock";
import { NavLink } from "react-router-dom";

const contests = [
    { name: "Contest A", code: "WEQXY5I" },
    { name: "Contest B", code: "HD2LK8P" },
    { name: "Contest C", code: "MNO9J3Q" },
    { name: "Contest D", code: "R7VBU4K" },
    { name: "Contest E", code: "ZXT12GH" }
];

const Contests = () => {
    const [search, setSearch] = useState("");
    return (
        <>
            <Header />
            <div className="max-h-[84%] flex flex-col gap-4 text-white px-16 pt-7 pb-3">
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
                <div className="p-2 grow grid grid-cols-2 gap-10 overflow-scroll hide-scrollbar contest-list">
                    {
                        contests.map((ele, i) => {
                            if (ele.name.toUpperCase().includes(search.toUpperCase()))
                                return (
                                    <ContestBlock key={i} contest={ele} />
                                )
                        })
                    }
                </div>
            </div >
        </>
    )
}

export default Contests