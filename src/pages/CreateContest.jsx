import React, { useEffect, useState } from 'react'
import Header from '../components/basic/Header'
import { NavLink } from 'react-router-dom'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'
import { IoSearch } from 'react-icons/io5'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import axiosInstance from '../utils/AxiosInstance'

const CreateContest = () => {
    const [title, setTitle] = useState("");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [problemStatementList, setProblemStatementList] = useState([]);

    const [selectedProblemStatements, setSelectedProblemStatementList] = useState([]);

    //Fetching all problem statements
    const fetchAllQuestions = async () => {
        try {
            // Show loading indicator if necessary
            console.log('Fetching questions...');
            setLoading(true);

            const response = await axiosInstance.get('http://localhost:3010/api/v1/question/all');

            // Handle success
            if (response.status === 200) {
                console.log('Questions fetched successfully:', response.data);
                setProblemStatementList(response.data); // Return the data for further use
            } else {
                console.error('Unexpected response code:', response.status);
                return null;
            }
        } catch (error) {
            // Handle error
            if (error.response) {
                console.error('Server responded with an error:', error.response.data);
            } else if (error.request) {
                console.error('Request made, but no response received:', error.request);
            } else {
                console.error('Error in setting up the request:', error.message);
            }
            return null; // Return null to signify the failure
        } finally {
            // Hide loading indicator if necessary
            setLoading(false);
            console.log('Fetching complete.');
        }
    };

    useEffect(() => {
        fetchAllQuestions();
    }, [])


    //Select Problems For Contest
    const selectProblemForContest = (problem) => {
        if (selectedProblemStatements.includes(problem)) {
            setSelectedProblemStatementList(selectedProblemStatements.filter(p => p !== problem));
        } else {
            setSelectedProblemStatementList([...selectedProblemStatements, problem]);
        }
    }

    //Deselecting the problem from the contet
    const deselectProblemFromContest = (problem) => {
        if (selectedProblemStatements.includes(problem)) {
            setSelectedProblemStatementList(selectedProblemStatements.filter(p => p !== problem));
        }
    };


    return (
        <>
            <Header />
            <div className="max-h-[84%] font-helvetica flex flex-col gap-4 text-white px-16 pt-7 pb-3">
                <div className='flex items-center gap-4'>
                    <NavLink to={`/contests`}><FaArrowCircleLeft className='text-2xl text-primary' /></NavLink>
                    <div className='text-4xl'>Create Contest</div>
                    <button className='text-lg bg-yellow-400 font-plex-mono px-4 py-2 text-black ms-auto rounded-md'>Create Contest</button>
                </div>

                <hr />

                <div className='flex gap-4'>
                    {/* Left section for the contest  */}
                    <div className='w-1/2 border-r-2 border-double grow pe-10'>
                        <div className='h-24 w-full flex flex-col'>
                            <div className='text-2xl mb-2'>Contest Name</div>
                            <input type="text" className='py-2 px-2 rounded-sm bg-transparent outline-none border border-gray-500  focus:border-primary focus:shadow focus:shadow-primary' placeholder='Contest Name' onChange={(e) => setTitle(e.target.value)} value={`${title}`} />
                        </div>

                        {/* selected problems  */}
                        <div className='max-h-96 pt-1 pb-3 flex flex-col overflow-scroll gap-4 design-scrollbar'>
                            {selectedProblemStatements.map((problem, i) => (
                                <div key={i} className=' border-l border-r border-primary h-24 rounded-lg flex items-center justify-between px-4 py-4 shadow shadow-primary active:shadow-none'>
                                    <div className=' flex flex-col gap-2'>
                                        <div className='text-lg font-bold tracking-wider uppercase'>{problem.title}</div>
                                        <div className={`text-xs ${problem.difficulty == 'Easy' ? 'text-primary' : problem.difficulty == 'Medium' ? 'text-blue-400' : 'text-red-400'} flex`}>{problem.difficulty}</div>
                                    </div>
                                    <div className='border py-2 px-3 rounded-md bg-red-100 bg-opacity-10 tracking-wider font-plex-mono text-red-400 cursor-pointer' onClick={() => deselectProblemFromContest(problem)} >DeSelect</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* right section for all the problem statement  */}
                    <div className='w-1/2'>
                        <div className="flex gap-4">
                            <input type="text" className='grow px-4 py-2 rounded-md text-lg uppercase tracking-wider outline-none border border-white focus:border-primary bg-transparent text-primary' placeholder='Search Problems' onChange={(e) => setSearch(e.target.value)} value={search} />
                            <button className='text-primary text-2xl'><IoSearch /></button>
                        </div>

                        <div className="max-h-[27rem] p-2 pt-4 grow flex flex-col gap-10 overflow-scroll design-scrollbar problem-list">
                            {
                                loading === true ?
                                    <div className='flex text-xl gap-4 items-center'>Fetching questions<AiOutlineLoading3Quarters className='text-lg loading-spin' /></div> :
                                    problemStatementList
                                        .filter(problem => !selectedProblemStatements.includes(problem))
                                        .map((problem, i) => {
                                            if (problem.title.toUpperCase().includes(search.toUpperCase()))
                                                return (
                                                    <div key={i} className=' border-l border-r border-blue-400 h-24 rounded-lg flex items-center justify-between px-4 py-4 shadow shadow-blue-400 active:shadow-none'>
                                                        <div className=' flex flex-col gap-2'>
                                                            <div className='text-lg font-bold tracking-wider uppercase'>{problem.title}</div>
                                                            <div className={`text-xs ${problem.difficulty == 'Easy' ? 'text-primary' : problem.difficulty == 'Medium' ? 'text-blue-400' : 'text-red-400'} flex`}>{problem.difficulty}</div>
                                                        </div>
                                                        <div className='border py-2 px-3 rounded-md bg-blue-50 bg-opacity-10 tracking-wider font-plex-mono text-blue-400' onClick={() => selectProblemForContest(problem)} >Select</div>
                                                    </div>
                                                )
                                        })
                            }
                        </div>
                    </div>

                </div>


            </div >
        </>
    )
}

export default CreateContest