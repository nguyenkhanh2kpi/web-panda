import axios, { AxiosError } from 'axios'

const getAllProvince = async () => {
    try {
        const response = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
        const data = response.data; 
        
        if (data.error === 0) {
            return data.data;
        } else {
            throw new Error(data.error_text); 
        }
    } catch (error) {
        console.error('Error fetching provinces:', error);
        throw error; 
    }
}

export const locationService = {
    getAllProvince,
}