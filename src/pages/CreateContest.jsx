import React, { useEffect, useState } from 'react'
import Header from '../components/basic/Header'
import { NavLink } from 'react-router-dom'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'
import { IoSearch } from 'react-icons/io5'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import axiosInstance from '../utils/AxiosInstance'
import toast from 'react-hot-toast'
import ShowContestCode from '../components/ShowContestCode'

const CreateContest = () => {
    const [title, setTitle] = useState("");
    const [endTime, setEndTime] = useState('');
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [problemStatementList, setProblemStatementList] = useState([]);

    const [selectedProblemStatements, setSelectedProblemStatementList] = useState([]);

    const [code, setCode] = useState("");
    const [showCodePopUp, setShowCodePopUp] = useState(false);


    //Fetching all problem statements
    const fetchAllQuestions = async () => {
        try {
            // Show loading indicator if necessary
            console.log('Fetching questions...');
            setLoading(true);

            const response = await axiosInstance.get('http://localhost:3010/api/v1/question/all');
            console.log(response);

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

    const createContest = async () => {
        // Validate the inputs
        if (!title || !endTime || !selectedProblemStatements || selectedProblemStatements.length === 0) {
            toast.error("Please fill all the fields");
            return; // Exit the function if validation fails
        }

        const questions = selectedProblemStatements.map(problem => problem._id);
        setCreateLoading(true);
        try {
            // Set startTime to the current time
            const startTime = new Date().toISOString();

            // Construct the request body
            const requestBody = {
                title,
                startTime,
                endTime,
                questions
            };


            // Send POST request to the backend to create the contest
            const response = await axiosInstance.post('http://localhost:3010/api/v1/contest/add', requestBody);

            setCode(response.data);
            // Handle the response 
            toast.success('New Contest Created', {
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
            setShowCodePopUp(true);

        } catch (error) {
            console.error('Error creating contest:', error);
        } finally {
            setCreateLoading(false);
        }
    };


    return (
        <>
            <Header />
            <div className="max-h-[84%] font-helvetica flex flex-col gap-4 text-white px-16 pt-7 pb-3">
                <div className='flex items-center gap-4'>
                    <NavLink to={`/contests`}><FaArrowCircleLeft className='text-2xl text-primary' /></NavLink>
                    <div className='text-4xl'>Create Contest</div>
                    <button className='text-lg bg-yellow-400 font-plex-mono px-4 py-2 text-black ms-auto rounded-md h-12 w-44 flex justify-center items-center' onClick={() => createContest()}>
                        {createLoading ? <AiOutlineLoading3Quarters className='text-lg loading-spin' /> :
                            "Create Contest"}
                    </button>
                </div>

                <hr />

                <div className='flex gap-4'>
                    {/* Left section for the contest  */}
                    <div className='w-1/2 grow flex flex-col gap-2 pe-10'>
                        <div className='w-full flex flex-col'>
                            <div className='flex items-center justify-between'>
                                <div className='text-2xl mb-2'>Contest Name</div>
                                <div className='flex items-center gap-2 pt-1 pb-3'>
                                    <div className=''>EndTime:</div>
                                    <input
                                        type="datetime-local"
                                        id="contest-date"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        className="text-lg w-full p-2 bg-slate-800 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <input type="text" className='py-2 px-2 rounded-sm bg-transparent outline-none border border-gray-500  focus:border-primary focus:shadow focus:shadow-primary' placeholder='Contest Name' onChange={(e) => setTitle(e.target.value)} value={`${title}`} />
                        </div>

                        <hr />
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
                                                    <div key={i} className=' border-l border-r border-blue-400 h-24 rounded-lg flex items-center justify-between px-4 py-4 shadow shadow-blue-400 active:shadow-none bg-primary-black'>
                                                        <div className=' flex flex-col gap-2'>
                                                            <div className='text-lg font-bold tracking-wider uppercase'>{problem.title}</div>
                                                            <div className={`text-xs ${problem.difficulty == 'Easy' ? 'text-primary' : problem.difficulty == 'Medium' ? 'text-blue-400' : 'text-red-400'} flex`}>{problem.difficulty}</div>
                                                        </div>
                                                        <div className='border py-2 px-3 rounded-md bg-blue-50 bg-opacity-10 tracking-wider font-plex-mono text-blue-400 cursor-pointer' onClick={() => selectProblemForContest(problem)} >Select</div>
                                                    </div>
                                                )
                                        })
                            }
                        </div>
                    </div>

                </div>


            </div>
            {showCodePopUp && <ShowContestCode code={code} setShowCodePopUp={setShowCodePopUp} />}
        </>
    )
}

export default CreateContest