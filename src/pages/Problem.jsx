import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { FaArrowCircleLeft, FaCircleNotch } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Header from '../components/basic/Header';
import CodingPlayground from '../components/problem/CodingPlayground';





import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import CustomDropdown from '../components/basic/CustomDropDown';
import toast from 'react-hot-toast';
import axiosInstance from '../utils/AxiosInstance';



const options = [
    { value: 'c', label: 'C' },
    { value: 'cpp', label: 'C++' },
    { value: 'java', label: 'Java' },
    { value: 'python', label: 'Python' }
];

const Problem = () => {
    const params = useParams();
    const [runCodeLoading, setRunCodeLoading] = useState(false);
    const [problem, setProblem] = useState({});
    const [loading, setLoading] = useState(false);

    const [testCasesResult, setTestCaseResult] = useState([]);

    //Code By T
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('java'); // Default to java
    const [input, setInput] = useState(''); // New state for user input
    const [output, setOutput] = useState('');
    const [metrics, setMetrics] = useState({ time: '', memory: '' });
    const [customInput, setCustomInput] = useState(false);
    const [outputBox, setOutputBox] = useState(false);


    const runCodeWithTestCase = async (id) => {
        const codepost = convertJavaToJSString(code);
        setRunCodeLoading(true)
        axiosInstance.post(`http://localhost:3010/api/v1/question/run/${id}`, { language, code: codepost })
            .then(response => {
                console.log(response);
                setTestCaseResult(response.data);
                toast.success("Output Came");
            })
            .catch(error => {
                setOutput('Error:  ' + error);
                setMetrics({ time: '', memory: '' });
                toast.error("Error Occured");
            }).finally(() => setRunCodeLoading(false));
    }


    const runCode = () => {
        // console.log(code);
        // const codepost=`${code}`;
        const codepost = convertJavaToJSString(code);

        console.log(codepost, input);
        setRunCodeLoading(true)
        axiosInstance.post('http://localhost:3010/api/v1/compiler/execute', { language, code: codepost, input })
            .then(response => {
                console.log(response);
                setOutput(response.data.output);
                setMetrics({
                    time: response.data.executionTime,
                    memory: response.data.memoryUsed
                });
                toast.success("Output Came");
            })
            .catch(error => {
                setOutput('Error:  ' + error);
                setMetrics({ time: '', memory: '' });
                toast.error("Error Occured");
            }).finally(() => setRunCodeLoading(false));
    };

    function convertJavaToJSString(javaCode) {
        // Step 1: Remove newlines and excessive whitespace
        const singleLineCode = javaCode.replace(/\s+/g, ' ').trim();

        // Step 2: Escape double quotes and backslashes
        const jsCompatibleString = singleLineCode
            .replace(/\\/g, '\\\\')  // Escape backslashes
        // .replace(/"/g, '\\"');   // Escape double quotes

        return jsCompatibleString;
    }

    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        setLanguage(selectedLanguage);
    };

    const getLanguageExtension = (lang) => {
        switch (lang) {
            case 'c':
                return cpp();
            case 'cpp':
                return cpp();
            case 'java':
                return java();
            case 'python':
                return python();
            default:
                return cpp(); // Default to C++ if no match
        }
    };


    const fetchQuestionDetails = async (id) => {
        setLoading(true);
        if (!id) {
            console.error('No ID provided to fetch question details.');
            return null;
        }

        try {
            // Show loading indicator if necessary
            console.log(`Fetching details for question ID: ${id}...`);

            const response = await axiosInstance.get(`http://localhost:3010/api/v1/question/${id}`);

            // Handle success
            if (response.status === 200) {
                console.log('Question details fetched successfully:', response.data);
                setProblem(response.data);
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
        fetchQuestionDetails(params.problemid);
    }, [])


    return (
        <>
            <Header />
            {
                loading === true ?
                    <div className='font-helvetica flex text-2xl text-white px-16 pt-4 pb-3'>
                        <div className='flex gap-4 items-center'>Loading <AiOutlineLoading3Quarters className='text-lg loading-spin' /></div>
                    </div>
                    :
                    Object.keys(problem).length === 0 ?
                        <div className="font-helvetica flex text-2xl text-white px-16 pt-4 pb-3">
                            <div className='flex grow-0 items-center gap-4'>
                                <NavLink to={`/problemstatements`}><FaArrowCircleLeft className='text-2xl text-primary' /></NavLink>
                                Sorry could not load the question
                            </div>
                        </div> :
                        <div className="h-[84%] font-helvetica flex flex-col gap-4 text-white px-16 pt-4 pb-3">
                            <div className='h-[10%] flex gap-8 items-center col-span-2'>
                                <div className='w-1/2 flex gap-4 items-center'>
                                    <NavLink to={`/problemstatements`}><FaArrowCircleLeft className='text-2xl text-primary' /></NavLink>
                                    <div className={`text-4xl flex items-center gap-4`}>{problem.title} <span className={`p-2 rounded text-xs border ${problem.difficulty == 'Easy' ? 'border-primary' : problem.difficulty == 'Medium' ? 'border-blue-400' : 'border-red-400'}`}>{problem.difficulty}</span></div>
                                </div>
                                <div className='w-1/2 flex items-center justify-between'>
                                    {/* <div className='border border-gray-200 py-1 px-8 rounded-md'>Select</div> */}
                                    {/* Language Selector */}
                                    <div className="flex items-center">
                                        <label htmlFor="language" className="mr-2 text-sm">Select Language :</label>
                                        <CustomDropdown
                                            options={options}
                                            value={language}
                                            onChange={setLanguage}
                                        />
                                    </div>
                                    <div className='bg-blue-600 h-10 w-24 flex justify-center items-center rounded-md active:bg-blue-800 cursor-pointer' onClick={() => {
                                        if (customInput) runCode();
                                        else runCodeWithTestCase(problem._id);
                                    }
                                    }>{runCodeLoading ? <AiOutlineLoading3Quarters className='text-lg loading-spin' /> : "Run Code"}</div>
                                </div>
                            </div>
                            <div className='h-[90%] flex gap-8'>
                                <div className='w-1/2 flex flex-col text-justify overflow-scroll problem-statement'>
                                    <span className='text-2xl font-semibold mt-2 text-gray-400 font-plex-mono '>Description</span>
                                    {problem.description}
                                    <span className='text-2xl font-semibold mt-4 text-gray-400 font-plex-mono'>Constraints</span>
                                    <div className='flex flex-col'>
                                        {
                                            problem.constraints.map((ele, i) => (
                                                <div key={i}>
                                                    {i + 1} {ele}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>

                                {/* <textarea className="vscode-textarea" placeholder="Start typing..."></textarea> */}
                                <CodingPlayground code={code} setCode={setCode} language={language} input={input} setInput={setInput} output={output} metrics={metrics} getLanguageExtension={getLanguageExtension} customInput={customInput} setCustomInput={setCustomInput} testCasesResult={testCasesResult} />
                            </div>
                        </div>
            }
        </>
    )
}

export default Problem