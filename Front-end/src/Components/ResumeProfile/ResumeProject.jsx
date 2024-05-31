import { Box, Button, FormControl, FormLabel, HStack, Input, Text, Textarea, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ResumeWorkProjectItem } from './ResumeWorkProjectItem'
import { resumeService } from '../../Service/resume.service'
import { ToastContainer, toast } from 'react-toastify'

export const ResumeProject = ({ workProjects, setResume }) => {
  const toast = useToast()
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
        toast({
          title: 'Xóa dự án.',
          description: response.message,
          status: 'info',
          duration: 4000,
          isClosable: true,
        })
      })
      .catch((er) => console.log(er))
  }

  const saveProject = (project) => {
    resumeService
      .postResumeProject(accessToken, project)
      .then((response) => {
        setResume(response.data)
        toast({
          title: 'Dự án.',
          description: response.message,
          status: 'info',
          duration: 4000,
          isClosable: true,
        })
      })
      .catch((er) => console.log(er))
  }

  return (
    <>
      {workProject?.map((w) => (
        <ResumeWorkProjectItem item={w} addClick={addWorkProject} deleteClick={deleteProject} saveClick={saveProject} />
      ))}
    </>
  )
}
