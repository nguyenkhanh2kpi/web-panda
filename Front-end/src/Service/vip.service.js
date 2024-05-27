import axios, { AxiosError } from 'axios'
import { hostName } from '../global'
const API_URL = hostName

const getAllService = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    const res = await axios.get(`${API_URL}/vip-packs`, config)
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

const getPackById = async (token, id) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    const res = await axios.get(`${API_URL}/vip-packs/${id}`, config)
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

const getMyBill = async (token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
      const res = await axios.get(`${API_URL}/vip-packs/my-bills`, config)
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
  

const payBill = async (form) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response = await axios.post(`${hostName}/payment/pay`, form, config)
      return response.data
    } catch (error) {
      throw error
    }
  }


export const vipService = {
  getAllService,
  getPackById,
  payBill,
  getMyBill,
}
