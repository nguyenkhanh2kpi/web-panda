import axios, { AxiosError } from "axios";
import { hostName } from "../global";
const API_URL = hostName


const getSkill = async (token) => {
    try {
        let config = { headers: { Authorization: `Bearer ${token}`}};
        const res = await axios.get(`${API_URL}/skill`,config);
        return res.data.data;
    }catch (error) {
        console.log(error);
    }

};

const getSkillById = async (token, id) => {
    try {
        let config = { headers: { Authorization: `Bearer ${token}`}};
        const res = await axios.get(`${API_URL}/skill/${id}`,config);
        return res.data.data;
    }catch (error) {
        console.log(error);
    }

};

const addSkill = async(token, form ) => {
    try {
        let config = { headers: { Authorization: `Bearer ${token}`}};
        const res = await axios.post(`${API_URL}/skill`,form,config );
        return res.data;
    }catch (error) {
        throw error
    }
}

const addPosition = async(token, form ) => {
    try {
        let config = { headers: { Authorization: `Bearer ${token}`}};
        const res = await axios.post(`${API_URL}/position`,form,config );
        return res.data;
    }catch (error) {
        throw error
    }
}



const updateSkill = async(token, form , id) => {
    try {
        let config = { headers: { Authorization: `Bearer ${token}`}};
        const res = await axios.put(`${API_URL}/skill/${id}`,form,config );
        return res.data;
    }catch (error) {
        throw error
    }
}


const getPosition = async (token) => {
    try {
        let config = { headers: { Authorization: `Bearer ${token}`}};
        const res = await axios.get(`${API_URL}/position`,config);
        return res.data.data;
    }catch (error) {
        console.log(error);
    }

};

const deleteSkill = async (token, id) => {
    try {
        let config = { headers: { Authorization: `Bearer ${token}`}};
        const res = await axios.delete(`${API_URL}/skill/${id}`,config);
        return res.data;
    }catch (error) {
        console.log(error);
    }
}


const getPositionById = async (token, id) => {
    try {
        let config = { headers: { Authorization: `Bearer ${token}`}};
        const res = await axios.get(`${API_URL}/position/${id}`,config);
        return res.data.data;
    }catch (error) {
        console.log(error);
    }

};

const updatePosition = async(token, form , id) => {
    try {
        let config = { headers: { Authorization: `Bearer ${token}`}};
        const res = await axios.put(`${API_URL}/position/${id}`,form,config );
        return res.data;
    }catch (error) {
        throw error
    }
}



export const skillPositionService = {
    getSkill,
    getPosition,
    getSkillById,
    updateSkill,
    addSkill,
    deleteSkill,
    addPosition,
    getPositionById,
    updatePosition,

};
