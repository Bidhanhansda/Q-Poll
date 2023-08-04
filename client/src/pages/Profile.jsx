import React from "react";

const auth = localStorage.getItem("user");
const userData = JSON.parse(auth);


const Profile = () => {



    

    return (
        <div className=" bg-color4 w-full h-[100vh] flex items-center justify-center">
            <div className="flex-col justify-center text-center items-center">
                <h2 className="text-2xl font-extrabold text-green-600 mb-1 font-ff">Profile</h2>


                <div className=" md:w-[60vw] w-[90vw] h-[85vh]  flex justify-center items-center text-center  rounded-2xl border-grey-400 border-4 shadow-xl shadow-color1  ">
                    <div className=" flex-col justify-center items-center">


                        <img src={userData.picture} alt='profile_img' className=' m-8 w-40 h-40 md:w-80 md:h-80 rounded-full  object-cover border-4 border-color1' />


                        <div className="flex justify-center">
                            <h2 className="text-sm mx-4 md:text-xl font-bold text-gray-700 tracking-wide">
                                Name:
                            </h2>
                            <h2 className="text-sm md:text-xl font-bold text-gray-700 tracking-wide">
                                {userData.name}
                            </h2>
                        </div>
                        <div className="flex justify-center mt-8">
                            <h2 className="text-sm mx-4 md:text-xl font-bold text-gray-700 tracking-wide">
                                Email:
                            </h2>
                            <h2 className="text-sm md:text-xl font-bold text-gray-700 tracking-wide">
                                {userData.email}
                            </h2>
                        </div>






                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile;