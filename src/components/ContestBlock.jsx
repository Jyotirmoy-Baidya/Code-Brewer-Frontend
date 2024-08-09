import { NavLink } from "react-router-dom";

const ContestBlock = ({ contest }) => {
    return (
        <div className="h-20 bg-primary-black flex items-center justify-between rounded-md px-4 py-4   shadow-primary">
            <div className="ps-4 text-xl uppercase font-semibold tracking-widest">{contest.name}</div>
            <NavLink to={`/contestactive/${contest.code}`} className="bg-primary rounded font-plex-mono text-black px-4 py-2">Enter</NavLink>
        </div>
    )
}

export default ContestBlock