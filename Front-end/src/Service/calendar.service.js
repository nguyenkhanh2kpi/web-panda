import axios, { AxiosError } from 'axios'
import { hostName } from '../global'
const API_URL = hostName

const getMyCalendar = async (token) => {
  try {
    let config = { headers: { Authorization: `Bearer ${token}` } }
    const res = await axios.get(`${API_URL}/calendar/my-calendar`, config)
    return res.data.data
  } catch (error) {
    const axiosError = error
    if (axiosError && axiosError.response && axiosError.response.status === 403) {
      throw new Error('no_permistion')
    } else {
      throw error
    }
  }
}

const postLocalCalendar = async (token, data) => {
  try {
    const response = await axios.post(`${API_URL}/calendar/local`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error posting local calendar:', error)
    throw error
  }
}
const getLocalCalendar = async (token) => {
  try {
    let config = { headers: { Authorization: `Bearer ${token}` } }
    const res = await axios.get(`${API_URL}/calendar/local`, config)
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

const pushLocalCalender = async (token, data, id) => {
  try {
    let config = { headers: { Authorization: `Bearer ${token}` } }
    const response = await axios.put(`${API_URL}/calendar/local/${id}`, data, config)
    return response.data
  } catch (error) {
    throw error
  }
}

const deleteLocalCalender = async (token, id) => {
  try {
    let config = { headers: { Authorization: `Bearer ${token}` } }
    const response = await axios.delete(`${API_URL}/calendar/local/${id}`, config)
    return response.data
  } catch (error) {
    throw error
  }
}

export const calendarService = {
  getMyCalendar,
  postLocalCalendar,
  getLocalCalendar,
  pushLocalCalender,
  deleteLocalCalender,
}
