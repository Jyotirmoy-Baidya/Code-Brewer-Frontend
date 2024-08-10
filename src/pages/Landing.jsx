import React, { useState } from 'react'
import Header from '../components/basic/Header'
import EnterUsernamePopUp from '../components/EnterUsernamePopUp'
import toast from 'react-hot-toast';

const Landing = () => {
    const [usernamePopUp, setUsernamePopUp] = useState(false);
    const [contestCode, setContestCode] = useState("");
    return (
        <>
            <Header />
            <div className='h-[84%] grid grid-cols-2 text-white gap-4 px-16 pt-7 pb-16'>
                <div className='flex flex-col gap-4 h-full'>
                    <div className='font-helvetica text-7xl'>
                        Build your <span className='text-primary'>&lt;</span>stuff<span className='text-primary'>&gt;</span> we can take care of the rest.
                    </div>
                    <div className='w-1/2 text-gray-400'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam magnam ducimus porro minima deleniti esse repellat? unde odio.
                    </div>
                    <div className='flex gap-4 h-14 mt-auto'>
                        <input type="" className='bg-transparent border-2 border-primary w-1/2 h-full py-1 px-4 text-2xl font-semibold text-primary font-plex-mono uppercase tracking-widest rounded-md outline-none' placeholder='Code' onChange={(e) => setContestCode(e.target.value)} />
                        <button className='h-14  bg-primary w-36 rounded-md font-plex-mono text-black mt-auto ' onClick={() => {
                            if (contestCode == "") {
                                toast.success('Please fill the contest code.', {
                                    style: {
                                        border: '1px solid #1BF1A1',
                                        padding: '16px',
                                        color: '#1BF1A1',
                                        backgroundColor: '#0D1418'
                                    },
                                    iconTheme: {
                                        primary: '#1BF1A1',
                                        secondary: '#0D1418',
                                    },
                                });
                                return;
                            }
                            setUsernamePopUp(true)
                        }}>Join Contest</button>
                    </div>
                </div>
            </div>
            {
                usernamePopUp && contestCode != "" &&
                <EnterUsernamePopUp setUsernamePopUp={setUsernamePopUp} contestCode={contestCode} />
            }
        </>
    )
}

export default Landing