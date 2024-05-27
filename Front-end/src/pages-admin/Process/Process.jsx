import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Card, CardBody, HStack, Image, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps } from '@chakra-ui/react'
import { jobService } from '../../Service/job.service'

const Process = () => {
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  // const jobData = useSelector((store) => store.job.data)
  const userId = JSON.parse(localStorage.getItem('data')).data.userInfo.id
  const [jobData, setJobs] = useState([])

  useEffect(() => {
    jobService
      .getAllJob()
      .then((reponse) => {
        setJobs(reponse)
      })
      .catch((er) => console.log(er))
  }, [])

  return (
    <Box minHeight={2000} overflow='auto' fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'}>
      <HStack pt={30} justifyContent={'space-between'} w={'100%'}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Chiến dịch tuyển dụng</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </HStack>

      {jobData.map((job) => {
        return job.status === true && job.user_id === userId ? (
          <Box ml={30} mr={30} onClick={() => navigate(`/process/item/${job.id}`)} w={'95%'} key={job.id}>
            <Card mb={5}>
              <CardBody>
                <Text fontSize='xl' fontWeight='semibold'>
                  {job.name}
                </Text>
                {/* <Text fontSize='md' mt='2'>
                  Địa điểm: {job.location}
                </Text>
                <Text fontSize='md' mt='2'>
                  Số lượng: {job.number}
                </Text> */}
              </CardBody>
            </Card>
          </Box>
        ) : null
      })}
    </Box>
  )
}

export default Process
