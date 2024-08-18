import React, { useState } from 'react';

const Discussion = ({comments,addComment}) => {
    const [comment,setComment] = useState("");
  return (
    <div className="max-w-4xl mx-auto p-4 w-full">
      {/* Discussion Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Discussions ({comments.length} Threads)</h2>
      </div>

      {/* Input Section */}
      <div className=" p-4 rounded-lg mb-6 bg-gray-800 text-white">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
          <div className="flex-1">
            <textarea
            value={comment}
              placeholder="You can share approaches and techniques in the comment."
              className="w-full h-16 p-2 bg-gray-900 rounded-lg text-white text-sm"
              onChange={(e)=>setComment(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-2">
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg" onClick={(e)=>{addComment(comment);setComment("")}}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comment */}
      {
        comments.map((comment, index) => (
            <div className=" p-4 rounded-lg bg-gray-800 text-white mb-6" key={index}>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{comment.username}</h3>
                  <span className="text-sm text-gray-400">{new Date(comment.time).toLocaleDateString()}</span>
                </div>
                <p className="text-sm">
                  <strong>Hi Coders,</strong>
                  <br />
                  <br />
                  <strong>Only Solution 🧩 Explanation + Approches 🧠</strong>
                  <br />
                  <br />
                 {comment.discussion}
                 
                </p>
                
              </div>
            </div>
          </div>
        ))
      
      
}
    </div>
      
  );
};

export default Discussion;
