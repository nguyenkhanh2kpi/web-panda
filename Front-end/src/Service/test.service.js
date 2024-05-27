import { Axios } from 'axios'
import axios, { AxiosError } from 'axios'
import { hostName } from '../global'

const getMyTest = async (token) => {
  try {
    let config = { headers: { Authorization: `Bearer ${token}` } }
    const response = await axios.get(`${hostName}/mul-test/my-test`, config)
    return response.data.data
  } catch (error) {
    throw error
  }
}
const getATest = async (token, id) => {
  try {
    let config = { headers: { Authorization: `Bearer ${token}` } }
    const response = await axios.get(`${hostName}/mul-test/a-test/${id}`, config)
    return response.data.data
  } catch (error) {
    throw error
  }
}

const getTestByjd = async (token, jobid) => {
  try {
    let config = { headers: { Authorization: `Bearer ${token}` } }
    const response = await axios.get(`${hostName}/mul-test/${jobid}`, config)
    return response.data.data
  } catch (error) {
    throw error
  }
}

const record = async (token, form) => {
  try {
    let config = { headers: { Authorization: `Bearer ${token}` } }
    const response = await axios.post(`${hostName}/mul-test/record`, form, config)
    return response.data
  } catch (error) {
    throw error
  }
}

const addQuestion = async (token, questionData) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.post(`${hostName}/mul-test/add-question`, questionData, config)
    return response.data
  } catch (error) {
    throw error
  }
}
const deleteQuestion = async (token, questionId) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.delete(`${hostName}/mul-test/del-question/${questionId}`, config)
    return response.data
  } catch (error) {
    throw error
  }
}

const addTest = async (token, testData) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(`${hostName}/mul-test/new-test`, testData, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getRecordByJobId = async (token, jobId) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${hostName}/mul-test/record/${jobId}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
} 

export const testService = {
  getMyTest,
  getATest,
  record,
  getTestByjd,
  addQuestion,
  deleteQuestion,
  addTest,
  getRecordByJobId,
}
