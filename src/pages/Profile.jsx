import React, { useEffect, useState } from "react";
import Header from "../components/basic/Header";
import axiosHandler from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const Profile = () => {
  const navigate = useNavigate();
  const [solvedQuestions, setSolvedQuestions] = useState([]);
  const [givenContests, setGivenContests] = useState([]);
  const [user, setUser] = useState();
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [userRanking, setUserRanking] = useState([]);
  const fetchUserData = async () => {
    try {
      const response = await axiosHandler("get", "login/user/get-user");
      setSolvedQuestions(response.data.questionsSolved);
      setGivenContests(response.data.contests);
      setUser({
        fullName: response.data.fullName,
        email: response.data.email,
        username: response.data.username,
      });
      const leaderboard = await axiosHandler(
        "get",
        "login/user/get-leaderboard"
      );
      if (leaderboard.success) {
        setUserRanking(leaderboard.userRanking);
      }

      const performence = await axiosHandler(
        "get",
        "login/user/get-performence"
      );
      if (performence.success) {
        setPerformanceData(performence.result);
      }


    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false); // Stop loading when data is fetched
    }
  };
  const graphOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const handleLogout = async () => {
    await axiosHandler("post", "login/user/logout");
    navigate("/");
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const chartData = {
    labels: performanceData.map((data) => data.date),
    datasets: [
      {
        label: "Submissions Over Time",
        data: performanceData.map((data) => data.solvedCount),
        borderColor: "#1BF1A1",
        backgroundColor: "rgba(27, 241, 161, 0.3)",
        fill: true,
      },
    ],
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 h-12 w-12 mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-black h-[84%] p-8 text-white overflow-scroll design-scrollbar" >
        {/* User Profile Section */}
        <div className="bg-primary-black p-6 rounded-lg shadow-lg flex justify-between items-center mb-8 ">
          <div className="flex items-center">
            <div className="bg-primary-black border border-green-900 shadow shadow-green-600 rounded-full h-24 w-24 flex justify-center items-center text-4xl font-bold primary">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold primary">
                {user?.fullName}
              </h2>
              <p className="primary">Username: {user?.username}</p>
              <p className="text-gray-400">Email: {user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 rounded text-white font-bold">
            Log Out
          </button>
        </div>

        {/* Performance Graph Section */}
        <div className="bg-primary-black p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-2xl font-bold primary mb-4">
            Performance Over Time
          </h3>
          <div className="min-h-72 w-full">
            <Line data={chartData} options={graphOptions} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Badges Section */}
          <div className="bg-primary-black p-6 rounded-lg shadow-lg h-[32rem]">
            <h3 className="text-2xl font-bold primary mb-4">Badges</h3>
            <div className="flex flex-wrap gap-4">
              <div className="bg-[#1BF1A1] p-4 rounded-full text-center">
                Badge 1
              </div>
              <div className="bg-[#1BF1A1] p-4 rounded-full text-center">
                Badge 2
              </div>
              <div className="bg-[#1BF1A1] p-4 rounded-full text-center">
                Badge 3
              </div>
            </div>
          </div>

          {/* Global Leaderboard Section */}
          <div className="bg-primary-black p-6 rounded-lg shadow-lg h-[32rem]">
            <h3 className="text-2xl font-bold primary mb-4">
              Global Leaderboard
            </h3>
            <ul className="space-y-4 text-white">
              {userRanking.map((user, index) => (
                <li
                  key={index}
                  className="flex justify-between border-b-[1px] border-gray-500 px-3 bg-gray-900 p-2 rounded-lg">
                  <span>
                    {index + 1}. {user.username}
                  </span>
                  <span>{user.questionSolvedCount} solved</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mt-8">
          {/* Solved Questions Section */}
          <div className="bg-primary-black p-6 rounded-lg shadow-lg  mb-20">
            <h3 className="text-2xl font-bold primary mb-4">
              Solved Questions
            </h3>
            <div className="w-full h-[50rem] overflow-scroll design-scrollbar ">
              {solvedQuestions.length === 0 ? (
                <p className="text-gray-400">No Questions Solved Yet</p>
              ) : (
                solvedQuestions.map((ques, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-900 p-2 px-4 rounded-lg mb-2 shadow-sm shadow-slate-950">
                    <h4 className="text-md font-semibold text-gray-400">
                      {ques.title}
                    </h4>
                    <p
                      className={`${ques.difficulty === "Easy"
                          ? "text-green-400"
                          : ques.difficulty === "Medium"
                            ? "text-yellow-400"
                            : "text-red-400"
                        }`}>
                      {ques.difficulty}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Given Contests Section */}
          <div className="bg-primary-black p-6 rounded-lg shadow-lg mb-20 ">
            <h3 className="text-2xl font-bold primary mb-4">
              Given Contests
            </h3>
            <div className="w-full h-[50rem] overflow-scroll design-scrollbar ">
              {givenContests.length === 0 ? (
                <p className="text-gray-400">No Contests Given Yet</p>
              ) : (
                givenContests.map((contest, index) => (
                  <div
                    key={index}
                    className={`${contest?.user?.isPlagiarism ? "bg-red-900" : ""} flex justify-between items-center bg-gray-900 text-gray-400 p-2 px-4 rounded-lg mb-2 shadow-sm shadow-slate-950`}>
                    <h4 className="text-md font-semibold ">
                      {contest?.contest?.title}
                    </h4>
                    <h4 className="text-lg font-semibold">
                      {contest?.user?.username}
                    </h4>
                    <p className="">
                      {contest?.user?.questions?.length}/
                      {contest?.contest?.questions?.length}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
