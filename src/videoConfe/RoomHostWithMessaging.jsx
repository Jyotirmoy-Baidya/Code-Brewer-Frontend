import AgoraRTM, { RtmChannel, RtmClient } from 'agora-rtm-sdk';
import React from 'react'
import { useParams } from 'react-router-dom'

const RoomHostWithMessaging = () => {

    const appId = '51fbe9a59fa942378240eb92130b05f5';
    const { roomid } = useParams();
    const generateUserId = () => {
        const timestamp = Date.now();
        const randomNum = Math.floor(Math.random() * 10000); // Generates a random number between 0 and 9999
        return `${timestamp}${randomNum}`;
    };

    const userId = generateUserId();

    let rtmClient;
    let token = null;
    let joinRoomInit = async () => {

        rtmClient = AgoraRTM.createInstance(appid)
        await rtmClient.login({ 'uid': rtmUid, 'token': token })

        channel = rtmClient.createChannel(roomId)
        await channel.join()

        await rtmClient.addOrUpdateLocalUserAttributes({ 'name': name, 'userRtcUid': rtcUid.toString(), 'userAvatar': avatar })

        getChannelMembers()

        window.addEventListener('beforeunload', leaveRtmChannel)

        channel.on('MemberJoined', handleMemberJoined)
        channel.on('MemberLeft', handleMemberLeft)
    }

    joinRoomInit();


    return (
        <div>RoomHostWithMessaging</div>
    )
}

export default RoomHostWithMessaging