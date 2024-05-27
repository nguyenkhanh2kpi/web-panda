import axios, { AxiosError } from "axios";
import { hostName } from "../global";
const API_URL = hostName

const getInterviewDetailById = async (token, id) => {
    try {
        let config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get(
            `${API_URL}/interview-detail/${id}`,
            config
        );
        if (res.data.status === "200 OK") {
            return res.data.data;
        } else {
            throw new Error(res.data.message);
        }
    } catch (error) {
        const axiosError = error;
        if (
            axiosError &&
            axiosError.response &&
            axiosError.response.status === 403
        ) {
            throw new Error("no_permistion");
        } else {
            throw error;
        }
    }
};


const markCandidate = async (token, form) => {
    try {
        let config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.post(
            `${API_URL}/interview-detail/mark`,
            form,
            config
        );
        return res.data;
    } catch (error) {
        const axiosError = error;
        if (
            axiosError &&
            axiosError.response &&
            axiosError.response.status === 403
        ) {
            throw new Error("no_permistion");
        } else {
            throw error;
        }
    }
};

const deleteCandidate = async (accessToken, id) => {
    try {
        let config = { headers: { Authorization: `Bearer ${accessToken}` } };
        const res = await axios.delete(
            `${API_URL}/interview-detail/${id}`,
            config
        );
        if (res.data.status === "200 OK") {
            return res.data;
        } else {
            throw new Error(res.data.message);
        }
    } catch (error) {
        const axiosError = error;
        if (
            axiosError &&
            axiosError.response &&
            axiosError.response.status === 403
        ) {
            throw new Error("no_permistion");
        } else {
            throw error;
        }
    }
}




export const interviewDetailService = {
    getInterviewDetailById,
    markCandidate,
    deleteCandidate
};
