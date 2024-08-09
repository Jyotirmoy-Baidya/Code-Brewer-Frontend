import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';

function CodingPlayground({ code, setCode, language, setLanguage, input, setInput, output, setOutput, metrics, setMetrics, runCode, handleLanguageChange, getLanguageExtension }) {


  // const runCode = () => {
  //   // console.log(code);
  //   // const codepost=`${code}`;
  //   const codepost = convertJavaToJSString(code);

  //   console.log(codepost);
  //   axios.post('http://localhost:3010/api/v1/compiler/execute', { language, code: codepost, input })
  //     .then(response => {
  //       console.log(response);
  //       setOutput(response.data.output);
  //       setMetrics({
  //         time: response.data.executionTime,
  //         memory: response.data.memoryUsed
  //       });
  //     })
  //     .catch(error => {
  //       setOutput('Error:  ' + error);
  //       setMetrics({ time: '', memory: '' });
  //     });
  // };




  return (
    <div className="w-1/2 p-2 flex flex-col bg-primary-black text-white overflow-scroll design-scrollbar">
      {/* Code Editor */}
      <CodeMirror
        value={code}
        extensions={[getLanguageExtension(language)]}
        theme={oneDark}
        onChange={(value) => setCode(value)}
        className="text-lg h-full min-h-[80%] design-scrollbar"
      />

      {/* Input, Output*/}
      <div className="w-full p-4 flex flex-col">


        {/* Input Section */}
        <div>
          <h2 className="text-xl font-bold mb-2">Input :</h2>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded w-full mb-4"
          />
        </div>

        {/* Output Section */}
        <div >
          <h2 className="text-xl font-bold mb-2 ">Output:</h2>
          <div className="bg-gray-800 p-4 rounded mb-4 overflow-x-scroll"><pre>{output}</pre></div>
        </div>

        {/* Metrics Section */}
        <div>
          <h2 className="text-xl font-bold mb-2">Metrics:</h2>
          <p>Execution Time : &nbsp; {metrics.time}</p>
          <p>Memory Usage : &nbsp; {metrics.memory}</p>
        </div>
      </div>
    </div>
  );
}

export default CodingPlayground;