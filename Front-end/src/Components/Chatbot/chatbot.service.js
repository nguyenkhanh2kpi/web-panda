import axios, { AxiosError } from 'axios'
import { hostName } from '../../global'
import { chatHost } from '../../global'
const API_URL = hostName
const CHAT_HOST = chatHost

const postMessage = async (message) => {
  try {
    const data = {
      message: message,
    }
    const response = await axios.post(`${CHAT_HOST}/chat`, data)
    return response.data
  } catch (error) {
    console.error('Error posting local calendar:', error)
    throw error
  }
}

export const chatBotService = {
  postMessage,
}
