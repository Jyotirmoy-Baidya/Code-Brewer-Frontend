import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';

function CodingPlayground({ code, setCode, language, input, setInput, output, metrics, getLanguageExtension, customInput, setCustomInput }) {

  return (
    <div className="w-1/2 p-2 h-auto flex flex-col gap-2 bg-primary-black text-white overflow-scroll design-scrollbar">
      {/* Code Editor */}
      <div className='w-full h-96'>
        <CodeMirror
          value={code}
          // height='100%'
          extensions={[getLanguageExtension(language)]}
          theme={oneDark}
          onChange={(value) => setCode(value)}
          className="text h-full min-h-96 bg-gray-800 overflow-scroll design-scrollbar"
        />
      </div>

      {/* Input, Output*/}
      {/* Input Section */}
      <label htmlFor="Option3" className="flex cursor-pointer items-start gap-2">
        <div className="flex items-center">
          &#8203;
          <input type="checkbox" className="size-4 rounded border-gray-300" id="Option3" onClick={() => setCustomInput(!customInput)} />
        </div>
        <div>
          <strong className="font-medium text-sm text-gray-200"> Custom Input </strong>
        </div>
      </label>
      {
        customInput &&
        <>
          <div className='min-h-48 flex flex-col'>
            <h2 className="text-lg mb-1 font-medium">Input :</h2>
            <textarea
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-gray-800 outline-none p-2 rounded w-full mb-4 resize-none h-[100%] overflow-scroll design-scrollbar"
            />
          </div>
        </>
      }
      {/* Output Section */}
      <div className='min-h-48 flex flex-col'>
        <h2 className="text-lg mb-1 font-medium">Output:</h2>
        <div className="bg-gray-800 outline-none p-2 rounded w-full mb-4 h-full overflow-scroll design-scrollbar"><pre>{output}</pre></div>
      </div>





      {/* Metrics Section */}
      <div className='flex flex-col'>
        <h2 className="text-lg mb-1 font-medium">Metrics</h2>
        <p className='text-sm text-gray-300'>Execution Time : &nbsp; {metrics.time}</p>
        <p className='text-sm text-gray-300'>Memory Usage : &nbsp; {metrics.memory}</p>
      </div>
    </div>
  );
}

export default CodingPlayground;