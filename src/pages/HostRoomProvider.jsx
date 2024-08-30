import React, { useEffect, useState } from 'react'
import MeetHeader from '../videoConfe/components/MeetHeader'
import { useParams } from 'react-router-dom';
import axiosHandler from '../utils/AxiosInstance';
import HostRoom from '../videoConfe/HostRoom';

const HostRoomProvider = () => {
    const { roomid } = useParams();
    const [uid, setUid] = useState("");

    //Part to be commented in local host
    function generateRandomCode() {
        // Generate a random number between 1000 and 9999
        return `${Math.floor(1000 + Math.random() * 9000)}`;
    }
    useEffect(() => {
        setUid(generateRandomCode())
    })

    //part to be commented in local host ends 

    //Part to be commented while uploading begin
    // const getRoomDetails = async () => {
    //     const response = await axiosHandler('get', 'room/get-room', {
    //         roomId: roomid
    //     })
    //     console.log(response.roomData);
    //     if (response.success === true) {
    //         setUid(response.roomData);
    //     }
    //     else {
    //         console.log(response.message);
    //     }
    // }

    // useEffect(() => {
    //     getRoomDetails();
    // }, [])
    //part to be commented ends here

    return (
        <div className='h-screen fixed top-0'>
            <MeetHeader />
            {uid != '' &&
                <HostRoom uid={uid} roomid={roomid} />
            }
        </div>
    )
}

export default HostRoomProvider