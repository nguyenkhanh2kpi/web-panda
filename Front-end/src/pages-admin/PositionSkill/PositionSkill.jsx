import {
    IconButton,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { skillPositionService } from "../../Service/skillPosition.service";
import { storage } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { Header } from "../../Components-admin";

export const PositionSkill = () => {
    const [skills, setSkill] = useState([
        {
            id: 0,
            skillName: "",
        },
    ]);
    const [positions, setPositions] = useState([
        {
            id: 0,
            positionName: "",
        },
    ]);
    const accessToken = JSON.parse(localStorage.getItem("data")).access_token;
    const navigate = useNavigate();

    useEffect(() => {
        skillPositionService
            .getSkill(accessToken)
            .then((response) => setSkill(response))
            .catch((error) => toast.error("something went wrong"));
        skillPositionService
            .getPosition(accessToken)
            .then((response) => setPositions(response))
            .catch((error) => toast.error("something went wrong"));
    }, []);

    const handleOnDeleteSkill = (id) => {
        skillPositionService
            .deleteSkill(accessToken, id)
            .then((res) => toast.info("ok"))
            .catch((er) => toast.error("something went wrong"));
    };

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
                <Header category="App" title="Skill" />
                <TableContainer>
                    <Table variant="simple">
                        <TableCaption>Skill</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>id</Th>
                                <Th>Skill name</Th>
                                <Th>
                                    <IconButton
                                        color="#03C9D7"
                                        backgroundColor="#f7f7f7"
                                        aria-label="Search database"
                                        icon={<AddIcon />}
                                        onClick={() => navigate("/add-skill")}
                                    />
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {skills.map((skill) => (
                                <Tr key={skill.id}>
                                    <Td>{skill.id}</Td>
                                    <Td>{skill.skillName}</Td>
                                    <Td>
                                        <IconButton
                                            color="#03C9D7"
                                            backgroundColor="#f7f7f7"
                                            aria-label="Search database"
                                            icon={<EditIcon />}
                                            onClick={() =>
                                                navigate(
                                                    `/edit-skill/${skill.id}`
                                                )
                                            }
                                        />
                                        <IconButton
                                            color="#f768b0"
                                            backgroundColor="#f7f7f7"
                                            aria-label="Search database"
                                            icon={<DeleteIcon />}
                                            onClick={() =>
                                                handleOnDeleteSkill(skill.id)
                                            }
                                        />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
            <br />
            <hr />

            <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
                <Header category="" title="Position" />
                <TableContainer>
                    <Table variant="simple">
                        <TableCaption>Position</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>id</Th>
                                <Th>Position name</Th>
                                <Th>
                                    <IconButton
                                        color="#03C9D7"
                                        backgroundColor="#f7f7f7"
                                        aria-label="Search database"
                                        icon={<AddIcon />}
                                        onClick={() =>
                                            navigate("/add-position")
                                        }
                                    />
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {positions.map((position) => (
                                <Tr key={position.id}>
                                    <Td>{position.id}</Td>
                                    <Td>{position.positionName}</Td>
                                    <Td>
                                        <IconButton
                                            color="#03C9D7"
                                            backgroundColor="#f7f7f7"
                                            aria-label="Search database"
                                            onClick={() =>
                                                navigate(
                                                    `/edit-position/${position.id}`
                                                )
                                            }
                                            icon={<EditIcon />}
                                        />
                                        <IconButton
                                            color="#f768b0"
                                            backgroundColor="#f7f7f7"
                                            aria-label="Search database"
                                            icon={<DeleteIcon />}
                                        />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
};
