import axios, { AxiosError } from 'axios'
import { hostName } from '../global'
const API_URL = hostName

const googleLogin = async (form) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    }
    const res = await axios.post(`${API_URL}/auth/login-google`, form, config)
    return res.data
  } catch (error) {
    throw error
  }
}

export const authService = {
    googleLogin,
}
