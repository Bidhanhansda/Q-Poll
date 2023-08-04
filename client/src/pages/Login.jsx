import React,{useState,useEffect, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import {AppContext} from "../context/appContext";

const Login = ()=>{

    
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const navigate= useNavigate();
    const {socket} = useContext(AppContext);

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/poll");
        }
    })

    async function handleSubmit(e){
        e.preventDefault();
        let result = await fetch("https://q-poll.onrender.com/users/login",{
            method:"Post",
            body:JSON.stringify({email,password}),
            headers:{
                "Content-Type":"application/json"
            },
            
        })
        result = await(result.json())

        if(result){
            socket.emit("new-user");
        }

        
        if(result.auth){
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
        if (result) {
            navigate("/poll");
        }
        
        }else{
            alert("User not found")
        }
        
    }

    return(
        <div className=" bg-color4  w-full h-[100vh] flex items-center justify-center">

            <div className="  sm:w-[80vw] w-full h-[70vh]  flex justify-center items-center">
                <div className=" bg-white lg:w-[35%] w-[80%] h-[90%] rounded-2xl border-grey-400 border-b-4 shadow-xl shadow-color1 ">
                    <div className=" p-8  flex-col justify-center items-center">
                        <h2 className="text-center text-4xl text-green-800 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold">Login</h2>
                        <div className="mt-12">
                            <form onSubmit={handleSubmit}>
                            
                            <div className="">
                            <div>
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">Email Address</div>
                                         <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-green-500" type="email" placeholder="Enter your email"  required value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                                    </div>
                            </div>
                                
                                <div className="mt-8">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm font-bold text-gray-700 tracking-wide">
                                            Password
                                        </div>
                                        
                                    </div>
                                    <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-green-500" type="password" placeholder="Enter your password" required value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                                </div>
                                <div className="mt-10 flex justify-center items-center">
                                    <button className="bg-green-800 text-gray-100 p-4 w-[60%] rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:scale-y-110 duration-100
                                shadow-lg " type="submit">
                                        Log In
                                    </button>
                                </div>
                            </form>
                            <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                                Don't have an account ? <p className="cursor-pointer text-green-800 "><Link to="/signup">Sign up</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Login;
