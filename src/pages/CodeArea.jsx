import React, { useEffect, useState } from 'react'
import Header from '../components/basic/Header'


import CodeMirror from '@uiw/react-codemirror';

import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import CustomDropdown from '../components/basic/CustomDropDown';
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import axiosInstance from '../utils/AxiosInstance';

import { autocompletion, completeFromList } from '@codemirror/autocomplete';
import { closeBrackets } from '@codemirror/autocomplete';



const options = [
    { value: 'c', label: 'C' },
    { value: 'cpp', label: 'C++' },
    { value: 'java', label: 'Java' },
    { value: 'python', label: 'Python' }
];

const CodeArea = () => {


    const boilerplateCode = (lang) => {
        switch (lang) {
            case 'java':
                return `class TempCode {
  
}`;
            case 'cpp':
                return `class TempCode {
 
}`;
            default:
                return '';
        }
    };


    const [runCodeLoading, setRunCodeLoading] = useState(false);
    const [language, setLanguage] = useState('java'); // Default to java
    const [input, setInput] = useState(''); // New state for user input
    const [output, setOutput] = useState('');
    const [metrics, setMetrics] = useState({ time: '', memory: '' });
    // const [code, setCode] = useState("");
    const [code, setCode] = useState(boilerplateCode('java'));


    // function extractClassName(code) {
    //     const classNameMatch = code.match(/class\s+(\w+)/);
    //     return classNameMatch ? classNameMatch[1] : null;
    // }
    function extractClassName(code) {
        // Regex to match the class that contains the main method
        const mainClassMatch = code.match(/class\s+(\w+)\s+.*\{[^]*?public\s+static\s+void\s+main\s*\(\s*String\s*\[\s*\]\s*args\s*\)\s*\{[^]*?\}/);

        // If a class with the main method is found, return its name
        if (mainClassMatch) {
            return mainClassMatch[1];
        }

        // Otherwise, return null
        return null;
    }


    const runCode = () => {


        const className = "TestCode";

        if (className == null) {
            console.log('Error: No class with main method found in your code.');
            setOutput('Error: No class with main method found in your code.');
            return;
        }

        console.log('class name=', className);


        const codepost = convertJavaToJSString(code);


        setRunCodeLoading(true)
        axiosInstance.post('http://localhost:3010/api/v1/compiler/execute', { language, code: codepost, input, className })
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


    //Suggestions
    const javaKeywords = [
        // Java Keywords
        'abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class',
        'const', 'continue', 'default', 'do', 'double', 'else', 'enum', 'extends', 'final',
        'finally', 'float', 'for', 'goto', 'if', 'implements', 'import', 'instanceof', 'int',
        'interface', 'long', 'native', 'new', 'null', 'package', 'private', 'protected',
        'public', 'return', 'short', 'static', 'strictfp', 'super', 'switch', 'synchronized',
        'this', 'throw', 'throws', 'transient', 'try', 'void', 'volatile', 'while',
        'true', 'false',

        // Java Built-in Classes
        'String', 'StringBuilder', 'StringBuffer', 'Object', 'Class', 'System', 'Runtime', 'Thread',
        'Throwable', 'Exception', 'RuntimeException', 'Error', 'Integer', 'Long', 'Short', 'Byte',
        'Float', 'Double', 'Character', 'Boolean', 'Math', 'Enum', 'Void', 'Process', 'ThreadGroup',
        'Package', 'SecurityManager', 'StackTraceElement', 'Throwable', 'Exception', 'RuntimeException',

        // Java.util Classes
        'ArrayList', 'LinkedList', 'HashMap', 'HashSet', 'TreeMap', 'TreeSet', 'Hashtable', 'Vector',
        'Stack', 'Queue', 'Deque', 'PriorityQueue', 'Arrays', 'Collections', 'Calendar', 'Date',
        'TimeZone', 'UUID', 'Optional', 'Scanner', 'Random',

        // Java.io Classes
        'File', 'InputStream', 'OutputStream', 'FileInputStream', 'FileOutputStream', 'BufferedReader',
        'BufferedWriter', 'PrintWriter', 'ObjectInputStream', 'ObjectOutputStream', 'Serializable',
        'Reader', 'Writer', 'FileReader', 'FileWriter', 'PrintStream', 'FileDescriptor',

        // Java.nio Classes
        'ByteBuffer', 'CharBuffer', 'IntBuffer', 'ShortBuffer', 'LongBuffer', 'MappedByteBuffer',
        'FileChannel', 'Path', 'Paths', 'Files',

        // Java.net Classes
        'URL', 'URI', 'InetAddress', 'Socket', 'ServerSocket', 'HttpURLConnection',

        // Java.sql Classes
        'DriverManager', 'Connection', 'Statement', 'PreparedStatement', 'ResultSet', 'SQLException',
        'Date', 'Time', 'Timestamp',

        // Java.time Classes
        'LocalDate', 'LocalTime', 'LocalDateTime', 'ZonedDateTime', 'Duration', 'Period', 'Instant',
        'ZoneId', 'OffsetDateTime', 'Year', 'Month', 'DayOfWeek',

        // Java Built-in Interfaces
        'Runnable', 'Comparable', 'CharSequence', 'Cloneable', 'AutoCloseable', 'List', 'Set', 'Map',
        'Queue', 'Deque', 'Iterator', 'Collection', 'Comparator', 'Enumeration', 'Closeable',
        'DataInput', 'DataOutput', 'Flushable', 'Readable', 'Serializable', 'ReadableByteChannel',
        'WritableByteChannel', 'Key', 'PrivateKey', 'PublicKey', 'Principal', 'Temporal',
        'TemporalAccessor', 'TemporalAdjuster', 'TemporalAmount', 'Chronology', 'ChronoLocalDate',
        'ChronoLocalDateTime',

        // Notable Annotations
        'Override', 'Deprecated', 'SuppressWarnings', 'FunctionalInterface', 'SafeVarargs', 'Retention',
        'Target', 'Inherited', 'Documented',

        //
        'out', 'print', 'println'
    ];



    const customCompletions = completeFromList(
        javaKeywords.map(javaKeywords => ({ label: javaKeywords }))
    );


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
                        extensions={[
                            getLanguageExtension(language),
                            autocompletion({ override: [customCompletions] }), // Add autocompletion
                            closeBrackets()   // Optional: Automatically close brackets and quotes
                        ]}
                        onChange={(value) => setCode(value)}
                        theme={oneDark}
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