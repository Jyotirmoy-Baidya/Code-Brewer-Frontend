import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ErrorToast from '../components/toaster/ErrorToast';
import axiosHandler from '../utils/AxiosInstance';
import Header from '../components/basic/Header';
import CopyToClipboard from '../utils/CopyToClipboard';
import CopyLinkToClipboard from '../utils/CopyLinkToClipboard';
import SuccessToast from '../components/toaster/SuccessToast';

const LiveLobby = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const [login, setLogin] = useState(false);

    const [hostRoomid, setHostRoomid] = useState("");
    const [hostRoomname, setHostRoomname] = useState("");
    const [participantRoomid, setParticipantRoomid] = useState("");
    const [participantRoomname, setParticipantRoomname] = useState("");

    const navigate = useNavigate();

    // Code to be comment out while uploading begins
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
            ErrorToast('You have to login in order to enter or host a meeting');
            navigate('/login');
        }
        setLoading(false);
    }
    useEffect(() => {
        getUser();
    }, [])

    const createRoom = async (room) => {
        setLoading(true);
        const response = await axiosHandler('post', 'room/create-room', {
            roomName: hostRoomname,
            roomId: hostRoomid,
        })
        if (response.success == true) {
            SuccessToast('Room created successfully');
            navigate(`/host/${hostRoomid}`)
        }
        else {
            ErrorToast('Failed to create room');
        }
        setLoading(false);
    }
    //Code to be comment out while uploading begins

    //Code to be comment in local host begins

    // const createRoom = () => {
    // localStorage.setItem('HostRoomName', hostRoomname);
    // localStorage.setItem('HostRoomId', hostRoomid);
    //     navigate(`/host/${hostRoomid}`)
    // }

    //code to be in comment in local host ends

    const generateRoomid = () => {
        if (hostRoomname === '') {
            ErrorToast('Please enter a room name');
        }
        else {
            const chars = 'abcdefghijklmnopqrstuvwxyz';
            let roomId = '';

            // Generate a random string with the length of 9 characters
            for (let i = 0; i < 9; i++) {
                roomId += chars.charAt(Math.floor(Math.random() * chars.length));
            }

            setHostRoomid(roomId);
        }
    }



    return (
        <>
            <Header />
            <div className='h-96 px-16 pt-7 flex gap-4'>
                {/* Host  */}
                <div className='w-1/2 p-4 bg-primary-black rounded-md shadow shadow-gray-700' >
                    <h1 className='text-2xl font-bold underline-offset-4 underline pb-2'>Create Room</h1>
                    <p className='text-xm text-gray-400 '>Here you can host a meeting share live questions and code with your participants.</p>


                    <input type="text" className='w-full mt-7 p-2 bg-slate-600 rounded-md outline-none border-yellow-500 border mb-2' placeholder='Enter your roomname' value={hostRoomname} onChange={(e) => setHostRoomname(e.target.value)} />
                    <button className='bg-green-700 active:bg-green-700 py-2 px-3 mb-3 mx-auto rounded-md text-black font-plex-mono hover:border-b-2 hover:-translate-y-[0.07rem] active:translate-y-0 active:border-none' onClick={() => generateRoomid()}>Generate a roomid</button>
                    {
                        hostRoomid &&
                        <div className='flex items-center mx-auto gap-2 justify-center mt-3'>
                            <div className=''>Roomid:</div>
                            <div className='rounded-md shadow shadow-slate-400 px-3 py-2 bg-gray-600 w-48 tracking-widest flex'>
                                {hostRoomid}
                                <div className='ms-auto'><CopyToClipboard textToCopy={`${hostRoomid}`} /></div>
                                <div><CopyLinkToClipboard textToCopy={`http://localhost:5173/participant/${hostRoomid}`} /></div>
                            </div>
                        </div>
                    }
                    <div className='mt-8  text-center'>
                        <button className={`${hostRoomid ? 'bg-yellow-400' : 'bg-yellow-800'} rounded-md py-2 px-3 text-black font-plex-mono mx-auto hover:border-b-2 hover:-translate-y-[0.07rem] active:translate-y-0 active:border-none`}
                            onClick={() => {
                                if (hostRoomid) {
                                    createRoom();
                                }
                                else {
                                    ErrorToast('Please generate a roomid first');
                                }
                            }}>Create Room</button>
                    </div>
                </div>

                {/* Participant  */}
                <div className='w-1/2 p-4 bg-primary-black rounded-md shadow shadow-gray-700' >
                    <h1 className='text-2xl font-bold underline-offset-4 underline pb-2'>Join Room</h1>
                    <p className='text-xm text-gray-400 '>Here you can join a meeting hosted by coding profesionals.</p>


                    <input type="text" className='w-full mt-7 p-2 bg-slate-600 rounded-md outline-none border-yellow-500 border mb-2' placeholder='Enter your room id' value={hostRoomname} onChange={(e) => setHostRoomname(e.target.value)} />

                    <div className='mt-6  text-center'>
                        <button className={`${hostRoomid ? 'bg-yellow-400' : 'bg-yellow-800'} rounded-md py-2 px-3 text-black font-plex-mono mx-auto hover:border-b-2 hover:-translate-y-[0.07rem] active:translate-y-0 active:border-none`}
                            onClick={() => {
                                if (hostRoomid) {
                                    navigate(`participant/${hostRoomid}`)
                                }
                                else {
                                    ErrorToast('Please enter a roomid.');
                                }
                            }}>Join Room</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LiveLobby