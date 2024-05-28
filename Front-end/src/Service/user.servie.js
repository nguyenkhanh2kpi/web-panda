import axios, { AxiosError } from 'axios'
import { hostName } from '../global'
const API_URL = hostName

const addBlacklist = async (token, form) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }

    const res = await axios.post(`${API_URL}/blacklist`, form, config)
    return res.data
  } catch (error) {
    const axiosError = error
    if (axiosError && axiosError.response && axiosError.response.status === 403) {
      throw new Error('no_permission')
    } else {
      throw error
    }
  }
}

const removeBlacklist = async (token, id) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    const res = await axios.post(`${API_URL}/blacklist/remove/${id}`, null, config)
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

const getMyProfile = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    const res = await axios.get(`${API_URL}/profile`, config)
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

const getAllUser = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    const res = await axios.get(`${API_URL}/user`, config)
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

const uploadAvatar = async (selectedFile, token) => {
  if (!selectedFile) {
    throw new Error('No file selected')
  }

  const formData = new FormData()
  formData.append('file', selectedFile)

  const response = await axios.post(`${API_URL}/profile/upload/avatar`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      accept: '*/*',
      Authorization: `Bearer ${token}`,
    },
  })
  console.log("update here", response)
  return response.data
}

const updateProfile = async (profileData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }

    const res = await axios.put(`${API_URL}/profile`, profileData, config)

    return res.data
  } catch (error) {
    const axiosError = error
    if (axiosError && axiosError.response && axiosError.response.status === 403) {
      throw new Error('no_permission')
    } else {
      throw error
    }
  }
}

export const userService = {
  addBlacklist,
  removeBlacklist,
  getAllUser,
  uploadAvatar,
  getMyProfile,
  updateProfile,
}
