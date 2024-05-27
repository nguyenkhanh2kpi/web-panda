import axios, { AxiosError } from 'axios'
import { hostName } from '../global'
const API_URL = hostName

const getAllCVs = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    const res = await axios.get(`${API_URL}/apply-job`, config)
    return res.data
  } catch (error) {
    const axiosError = error
    if (axiosError && axiosError.response && axiosError.response.status === 403) {
      throw new Error('no_permistion')
    } else {
      throw error
    }
  }
}
const getCVById = async (token, id) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    const res = await axios.get(`${API_URL}/apply-job/${id}`, config)
    return res.data
  } catch (error) {
    const axiosError = error
    if (axiosError && axiosError.response && axiosError.response.status === 403) {
      throw new Error('no_permistion')
    } else {
      throw error
    }
  }
}

const postCVQuick = async (token, form) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }

    const res = await axios.post(`${API_URL}/apply-job/quick`, form, config)
    return res.data
  } catch (error) {
    if (error.response && error.response.status === 403) {
      throw new Error('no_permission')
    } else {
      throw error
    }
  }
}

const updateStatus = async (token, cvId, status) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'text/plain', // Set content type to plain text
      },
    }

    const res = await axios.put(`${API_URL}/apply-job/update-status/${cvId}`, status, config)
    return res.data
  } catch (error) {
    if (error.response && error.response.status === 403) {
      throw new Error('no_permission')
    } else {
      throw error
    }
  }
}

const updateLabel = async (token, cvId, label) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'text/plain', // Set content type to plain text
      },
    }

    const res = await axios.put(`${API_URL}/apply-job/update-label/${cvId}`, label, config)
    return res.data
  } catch (error) {
    if (error.response && error.response.status === 403) {
      throw new Error('no_permission')
    } else {
      throw error
    }
  }
}
const updateView = async (token, cvId,view) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', 
      },
    }

    const res = await axios.put(`${API_URL}/apply-job/update-view/${cvId}`, view, config)
    return res.data
  } catch (error) {
    if (error.response && error.response.status === 403) {
      throw new Error('no_permission')
    } else {
      throw error
    }
  }
}

export const cvService = {
  getAllCVs,
  postCVQuick,
  updateStatus,
  getCVById,
  updateLabel,
  updateView,
}
