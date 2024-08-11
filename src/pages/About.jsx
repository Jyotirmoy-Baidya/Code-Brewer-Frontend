import React from 'react';
import Header from '../components/basic/Header';
import NavigateToContest from '../components/NavigateToContest';
const About = () => {
  return (
    <>
      <NavigateToContest />
      <Header />
      <section className="bg-black py-10 px-8 font-helvetica text-white">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-5 text-center text-primary tracking-wide font-helvetica">About Our Platform</h2>
          <p className="leading-relaxed text-lg tracking-wider mb-10 text-center max-w-3xl mx-auto">
            Welcome to the ultimate online coding platform where innovation meets execution! Our platform empowers developers and enthusiasts alike to sharpen their coding skills, solve challenging problems, and compete with peers in a dynamic environment.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Coding Playground */}
            <div className="bg-slate-900 text-white p-4 rounded-md shadow-xl transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-bold mb-2 text-primary">Code Area</h3>
              <p className="tracking-wide">
                Explore, experiment, and execute! The Coding Playground is your space to play with code, experiment with different inputs, and witness real-time execution. Analyze errors, view outputs, and track your code's performance with detailed metrics.
              </p>
            </div>

            {/* Coding Arena */}
            <div className="bg-slate-900 text-white p-4 rounded-md shadow-xl transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-bold mb-2 text-primary">Problem Statements</h3>
              <p className="tracking-wide">
                Hone your skills in the Problem Statements area by solving a variety of coding problems. Whether you're a beginner or an expert, there's something here for everyone. Challenge yourself or contribute by uploading your own problems for others to solve!
              </p>
            </div>

            {/* Coding Battleground */}
            <div className="bg-slate-900 text-white p-4 rounded-md shadow-xl transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-bold mb-2 text-primary">Battleground</h3>
              <p className="tracking-wide">
                Enter the Coding Battleground to compete in thrilling contests. Show off your skills in real-time competitions, climb the leaderboards, and prove your coding prowess. Ready to host your own contest? You can do that too!
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 text-center text-[#1BF1A1] tracking-wide">Meet Our Team</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-gray-800 text-center p-4 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                <h4 className="text-lg font-medium text-[#1BF1A1] mb-1">Biman Das</h4>
              </div>
              <div className="bg-gray-800 text-center p-4 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                <h4 className="text-lg font-medium text-[#1BF1A1] mb-1">Trisha Ghosh</h4>
              </div>
              <div className="bg-gray-800 text-center p-4 rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer">
                <h4 className="text-lg font-medium text-[#1BF1A1] mb-1">Jyotirmoy Baidya</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;