import React from "react";
import { homebg } from "../assets";
import { Link } from "react-router-dom";

const Home = ()=>{
    

    return(
        <div className={"m-0 p-0  w-full h-[100vh] opacity-70 flex justify-center items-center absolute z-10 bg-color4"}>
            
            <div className=" flex-col justify-center  items-center text-center">
                <h1 className=" lg:text-[15em] text-6xl font-extrabold m-4 p-4 font-playfair">Q-POLL</h1>
                <h2 className=" lg:text-6xl text-4xl p-4 m-4"> Q-POLL is a real time poling Website.</h2>
                <h3 className=" text-3xl p-4 m-4">Have a question??? <span className=" text-5xl text-blue-950">Wanna Poll?</span></h3>

                <button className=" w-[10em] border-black p-5 shadow-xl hover:shadow-green-600 bg-green-500 rounded-2xl text-white hover:scale-x-110 "><Link to="/signup">Let's Go</Link></button>
            </div>
            
            
        </div>
    )
}

export default Home;