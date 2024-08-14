const ContestBlock = ({ contest, setContestCode, setUsernamePopUp }) => {
    return (
        <div className="h-20 bg-primary-black flex items-center justify-between rounded-md px-4 py-4   shadow-primary">
            <div className="ps-4 text-xl uppercase font-semibold tracking-widest">{contest.title}</div>
            <button className="bg-primary rounded font-plex-mono text-black px-4 py-2" onClick={() => { setContestCode(contest.contestCode); setUsernamePopUp(true); }}>Enter</button>
        </div>
    )
}

export default ContestBlock