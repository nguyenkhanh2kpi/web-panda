import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Button } from ".";
import { useStateContext } from "../contexts/ContextProvider";
import { Avatar, AvatarBadge, AvatarGroup, Box, WrapItem } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";


const UserProfile = () => {
    const { currentColor } = useStateContext();
    const data = JSON.parse(localStorage.getItem("data"));
    const avatar = JSON.parse(localStorage.getItem("avatar"));
    const user = JSON.parse(localStorage.getItem("data")).userInfo;


    return (
        <Box fontFamily={'Montserrat'} fontWeight={400} className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
            <div className="flex justify-between items-center">
                <p className="font-semibold text-lg dark:text-gray-200">
                    User Profile
                </p>

                <Button
                    icon={<MdOutlineCancel />}
                    color={"gray"}
                    bgHoverColor="light-gray"
                    size="2xl"
                    borderRadius="50%"
                    style={{ width: "35px", height: "35px" }}
                />
            </div>
            <Link to="/userInfo">
                <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
                    <WrapItem>
                        <Avatar
                            name={user && user.fullName ? user.fullName : data.data.email}
                            src={avatar}
                        />
                    </WrapItem>
                    <div>
                        <p className="font-semibold text-xl dark:text-gray-200">
                            {" "}
                            {data.data.username}{" "}
                        </p>
                        <p className="text-gray-500 text-sm dark:text-gray-400">
                            {" "}
                            {data.data.role}{" "}
                        </p>
                        <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
                            {" "}
                            {data.data.email}{" "}
                        </p>
                    </div>
                </div>
            </Link>

            <div className="mt-5">
                <button
                    className={`p-3 w-full hover:drop-shadow-xl`}
                    style={{
                        backgroundColor: currentColor,
                        color: "white",
                        borderRadius: "10px",
                        height: "50px",
                    }}
                >
                    <Link to="/AdLogout">Logout</Link>
                </button>
            </div>
        </Box>
    );
};

export default UserProfile;
