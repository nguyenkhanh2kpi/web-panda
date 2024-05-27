import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../Components-admin";
import { Button, Input, Stack } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import { skillPositionService } from "../../Service/skillPosition.service";

export const AddPosition = () => {
    const accessToken = JSON.parse(localStorage.getItem("data")).access_token;
    const navigate = useNavigate();
    const [position, setPosition] = useState({
        name: "",
    });

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setPosition({ ...position, [name]: value });
    };

    const handdleAdd =() => {
        skillPositionService.addPosition(accessToken, position)
        .then(res => toast.info(res.message))
        .catch(err => toast.error("something went wrong"))
    }


    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
                <Header category="Add Position" title="Position" />
                <div className=" w-full">
                    <Stack spacing={5}>

                        <Input
                            name="name"
                            variant="outline"
                            value={position.name}
                            placeholder="position name"
                            onChange={handleOnChange}
                        />

                        <br />
                    </Stack>
                    <br />

                    <br />

                    <div className="mt-24">
                        <div className="flex flex-wrap lg:flex-nowrap justify-center ">
                            <div className="mt-6">
                                <Button
                                    height="50px"
                                    color="white"
                                    bgColor="#97a4a6"
                                    text="Xem chi tiết"
                                    borderRadius="10px"
                                    onClick={() => navigate("/skill-position")}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    height="50px"
                                    color="white"
                                    bgColor="#03C9D7"
                                    text="Xem chi tiết"
                                    borderRadius="10px"
                                    onClick={handdleAdd}
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
