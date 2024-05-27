import { Axios } from 'axios'
import axios, { AxiosError } from 'axios'
import { hostName } from '../global'

const getMyLabel = async (token) => {
  try {
    let config = { headers: { Authorization: `Bearer ${token}` } }
    const response = await axios.get(`${hostName}/labels`, config)
    return response.data
  } catch (error) {
    throw error
  }
}

const addLabel = async (token, testData) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.post(`${hostName}/labels`, testData, config)
    return response.data
  } catch (error) {
    throw error
  }
}

const deleteLabel = async (token, id) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.delete(`${hostName}/labels/${id}`, config)
    return response.data
  } catch (error) {
    throw error
  }
}

export const labelService = {
  getMyLabel,
  addLabel,
  deleteLabel,
}
