import axios, { AxiosError } from 'axios'
import { hostName } from '../global'
const API_URL = hostName

const getById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/job-posting/${id}`)
    return res.data.data
  } catch (error) {
    throw error
  }
}

const getAllJob = async () => {
  try {
    const res = await axios.get(`${API_URL}/job-posting`)
    return res.data.data
  } catch (error) {
    throw error
  }
}

const putVipJob = async (token, jobId) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.put(`${hostName}/job-posting/${jobId}/vip/true`, null, config)
    return response.data
  } catch (error) {
    throw error
  }
}

const getMyJob = async (accessToken) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
    const response = await axios.get(`${hostName}/job-posting/my-job`, config)
    return response.data
  } catch (error) {
    throw error
  }
}

export const jobService = {
  getById,
  getAllJob,
  putVipJob,
  getMyJob,
}
