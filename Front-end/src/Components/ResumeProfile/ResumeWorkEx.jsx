import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { resumeService } from '../../Service/resume.service'
import { ResumeWorkExItem } from './ResumeWorkExItem'
import { ToastContainer, toast } from 'react-toastify'

export const ResumeWorkEx = ({ isEx, workExps, setResume }) => {
  const [worksExp, setWorkExps] = useState([])
  // const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  let accessToken = ''
  try {
    accessToken = JSON.parse(localStorage.getItem('data')).access_token
  } catch(error) {
    
  }
  useEffect(() => {
    setWorkExps(workExps)
  }, [workExps])

  const handleAddWorkExpClick = () => {
    const newWorkExp = {
      id: null,
      companyName: '',
      startWorkingTime: '',
      endWorkingTime: '',
      position: '',
      jobDetail: '',
      technology: '',
    }
    resumeService
      .postResumeWorkEx(accessToken, newWorkExp)
      .then((response) => {
        setResume(response.data)
      })
      .catch((er) => console.log(er))
  }

  const handleDeleteResumewoks = (workExp) => {
    resumeService
      .deleteResumeWorkEx(accessToken, workExp)
      .then((response) => {
        setResume(response.data)
      })
      .catch((er) => console.log(er))
  }

  const handleOnSaveResume = (workExp) => {
    resumeService
      .postResumeWorkEx(accessToken, workExp)
      .then((response) => {
        setResume(response.data)
        toast.info(response.message)
      })
      .catch((er) => console.log(er))
  }

  return (
    <Box w={"100%"} m={0}>
      {worksExp?.map((w) => (
        <ResumeWorkExItem
          item={w}
          addClick={handleAddWorkExpClick}
          deleteClick={handleDeleteResumewoks}
          saveClick={handleOnSaveResume}
        />
      ))}
    </Box>
  )
}
