import React from 'react';
const Podium = ({ players }) => {
    if (players.length < 3) return null; // Ensure there are at least 3 players

    return (
        <div className="flex text-black font-plex-mono justify-center items-end gap-8 mt-12">
            {
                players.length > 1 &&
                <div className="flex flex-col justify-end items-center w-24 p-4 bg-gray-200 rounded-t-lg h-40">
                    <div className="text-lg font-bold">2nd</div>
                    <div className="mt-2 text-lg">{players[1].name}</div>
                    <div className="mt-1 text-sm">{players[1].questionSolved} solved</div>
                </div>
            }
            {
                players.length > 0 &&
                <div className="flex flex-col justify-end items-center w-24 p-4 bg-yellow-400 rounded-t-lg h-52">
                    <div className="text-lg font-bold">1st</div>
                    <div className="mt-2 text-lg">{players[0].name}</div>
                    <div className="mt-1 text-sm">{players[0].questionSolved} solved</div>
                </div>
            }
            {
                players.length > 2 &&
                <div className="flex flex-col justify-end items-center w-24 p-4 bg-[#cd7f32] rounded-t-lg h-32">
                    <div className="text-lg font-bold">3rd</div>
                    <div className="mt-2 text-lg">{players[2].name}</div>
                    <div className="mt-1 text-sm">{players[2].questionSolved} solved</div>
                </div>
            }
        </div>
    );
};

export default Podium;
