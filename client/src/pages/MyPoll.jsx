import React, { useContext, useState, useEffect,useRef } from "react";
import { AppContext } from "../context/appContext";
import { BsArrowDownSquareFill } from "react-icons/bs";

const MyPoll = () => {

    const { socket } = useContext(AppContext);
    const [scroll,setScroll] = useState(false)
    const auth = localStorage.getItem("user");
    const userData = JSON.parse(auth);
    const [pollData, setPollData] = useState(null);
    const endRef = useRef();

    useEffect(() => {
        if (auth) {
            socket.emit("getMy-poll", userData._id);
        }

        socket.on("my-pole", (pole) => {
            
            setPollData(pole);
        });


        return () => {
            socket.off("my-pole");
        };
    }, [auth, socket, userData._id]);

    if (scroll) {
        scrollToBottom();
    }

    function scrollToBottom() {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
        setScroll(false)
    }

const length = "60";

    return (
        <div className=" bg-color4 w-full h-[100vh] flex items-center justify-center">
            <div className="flex-col justify-center text-center items-center">
                <h2 className="text-2xl font-extrabold text-green-600 mb-1 font-ff">My POlls</h2>
                <div className=" md:w-[60vw] w-[90vw] h-[85vh]  flex-col justify-center text-center items-center rounded-2xl border-grey-400 border-4 shadow-xl shadow-color1 overflow-hidden overflow-y-scroll scrollbar scroll-smooth ">

                    <div className=" flex-col justify-center items-center ml-3 ">


                        {pollData &&
                            pollData.map((poll, idx) => (


                                <div key={idx} className="  bg-color1 m-5 mb-12 p-5  rounded-2xl shadow-lg shadow-gray-800  flex-col ">
                                    <div className=" p-3 m-3 rounded-2xl bg-color2 shadow-lg shadow-black">
                                        <p className="md:text-xl font-bold break-words">{poll.question}</p>
                                    </div>
                                    <div className=" grid grid-cols-2 gap-2">


                                        <div className="  p-4 m-3 rounded-2xl bg-color3 relative hover:scale-y-110 hover:scale-x-105 duration-150 cursor-pointer hover:shadow-xl hover:shadow-black flex-col justify-around items-center">


                                            <p className="md:text-lg font-semibold break-words mb-4">{poll.option1}</p>
                                            
                                            <div className=" bg-color1 w-full h-3 rounded-xl ">
                                                <div style={{width:`${((poll.vote1.length) / (poll.totalVote.length)) * 100 }%`}} className=" h-3 rounded-xl bg-green-800"><span className=" h-4 w-4 rounded-full font-medium float-right mt-[-15px] mr-[-20px] flex justify-center items-center text-green-950">
                                                {`${poll.vote1.length !==0 ?(Math.round(((poll.vote1.length) / (poll.totalVote.length)) * 100 )): 0}% `}
                                                </span></div>
                                            </div>


                                        </div>





                                        <div className="  p-4 m-3 rounded-2xl bg-color3 relative hover:scale-y-110 hover:scale-x-105 duration-150 cursor-pointer shadow-xl hover:shadow-black flex-col justify-around items-center">


                                            <p className="md:text-lg font-semibold break-words mb-4">{poll.option2}</p>
                                            
                                            <div className=" bg-color1 w-full h-3 rounded-xl ">
                                                <div style={{width:`${((poll.vote2.length) / (poll.totalVote.length)) * 100 }%`}} className=" h-3 rounded-xl bg-green-800"><span className=" h-4 w-4 rounded-full font-medium float-right mt-[-15px] mr-[-20px] flex justify-center items-center text-green-950">
                                                {`${poll.vote2.length !==0 ?(Math.round(((poll.vote2.length) / (poll.totalVote.length)) * 100 )): 0}% `}
                                                </span></div>
                                            </div>


                                        </div>





                                        <div className="  p-4 m-3 rounded-2xl bg-color3 relative hover:scale-y-110 hover:scale-x-105 duration-150 cursor-pointer shadow-xl hover:shadow-black flex-col justify-around items-center">


                                            <p className="md:text-lg font-semibold break-words mb-4">{poll.option3}</p>
                                            
                                            <div className=" bg-color1 w-full h-3 rounded-xl ">
                                                <div style={{width:`${((poll.vote3.length) / (poll.totalVote.length)) * 100 }%`}} className=" h-3 rounded-xl bg-green-800"><span className=" h-4 w-4 rounded-full font-medium float-right mt-[-15px] mr-[-20px] flex justify-center items-center text-green-950">
                                                {`${poll.vote3.length !==0 ?(Math.round(((poll.vote3.length) / (poll.totalVote.length)) * 100 )): 0}% `}
                                                </span></div>
                                            </div>


                                        </div>





                                        <div className="  p-4 m-3 rounded-2xl bg-color3 relative hover:scale-y-110 hover:scale-x-105 duration-150 cursor-pointer shadow-xl hover:shadow-black flex-col justify-around items-center">


                                            <p className="md:text-lg font-semibold break-words mb-4">{poll.option4}</p>
                                            
                                            <div className=" bg-color1 w-full h-3 rounded-xl ">
                                                <div style={{width:`${((poll.vote4.length) / (poll.totalVote.length)) * 100 }%`}} className=" h-3 rounded-xl bg-green-800"><span className=" h-4 w-4 rounded-full font-medium float-right mt-[-15px] mr-[-20px] flex justify-center items-center text-green-950">
                                                {`${poll.vote4.length !==0 ?(Math.round(((poll.vote4.length) / (poll.totalVote.length)) * 100 )): 0}% `}
                                                </span></div>
                                            </div>


                                        </div>




                                       
                                    </div>
                                </div>

                                

                            ))
                        }


                    </div>
                    <div className=" fixed z-30 bottom-8 flex-row-reverse right-[3px] items-center md:right-[50px]  ">
                        <button onClick={() => { setScroll(true) }} className="bg-green-800 text-black text-4xl mr-2 rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:scale-110 duration-300 ">
                            <BsArrowDownSquareFill />
                        </button>
                    </div>
                    <div ref={endRef} />
                </div>
            </div>
        </div>
    )
}

export default MyPoll;


