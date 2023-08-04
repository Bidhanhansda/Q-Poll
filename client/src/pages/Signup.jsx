import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { robot } from "../assets/index";
import { UilPlusCircle } from '@iconscout/react-unicons';

const Signup = () => {




    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    const [uploadingImg, setUploadingImg] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/poll");
        }
    })

    const validateImg = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    }


    async function uploadImage() {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset","q_poll");
        
        try {
            setUploadingImg(true);
            let res = await fetch("https://api.cloudinary.com/v1_1/bidcode/image/upload ", {
                method: "post",
                body: data

            })
            const urlData = await res.json();
            setUploadingImg(false);
            return urlData.url
        } catch (error) {
            setUploadingImg(false);
            console.log(error);
        }
    }


    async function handleSubmit(e) {
        e.preventDefault();
        if (!image) return alert("Please upload your profile picture");
        const url = await uploadImage(image);
        
        let result = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/signup`, {
            method: "Post",
            body: JSON.stringify({ name, email, password,picture:url }),
            headers: {
                "Content-Type": "application/json"
            },
        });

        result = await result.json()
        console.log(result);
        
        if (result) {
            navigate("/login");
        }


    }

    return (
        <div className=" bg-color4 w-full h-[100vh]   flex items-center justify-center">

            <div className="  sm:w-[80vw] w-full h-[70vh]  flex justify-center items-center">
                <div className=" bg-white lg:w-[35%] w-[80%] h-[90%] rounded-2xl border-grey-400 border-b-4 shadow-xl shadow-color1 ">
                    <div className=" p-4 pt-0 lg:p-8  flex-col justify-center items-center">
                        <h2 className="text-center text-4xl text-green-800 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold">Sign up</h2>

                        <div className="mt-4">
                            <form onSubmit={handleSubmit}>
                                <div className=' w-[50px] h-[50px] mx-0 my-auto relative mb-2'>
                                    <img src={imagePreview || robot} alt='robo-Img' className='w-[50px] h-[50px] rounded-full border-gray-500  border-2 object-cover' />

                                    <label htmlFor='image-upload' className='image-upload-label'><UilPlusCircle className="absolute rounded-full bg-green-500 text-white border-spacing-0 cursor-pointer z-[99] bottom-0 right-2" /></label>

                                    <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">Name</div>
                                    <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-green-500" type="text" placeholder="Enter your name" required value={name} onChange={(e) => { setName(e.target.value) }} />
                                </div>
                                <div className="mt-2">
                                    <div>
                                        <div className="text-sm font-bold text-gray-700 tracking-wide">Email Address</div>
                                        <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-green-500" type="email" placeholder="Enter your email" required value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm font-bold text-gray-700 tracking-wide">
                                            Password
                                        </div>

                                    </div>
                                    <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-green-500" type="password" placeholder="Enter your password" required value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                </div>
                                <div className="mt-4 flex justify-center items-center ">
                                    <button className="bg-green-800 text-gray-100 mt-4 p-4 w-[60%]  rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:scale-y-110 duration-100
                                shadow-lg " type="submit">
                                        {uploadingImg ? "Signing you up" : "Signup"}
                                    </button>
                                </div>
                            </form>
                            <div className="lg:mt-12 mt-6 text-sm font-display font-semibold text-gray-700 text-center">
                                Already have an account ? <p className="cursor-pointer text-green-800 hover:scale-110 "><Link to="/login"> Login</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Signup;
