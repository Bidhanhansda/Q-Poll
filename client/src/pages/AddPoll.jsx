import React,{useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../context/appContext";

const AddPoll = () =>{

const [question,setQuestion] =useState("");
const [option1,setOption1] =useState("");
const [option2,setOption2] =useState("");
const [option3,setOption3] =useState("");
const [option4,setOption4] =useState("");
const {socket} = useContext(AppContext);
const navigate = useNavigate();

const auth = localStorage.getItem("user");

const userId = JSON.parse(auth)._id;

function getFormattedDate() {
  const date = new Date();
  const year = date.getFullYear();
  let month = (1 + date.getMonth()).toString();

  month = month.length > 1 ? month : "0" + month;
  let day = date.getDate().toString();

  day = day.length > 1 ? day : "0" + day;

  return month + "/" + day + "/" + year;
}

const todayDate = getFormattedDate();

function handleSubmit(e){
  e.preventDefault();
  const today = new Date();
  const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
  const time = today.getHours() + ":" + minutes;
  socket.emit("create-poll",userId, question, option1, option2, option3,option4, time, todayDate,auth);
  setQuestion("");
  setOption1("");
  setOption2("");
  setOption3("");
  setOption4("");
  navigate("/poll")
}

  return (
    <div className="  w-full h-[100vh] flex items-center justify-center bg-color4">

      <div className="  md:w-[40vw] w-[80vw] h-[70vh] p-3 flex-col justify-center text-center items-center rounded-2xl border-grey-400 border-b-4 shadow-xl shadow-color1">
        <h2 className='md:text-2xl text-xl font-extrabold text-green-800 font-ff'>Add Poll</h2>
        <form onSubmit={handleSubmit}>
        <div className='flex-col justify-center items-center w-[100%] mt-4  '>

          <div className='flex-col justify-center items-center m-3 mt-5 text-left'>
            <div className="text-md font-bold text-gray-700 tracking-wide">Question</div>
            <input className=" bg-color4 w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-green-500" type="text" placeholder="Enter your question" maxLength={3000} required value={question} onChange={(e)=>setQuestion(e.target.value)} />
          </div>

          <div className='flex-col justify-center items-center m-3 mt-5 text-left'>
            <div className="text-sm font-bold text-gray-700 tracking-wide">Option 1</div>
            <input className=" bg-color4  w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-green-500" type="text" placeholder="Enter Option 1" maxLength={3000} required value={option1} onChange={(e)=>setOption1(e.target.value)} />
          </div>

          <div className='flex-col justify-center items-center m-3 mt-5 text-left'>
            <div className="text-sm font-bold text-gray-700 tracking-wide">Option 2</div>
            <input className=" bg-color4  w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-green-500" type="text" placeholder="Enter Option 2" maxLength={3000} required value={option2} onChange={(e)=>setOption2(e.target.value)}/>
          </div>

          <div className='flex-col justify-center items-center m-3 mt-5 text-left'>
            <div className="text-sm font-bold text-gray-700 tracking-wide">Option 3</div>
            <input className=" bg-color4 w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-green-500" type="text" placeholder="Enter Option 3" maxLength={3000} required value={option3} onChange={(e)=>setOption3(e.target.value)} />
          </div>

          <div className='flex-col justify-center items-center m-3 mt-5 text-left'>
            <div className="text-sm font-bold text-gray-700 tracking-wide">Option 4</div>
            <input className=" bg-color4 w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-green-500" type="text" placeholder="Enter Option 4" maxLength={3000} required value={option4} onChange={(e)=>setOption4(e.target.value)} />
          </div>

        </div>
        <div className="mt-10">
          <button className="bg-green-800 text-gray-100 p-4 w-[80%] rounded-full tracking-wide
           font-semibold font-display focus:outline-none focus:shadow-outline hover:scale-y-110 duration-75 shadow-lg " type="submit">
            Add Poll
          </button>
        </div>
        </form>
      </div>
    </div>
  )
}

export default AddPoll;