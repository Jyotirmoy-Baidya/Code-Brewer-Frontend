import React, { useEffect, useState } from 'react'
import Header from '../components/basic/Header'
import axiosHandler from '../utils/AxiosInstance'
import { useNavigate } from 'react-router-dom'
const Profile = () => {
    const navigate = useNavigate();
    const[solvedQuestions ,setSolvedQuestions]=useState([]);
    const[givencontests,setgivencontests]=useState([]);
    const [user,setUser]=useState(null);
    const fetchUserData = async() =>{

       const response=await axiosHandler('get', 'login/user/get-user');
       console.log(response);
       setSolvedQuestions(response.data.questionsSolved)
       setgivencontests(response.data.contests)
       setUser({fullName:response.data.fullName, email:response.data.email,username:response.data.username})
    }
    const handleLogout=async()=>{
      const response= await axiosHandler('post', 'login/user/logout');
      console.log(response)
        navigate("/")
    }
    useEffect(()=>{
        fetchUserData();
    },[])
    return (
        <>
            <Header />
            <div className='h-96'>
            <span onClick={handleLogout} className=' border-2 cursor-pointer'>LogOut</span>
            <br />
            <h2>{user.fullName}</h2>
            <h2>{user.username}</h2>
            <h2>{user.email}</h2>
            </div>
            <div className='grid grid-cols-2 gap-4 w-full'>
                <div className=''>
                <h1>Solved Questions</h1>
                { solvedQuestions.length===0 && <p>No Questions Solved Yet</p>}
                {
                    solvedQuestions.map((ques,index,)=>{
                        
            
                        return(
                        <div key={index} className="flex justify-around border-2 m-2 p-2">
                            <h2>{ques.title}</h2>
                            <p>{ques.difficulty}</p>
                        </div>
                    )})
                }
                </div>
                <div>
                    <h1>Given Contests</h1>
                { givencontests.length===0 && <p>No Contests Given Yet</p>}
                {
                    givencontests.map((contest,index)=>(
                        <div key={index} className='flex justify-around border-2 m-2 p-2'>
                            <h2>{contest.contest.title}</h2>
                            <h2>{contest.user.username}</h2>
                            <h2>{contest.user.questions.length}/{contest.contest.questions.length}</h2>

                            {/* <p>{contest.contestDescription}</p> */}
                        </div>
                    ))
                }
                </div>
            </div>

        </>
    )
}

export default Profile