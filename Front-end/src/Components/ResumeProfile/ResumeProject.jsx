import { Box, Button, FormControl, FormLabel, HStack, Input, Text, Textarea } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ResumeWorkProjectItem } from './ResumeWorkProjectItem'
import { resumeService } from '../../Service/resume.service'
import { ToastContainer, toast } from 'react-toastify'

export const ResumeProject = ({ workProjects, setResume }) => {
  const [workProject, setWorkProjects] = useState([])
  let accessToken = ''
  try {
    accessToken = JSON.parse(localStorage.getItem('data')).access_token
  } catch(error) {
    
  }
  

  useEffect(() => {
    setWorkProjects(workProjects)
  }, [workProjects])

  const addWorkProject = () => {
    const newProject = {
      id: null,
      nameProject: '',
      startTime: '',
      endTime: '',
      client: '',
      description: '',
      members: '',
      position: '',
      responsibilities: '',
      technology: '',
    }
    resumeService
      .postResumeProject(accessToken, newProject)
      .then((response) => {
        setResume(response.data)
      })
      .catch((er) => console.log(er))
  }

  const deleteProject = (project) => {
    resumeService
      .deleteResumeWorkProject(accessToken, project)
      .then((response) => {
        setResume(response.data)
        toast.info(response.message)
      })
      .catch((er) => console.log(er))
  }

  const saveProject = (project) => {
    resumeService
      .postResumeProject(accessToken, project)
      .then((response) => {
        setResume(response.data)
        toast.info(response.message)
      })
      .catch((er) => console.log(er))
  }

  return (
    <Box w={'100%'} m={0}>
      {workProject?.map((w) => (
        <ResumeWorkProjectItem item={w} addClick={addWorkProject} deleteClick={deleteProject} saveClick={saveProject} />
      ))}
    </Box>
  )
}
