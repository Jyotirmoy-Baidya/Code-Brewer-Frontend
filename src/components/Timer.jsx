import React, { useEffect, useState } from 'react'

const Timer = ({ endTime }) => {
    const calculateTimeLeft = () => {
        const difference = new Date(endTime) - new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());


    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(timer);
    }, [endTime]);

    return (
        <>
            {
                new Date(endTime) < new Date() ? <div className='py-2 bg-red-600 text-black px-4 rounded-md  tracking-wide'>Contest Ended...</div> :
                    <>
                        <div className='tracking-wide'>Time Left :</div>
                        <div className='text-3xl text-primary font-bold tracking-widest'>{timeLeft.hours}<span className='text-xl'>hr </span> {timeLeft.minutes}<span className='text-xl'>min </span> {timeLeft.seconds}<span className='text-xl'>sec</span></div>
                    </>
            }
        </>
    )
}

export default Timer