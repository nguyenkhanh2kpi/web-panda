import { Box, Button, FormControl, FormLabel, HStack, Input, Text, Textarea, VStack, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { resumeService } from '../../Service/resume.service'
import { ResumeWorkExItem } from './ResumeWorkExItem'
import { ToastContainer, toast } from 'react-toastify'

export const ResumeWorkEx = ({ isEx, workExps, setResume }) => {
  const toast = useToast()
  const [worksExp, setWorkExps] = useState([])
  // const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  let accessToken = ''
  try {
    accessToken = JSON.parse(localStorage.getItem('data')).access_token
  } catch (error) {}
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
        toast({
          title: 'Cập nhật kinh nghiệm.',
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
      <VStack alignItems={'flex-start'} w={'100%'}>
        {worksExp?.map((w) => (
          <ResumeWorkExItem item={w} addClick={handleAddWorkExpClick} deleteClick={handleDeleteResumewoks} saveClick={handleOnSaveResume} />
        ))}
        {worksExp.length == 0 ? (
          <HStack w={'40%'}>
            <Button color={'white'} onClick={handleAddWorkExpClick} backgroundColor={'#8ebfb4'} ml={2} mt={2}>
              Thêm kinh nghiệm
            </Button>
          </HStack>
        ) : (
          <></>
        )}
      </VStack>
    </>
  )
}
