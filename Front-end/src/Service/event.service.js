import axios, { AxiosError } from "axios";
import { hostName } from "../global";
const API_URL = hostName

const getEvent = async () => {
    try {
        const res = await axios.get(`${API_URL}/event`);
        return res.data.data;
    } catch (error) {
        throw error;
    } 
};

const getMyEvent = async (token) => {
    try {
        let config = { headers: { Authorization: `Bearer ${token}`}};
        const res = await axios.get(`${API_URL}/event/myEvent`,config);
        return res.data.data;
    }catch (error) {
        console.log(error);
    }

};


const getEventById = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/event/${id}`);
        return res.data.data;
    } catch (error) {
        throw error;
    } 
};



const postEvent = async (form,  token) => {
    try {
        let config = { headers: { Authorization: `Bearer ${token}`}};
        let data = form;
        const res = await axios.post(`${API_URL}/event`, data ,config );
        return res.data;
    } catch(error) {
        const axiosError = error;
        if (axiosError && axiosError.response && axiosError.response.status === 403) {
            throw new Error("no_permistion");
        }
        else   {
            throw error;
        }

    }
}


const putEvent = async (form,  token, id) => {
    try {
        let config = { headers: { Authorization: `Bearer ${token}`}};
        let data = form;
        const res = await axios.put(`${API_URL}/event/${id}`, data ,config );
        return res.data;
    } catch(error) {
        const axiosError = error;
        if (axiosError && axiosError.response && axiosError.response.status === 403) {
            throw new Error("no_permistion");
        }
        else   {
            throw error;
        }

    }
}


const DeleteEvent = async (id, token) => {
    try {
        let config = { headers: { Authorization: `Bearer ${token}`}};
        const res = await axios.delete(`${API_URL}/event/${id}`, config);
        return res.data;
    }
    catch(error) {
        throw error
    }
}

export const eventService = {
    getEvent,
    postEvent,
    getEventById,
    putEvent,
    getMyEvent,
    DeleteEvent,
};
