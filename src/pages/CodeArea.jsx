import React, { useState } from 'react'
import Header from '../components/basic/Header'


import CodeMirror from '@uiw/react-codemirror';



import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import axios from 'axios';
import CustomDropdown from '../components/basic/CustomDropDown';
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';



const options = [
    { value: 'c', label: 'C' },
    { value: 'cpp', label: 'C++' },
    { value: 'java', label: 'Java' },
    { value: 'python', label: 'Python' }
];

const CodeArea = () => {

    const [runCodeLoading, setRunCodeLoading] = useState(false);
    //Code By T
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('java'); // Default to java
    const [input, setInput] = useState(''); // New state for user input
    const [output, setOutput] = useState('');
    const [metrics, setMetrics] = useState({ time: '', memory: '' });
    const [customInput, setCustomInput] = useState(false);

    const runCode = () => {
        // console.log(code);
        // const codepost=`${code}`;
        const codepost = convertJavaToJSString(code);


        setRunCodeLoading(true)
        axios.post('http://localhost:3010/api/v1/compiler/execute', { language, code: codepost, input })
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

    const renCodeOnTestCases = async () => {

    }

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


    return (
        <>
            <Header />
            <div className="max-h-[84%] h-[84%] flex gap-4 text-white px-16 pt-3 pb-3">
                <div className='w-1/2 flex flex-col gap-4'>
                    <div className='w-full flex items-center justify-between'>
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
                        <div className='bg-blue-600 h-10 w-24 flex justify-center items-center rounded-md active:bg-blue-800 cursor-pointer' onClick={() => runCode()}>{runCodeLoading ? <AiOutlineLoading3Quarters className='text-lg loading-spin' /> : "Run Code"}</div>
                    </div>
                    <CodeMirror
                        value={code}
                        extensions={[getLanguageExtension(language)]}
                        theme={oneDark}
                        onChange={(value) => setCode(value)}
                        className="text-lg h-[100%] max-h-[100%] bg-gray-800 overflow-scroll design-scrollbar"
                    />
                </div>
                <div className='w-1/2'>
                    <div className='min-h-64 flex flex-col'>
                        <h2 className="text-lg mb-1 font-medium">Input</h2>
                        <textarea
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="grow bg-gray-800 outline-none p-2 rounded w-full mb-4 resize-none h-full overflow-scroll design-scrollbar"
                        />
                    </div>



                    {/* Output Section */}
                    <div className='min-h-64 flex flex-col'>
                        <h2 className="text-lg mb-1 font-medium">Output</h2>
                        <div className="grow bg-gray-800 outline-none p-2 rounded w-full mb-4 h-full overflow-scroll design-scrollbar"><pre>{output}</pre></div>
                    </div>

                    {/* Metrics Section */}
                    <div className='flex flex-col'>
                        <h2 className="text-lg mb-1 font-medium">Metrics</h2>
                        <p className='text-sm text-gray-300'>Execution Time : &nbsp; {metrics.time}</p>
                        <p className='text-sm text-gray-300'>Memory Usage : &nbsp; {metrics.memory}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CodeArea