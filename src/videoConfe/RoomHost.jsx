import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import AgoraRTC, {
    LocalUser,
    RemoteUser,
    useJoin,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteAudioTracks,
    useRemoteUsers,
} from "agora-rtc-react";

const RoomHost = () => {
    const appId = '15b767a0b7dd4fe488826585f7eeb187';
    const { roomid } = useParams();

    const generateUserId = () => {
        const timestamp = Date.now();
        const randomNum = Math.floor(Math.random() * 10000); // Generates a random number between 0 and 9999
        return `user_${timestamp}_${randomNum}`;
    };

    const userId = generateUserId();

    const [activeConnection, setActiveConnection] = useState(true);
    const [micOn, setMic] = useState(false);
    const [cameraOn, setCamera] = useState(false);
    const [screenSharing, setScreenSharing] = useState(false);
    const [screenTrack, setScreenTrack] = useState(null);

    // const navigate = useNavigate();

    // Join the channel
    const client1 = useJoin(
        {
            appid: appId,
            channel: roomid,
            token: null,
            uid: userId
        },
        activeConnection,
    );

    console.log(client1);

    // Get local tracks
    const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
    const { localCameraTrack } = useLocalCameraTrack(cameraOn);

    // Re-publish tracks when mic or camera state changes
    const tracksToPublish = [localMicrophoneTrack, localCameraTrack, screenTrack].filter(Boolean);

    usePublish(tracksToPublish);

    // Remote users and their audio tracks
    const remoteUsers = useRemoteUsers();
    const { audioTracks } = useRemoteAudioTracks(remoteUsers);

    // Play the remote user audio tracks
    useEffect(() => {
        audioTracks.forEach((track) => track.play());
    }, [audioTracks]);

    // Handle screen sharing
    const handleScreenSharing = async () => {
        setCamera(false);
        if (screenSharing) {
            // Stop screen sharing
            if (screenTrack) {
                await screenTrack.stop();
                await screenTrack.close();
                setScreenTrack(null);
            }
            setScreenSharing(false);
        } else {
            // Start screen sharing
            const track = await AgoraRTC.createScreenVideoTrack();
            setScreenTrack(track);
            setScreenSharing(true);
        }
    };

    return (
        <>

            <div id='remoteVideoGrid'>
                {
                    remoteUsers.map((user) => (
                        <div key={user.uid} className="remote-video-container">
                            <RemoteUser user={user} />
                        </div>
                    ))
                }
            </div>
            <div id='localVideo'>
                {!screenSharing &&
                    <LocalUser
                        audioTrack={localMicrophoneTrack}
                        videoTrack={localCameraTrack}
                        cameraOn={cameraOn}
                        micOn={micOn}
                        playAudio={micOn}
                        playVideo={cameraOn}
                        className='camera-video'
                    />
                }
                {screenSharing && screenTrack && (
                    <LocalUser
                        videoTrack={screenTrack}
                        cameraOn={true}
                        micOn={false}
                        playVideo={true}
                        className='screen-video'
                    />
                )}
                <div>
                    <div id="controlsToolbar">
                        <div id="mediaControls">
                            <button className="btn" onClick={() => setMic(a => !a)}>
                                {micOn ? "Turn Off Mic" : "Turn On Mic"}
                            </button>
                            <button className="btn" onClick={() => setCamera(a => !a)}>
                                {cameraOn ? "Turn Off Camera" : "Turn On Camera"}
                            </button>
                            <button className="btn" onClick={handleScreenSharing}>
                                {screenSharing ? "Stop Sharing" : "Share Screen"}
                            </button>
                        </div>
                        <button id="endConnection"
                            onClick={() => {
                                setActiveConnection(false);
                                // navigate('/');
                            }}> Disconnect
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RoomHost;
