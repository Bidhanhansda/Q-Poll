import React, { useContext, useEffect, useState, useRef } from "react";
import { AppContext } from "../context/appContext";
import { BsArrowDownSquareFill } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Poll = () => {
    const [pollData, setPollData] = useState([]);
    const [scroll, setScroll] = useState(false)

    const { socket } = useContext(AppContext);
    const endRef = useRef();
    const auth = localStorage.getItem("user");
    const userData = JSON.parse(auth);

    useEffect(() => {
        if (auth) {
            socket.emit("join-poll");

        }
    }, [len, pollData])

    if (scroll) {
        scrollToBottom();
    }
//setting toast position
    let  width = screen.width;
  

    socket.off("join-pole").on("get-pole", (data) => {
        setPollData(data);
    })

    socket.off("voted").on("voted", (data) => {
        
        ///adding success toast
        toast.success(data, {
            position: (width>=764)?"top-center" :"bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    })
    socket.off("cannot-vote").on("cannot-vote", (data) => {
        
        //adding error toast
        toast.error(data, {
            position: (width>=764)?"top-center" :"bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    })

    if (pollData) {
        var len = pollData.length
    }


    function scrollToBottom() {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
        setScroll(false)
    }

    // useEffect(() => {
    //     if (auth) {
    //         socket.emit("get-poll");
    //     }

    //     socket.on("poll-data", (pole) => {
    //         // console.log(pole);
    //         setPollData(pole);
    //     });
    //     return () => {
    //         socket.off("pole-data");
    //     };
    // }, [auth, socket, userData._id]);



    function handleClick(msgId, senderId, voterId, option) {

        socket.emit("voting", msgId, senderId, voterId, option);
    }


    ///Messeging feature to be implemented later.


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    // }

    return (
        <>
            <div className=" bg-color4 w-full h-[100vh] flex items-center justify-center ">
                <div className=" md:w-[60vw] w-[90vw] h-[85%]  flex-col justify-center text-center items-center rounded-2xl border-grey-400 border-4 shadow-2xl shadow-color1 overflow-hidden overflow-y-scroll scrollbar relative mt-14 scroll-smooth">



                    <div className=" flex-col justify-center items-center ml-3 ">
                        {pollData &&
                            pollData.map((poll, idx) => (



                                <div key={idx} className={` relative ${(userData._id === poll.from) ? "lg:left-[36%] md:left-[36%] left-[10%] bg-color1" : " bg-color5 "}   m-5 p-2 rounded-2xl shadow-lg shadow-gray-800  w-[80%] md:w-[60%] flex-col `}>

                                    <div className={`relative ${(userData._id !== poll.from) && " flex-row-reverse"} flex justify-end items-center`}>
                                        <p className=" text-indigo-500 m-1 font-extrabold">{(JSON.parse(poll.sender).name) === userData.name ? "me" : JSON.parse(poll.sender).name}</p>
                                        <img src={JSON.parse(poll.sender).picture} alt='profile_img' className='w-[50px] h-[50px] m-1 rounded-full border-gray-500  border-2 object-cover' />
                                    </div>



                                    <div className=" p-3 m-3 rounded-2xl bg-color2 shadow-lg shadow-black">
                                        <p className="md:text-xl font-bold break-words">{poll.question}</p>
                                    </div>
                                    <div className=" grid grid-cols-2 gap-2">



                                        <div className="  p-4 m-3 rounded-2xl bg-color3 relative hover:scale-y-110 hover:scale-x-105 duration-150 cursor-pointer shadow-xl hover:shadow-black flex-col justify-around items-center"
                                            onClick={() => { handleClick(poll._id, poll.from, userData._id, poll.option1) }}>


                                            <p className="md:text-lg font-semibold break-words mb-4">{poll.option1}</p>

                                            <div className=" bg-color1 w-full h-3 rounded-xl ">
                                                <div style={{
                                                    width: `${poll.vote1.length !==0 ?(((poll.vote1.length) / (poll.totalVote.length)) * 100 ): 0}% `
                                                }} className=" h-3 rounded-xl bg-green-800"><span className=" h-4 w-4 rounded-full font-bold float-right mt-[-15px] mr-[-20px] flex justify-center items-center text-green-950 ">

                                                        {`${poll.vote1.length !==0 ?(((poll.vote1.length) / (poll.totalVote.length)) * 100 ): 0}% `}

                                                    </span></div>
                                            </div>


                                        </div>



                                        <div className="  p-4 m-3 rounded-2xl bg-color3 relative hover:scale-y-110 hover:scale-x-105 duration-150 cursor-pointer shadow-xl hover:shadow-black flex-col justify-center items-center  "
                                            onClick={() => { handleClick(poll._id, poll.from, userData._id, poll.option2) }}>

                                            <div>
                                                <p className="md:text-lg font-semibold break-words mb-4">{poll.option2}</p>
                                            </div>
                                            <div className=" bg-color1 w-full h-3 rounded-xl ">
                                                <div style={{ width: `${poll.vote2.length !==0 ?(((poll.vote2.length) / (poll.totalVote.length)) * 100 ): 0}% ` }} className=" h-3 rounded-xl bg-green-800"><span className=" h-4 w-4 rounded-full font-bold float-right mt-[-15px] mr-[-20px] flex justify-center items-center text-green-950">
                                                    {`${poll.vote2.length !==0 ?(((poll.vote2.length) / (poll.totalVote.length)) * 100 ): 0}% `}
                                                </span></div>
                                            </div>


                                        </div>




                                        <div className="  p-4 m-3 rounded-2xl bg-color3 relative hover:scale-y-110 hover:scale-x-105 duration-150 cursor-pointer shadow-xl hover:shadow-black flex-col justify-around items-center"
                                            onClick={() => { handleClick(poll._id, poll.from, userData._id, poll.option3) }}>


                                            <p className="md:text-lg font-semibold break-words mb-4">{poll.option3}</p>

                                            <div className=" bg-color1 w-full h-3 rounded-xl ">
                                                <div style={{ width: `${poll.vote3.length !==0 ?(((poll.vote3.length) / (poll.totalVote.length)) * 100 ): 0}% ` }} className=" h-3 rounded-xl bg-green-800"><span className=" h-4 w-4 rounded-full font-medium float-right mt-[-15px] mr-[-20px] flex justify-center items-center text-green-950">
                                                    {`${poll.vote3.length !==0 ?(((poll.vote3.length) / (poll.totalVote.length)) * 100 ): 0}% `}
                                                </span></div>
                                            </div>


                                        </div>



                                        <div className="  p-4 m-3 rounded-2xl bg-color3 relative hover:scale-y-110 hover:scale-x-105 duration-150 cursor-pointer shadow-xl hover:shadow-black flex-col justify-around items-center"
                                            onClick={() => { handleClick(poll._id, poll.from, userData._id, poll.option4) }}>


                                            <p className="md:text-lg font-semibold break-words mb-4">{poll.option4}</p>

                                            <div className=" bg-color1 w-full h-3 rounded-xl ">
                                                <div style={{ width: `${poll.vote4.length !==0 ?(((poll.vote4.length) / (poll.totalVote.length)) * 100 ): 0}% ` }} className=" h-3 rounded-xl bg-green-800"><span className=" h-4 w-4 rounded-full font-medium float-right mt-[-15px] mr-[-20px] flex justify-center items-center text-green-950">
                                                    {`${poll.vote4.length !==0 ?(((poll.vote4.length) / (poll.totalVote.length)) * 100 ): 0}% `}
                                                </span></div>
                                            </div>


                                        </div>





                                    </div>
                                </div>


                            ))


                        }

                    </div>
                    <div className=" fixed z-30 bottom-8 flex-row-reverse right-[3px] items-center md:right-[50px]  ">



                        {/* <input className="w-full rounded-xl p-4 m-3 text-lg py-2 border-b  bg-color2 border-gray-300 focus:outline-none focus:border-green-500" type="text" placeholder="send message" required value={message} onChange={(e) => { setMessage(e.target.value) }} /> */}


                        <button onClick={() => { setScroll(true) }} className="bg-green-800 text-black text-4xl mr-2 rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:scale-110 duration-300 ">
                            <BsArrowDownSquareFill />
                        </button>

                        <ToastContainer position= {(width>=764)?"top-center" :"bottom-center"}
                            autoClose={2000}
                            hideProgressBar={false}
                            newestOnTop
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored" />
                    </div>
                    <div ref={endRef} />
                </div>
            </div>

        </>
    )
}

export default Poll;

///for send message///

{/* <form onSubmit={handleSubmit} className=" fixed z-30 bottom-0.5  flex  lg:left-56 xl:left-[360px] items-center w-[90%] lg:w-[60%] h-[10%] ">



                        <input className="w-full rounded-xl p-4 m-3 text-lg py-2 border-b  bg-color2 border-gray-300 focus:outline-none focus:border-green-500" type="text" placeholder="send message" required value={message} onChange={(e) => { setMessage(e.target.value) }} />


                        <button className="bg-green-800 text-gray-100 p-4 mr-2 rounded-2xl tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:scale-y-110 duration-100
                                shadow-lg " type="submit">
                            send
                        </button>
                    </form> */}