import React, { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { FaArrowCircleLeft, FaCircleNotch } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Header from '../components/basic/Header';

const problem = {
    name: "Maximum Sum",
    difficulty: "Medium",
    problemId: 101
}

const Problem = () => {
    const params = useParams();
    const [runCodeLoading, setRunCodeLoading] = useState(false);
    const triggerLoading = () => {
        setRunCodeLoading(true);
        setTimeout(() => {
            setRunCodeLoading(false);
        }, 3000); // 3000ms = 3 seconds
    };
    return (
        <>
            <Header />
            <div className="h-[84%] font-helvetica flex flex-col gap-4 text-white px-16 pt-7 pb-3">
                <div className='h-[10%] flex gap-8 items-center col-span-2'>
                    <div className='w-1/2 flex gap-4 items-center'>
                        <NavLink to={`/problemstatements`}><FaArrowCircleLeft className='text-2xl text-primary' /></NavLink>
                        <div className={`text-4xl flex items-center gap-4`}>{problem.name} <span className={`p-2 rounded text-xs border ${problem.difficulty == 'Easy' ? 'border-primary' : problem.difficulty == 'Medium' ? 'border-blue-400' : 'border-red-400'}`}>{problem.difficulty}</span></div>
                    </div>
                    <div className='w-1/2 flex items-center justify-between'>
                        <div className='border border-gray-200 py-1 px-8 rounded-md'>Select</div>
                        <div className='bg-blue-600 h-10 w-24 flex justify-center items-center rounded-md active:bg-blue-800' onClick={() => triggerLoading()}>{runCodeLoading ? <AiOutlineLoading3Quarters className='text-lg loading-spin' /> : "Run Code"}</div>
                    </div>
                </div>
                <div className='h-[90%] flex gap-8'>
                    <div className='w-1/2 text-justify overflow-scroll problem-statement'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum voluptates aperiam, odit blanditiis vitae ullam modi error voluptas non magni, doloremque asperiores rerum tenetur odio eius libero architecto consequatur officia ipsam, rem dignissimos in? Est, nobis asperiores? Quod minima quaerat labore voluptatibus unde veritatis vero illo, recusandae voluptatum, impedit in tempora, quisquam nesciunt ipsa ratione at corrupti dignissimos laudantium. Eos, magnam! Officiis, cumque suscipit ipsum repudiandae maxime asperiores nisi, ea, illo quisquam nihil voluptate. Placeat ex enim temporibus, totam iste, laudantium nulla asperiores sit ipsum nemo, fugiat natus et quasi incidunt. Numquam, eum delectus! Praesentium maiores saepe architecto beatae corporis iusto soluta? Ipsa, quia? Ea rem delectus culpa blanditiis a quisquam unde amet distinctio veniam veritatis, eligendi velit error odit. Sit, fuga illo? Magni suscipit rerum soluta numquam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, incidunt qui. Aliquam dolor temporibus quod est vel voluptatibus nobis tempora placeat ipsam quos amet saepe error magni dicta, eligendi laudantium! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque et minima quam quisquam laudantium, nulla, consequatur officia pariatur optio sit culpa voluptatum sint magni. At autem cumque, numquam consequatur repudiandae eius? Quisquam, alias perspiciatis adipisci et repellendus architecto illum delectus! Expedita hic in dignissimos ullam debitis culpa doloremque aut repudiandae tempora, incidunt et atque asperiores ut nihil temporibus laborum laboriosam ratione rerum dolorum id cumque velit. Animi, repudiandae quod omnis quis assumenda officia, modi iure voluptates maiores sapiente magnam impedit repellendus praesentium eligendi? Perferendis reprehenderit incidunt odit! Nihil, debitis. Eius eaque quos et soluta deserunt illum distinctio, ex optio, dignissimos corrupti consectetur veniam mollitia sint id facilis ipsum illo expedita quae facere voluptatem exercitationem rerum magni. Vel atque exercitationem facilis.</div>
                    <textarea className="vscode-textarea" placeholder="Start typing..."></textarea>
                </div>
            </div>
        </>
    )
}

export default Problem