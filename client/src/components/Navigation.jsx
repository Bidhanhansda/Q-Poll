import React, { useContext, useEffect, useState } from "react";
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/appContext";




const Navigation = () => {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { socket, currentRoom, setCurrentRoom, members, setMembers, rooms, setRooms } = useContext(AppContext);

    const auth = localStorage.getItem("user");


    const userData = JSON.parse(auth);

    

    useEffect(() => {
        if (auth) {
          socket.emit("get-members");
        }
    
        socket.on("members", (data) => {
          setMembers(data); 
        });
    
        
        return () => {
          socket.off("members");
        };
      }, [auth, socket]);



    const Menus = [
        { title: "Profile", link: "./profile" },
        { title: "Polls", link: "./poll" },
        { title: "My Polls", link: "./mypoll", gap: true },
        { title: "AddPoll ", link: "./addpoll" },
        // { title: "Users ", link: "./users" },
        { title: "Logout", link: "./logout", gap: true, }



    ];

    const signs = [
        { title: "Signup", link: "./signup", gap: true },
        { title: "Login ", link: "./login", }

    ]


    const handleClick = (link) => {
        if (link === "./logout") {
            localStorage.clear();
            setOpen(!open);
            navigate("/");
        } else {
            setOpen(!open);
            navigate(`./${link}`)
        }
    }

    return (
        <>
            <div className=" flex justify-between m-0 z-50 fixed">
                <h1 className=" text-green-800 font-playfair text-4xl p-1 cursor-pointer rounded-lg  mt-1"><Link to="/">Q-POLL</Link></h1>

                <div className="flex fixed z-30 right-0 ">
                    <div className={`
                 ${open ? "w-60 bg-color1" : "w-0 bg-transparent"} rounded-bl-2xl  rounded-br-2xl rounded-tl-2xl relative duration-300 p-5 pt-8  `}>
                        <GiHamburgerMenu className="absolute bg-green-900 text-color2  cursor-pointer -left-3 top-4 h-10 p-1 w-10   text-4xl rounded-full hover:scale-110 duration-200 " onClick={() => setOpen(!open)} />
                        <div className=" flex-col ml-4 justify-center items-center rounded-xl border-b-2 border-black p-2  shadow-gray-700 ">
                            <div className="flex justify-between items-center ">

                                <h1 className={`text-black font-robot  origin-left font-bold text-xl duration-500 ${!open && "scale-0"} `}>{
                                    auth ? `${userData.name}` : "Q-Poll"
                                }</h1>
                                {
                                    auth &&
                                    <img src={userData.picture} alt='profile_img' className='w-[50px] h-[50px] rounded-full border-gray-500  border-2 object-cover' />

                                }

                            </div>
                        </div>
                        <ul className="pt-6 ml-3 ">
                            {auth ? <>


                                {
                                    Menus.map((menu, idx) => (
                                        <li key={idx} onClick={() => handleClick(menu.link)} className={` border-b-2 border-lime-800  hover:shadow-xl hover:shadow-gray-700 text-black  text-md font-bold gap-x-4 cursor-pointer p-2 hover:bg-color5 rounded-xl hover:scale-110 duration-200 ${menu.gap ? "mt-9" : "mt-2"} ${menu.auth ? "hidden " : " "}`} >
                                            <span className={`${!open && "hidden"}`}>

                                                {menu.title}
                                            </span>
                                        </li>
                                    ))
                                }
                            </>
                                :
                                <>
                                    {
                                        signs.map((sign, idx) => (
                                            <li key={idx} onClick={() => handleClick(sign.link)} className={`  border-b-2 border-black  hover:shadow-xl hover:shadow-gray-700 text-black  text-md font-bold gap-x-4 cursor-pointer p-2 hover:bg-color5 rounded-xl hover:scale-110 duration-200 ${sign.gap ? "mt-9" : "mt-2"} ${sign.auth ? "hidden " : " "}`} >
                                                <span className={`${!open && "hidden"}`}>

                                                    {sign.title}
                                                </span>
                                            </li>
                                        ))
                                    }
                                </>
                            }
                            </ul>
                            <ul className="pt-6 ml-3 overflow-y-scroll max-h-72 scrollbar p-4 m-2">
                            {
                                auth &&
                            <li className={` border-b-2 border-black text-center my-8  text-black  text-2xl font-bold gap-x-4 cursor-pointer p-2  rounded-xl hover:scale-110 duration-200`} >
                                <span className={`${!open && "hidden"}`}>

                                    Members
                                </span>
                            </li>

                            }
                            {
                                auth &&
                                members.map((t, idx) => (
                                    <li key={idx} className={`     hover:shadow-lg hover:shadow-gray-700 text-black  text-md font-bold gap-x-4 cursor-pointer p-2 bg-color3 hover:bg-color5 rounded-xl hover:scale-110 duration-300 flex justify-between items-center mb-3`} >
                                        <span className={`${!open && "hidden"}`}>

                                            {t.name}
                                        </span>
                                        <span className={`${!open && "hidden"}`}>

                                        <img src={t.picture} alt='profile_img' className='w-[50px] h-[50px] rounded-full border-gray-500  border-2 object-cover' />
                                        </span>
                                        
                                    </li>
                                ))
                            }

                        </ul>





                    </div>

                </div>
            </div>
        </>
    )
}

export default Navigation;


