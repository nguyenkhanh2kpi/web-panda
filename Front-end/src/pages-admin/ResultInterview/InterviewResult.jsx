import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Avatar, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardBody, HStack, Img, Link, Select, Spinner, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { companyService } from '../../Service/company.service'
import { ToastContainer, toast } from 'react-toastify'
import { jobService } from '../../Service/job.service'

export const InterviewResult = () => {
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(false)
  const [change, setChange] = useState(false)
  const [jobs, setJobs] = useState([])
  useEffect(() => {
    companyService
      .getListCandidate(accessToken)
      .then((res) => {
        setCandidates(res)
      })
      .catch((err) => console.log(err.message))
  }, [change])

  const handleClick = (status, id) => {
    companyService
      .changeStatusHiring(accessToken, status ? 'hired' : 'not hired', id)
      .then((res) => toast.success(res.message))
      .catch((er) => console.log(er))
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    jobService
      .getMyJob(accessToken)
      .then((response) => setJobs(response.data))
      .catch((er) => console.log(er))
  }, [])

  // listmu job

  return (
    <Box minHeight={2000} overflow='auto' fontFamily={'Montserrat'} backgroundColor={'#e9f3f5'}>
      <HStack justifyContent={'space-between'} w={'100%'}>
        <Breadcrumb pt={30}>
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Kết quả</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </HStack>
      <ToastContainer position='bottom-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />

      <VStack ml={30} mr={30} spacing={3}>
        <HStack w={'100%'}>
          <Select bgColor={'white'} placeholder='Chọn công việc'>
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.name}
              </option>
            ))}
          </Select>
        </HStack>
        <VStack w='100%'>
          {candidates.map((candidate) => (
            <Card w={'100%'}>
              <CardBody>
                <HStack w={'50%'}>
                  <Avatar size='md' name={candidate.name ? candidate.name : candidate.email} src={candidate.avatar} />
                  <VStack>
                    <Text w='100%' fontWeight={'black'}>
                      Full Name: {candidate.name}
                    </Text>
                    <Text w='100%'>Email: {candidate.email}</Text>
                    <Text w='100%'>Id: {candidate.candidateId}</Text>
                  </VStack>
                </HStack>

                <VStack w={'50%'}>
                  <Text w='100%'>JobApplied: {candidate.jobApplied}</Text>
                  <Text w='100%'>Điểm phỏng vấn: {candidate.score}</Text>
                  <Text w='100%'>
                    Status:{' '}
                    <Button colorScheme='teal' size='xs'>
                      {candidate.status}
                    </Button>
                  </Text>
                  <Link w={'100%'} href={candidate.cv} isExternal>
                    View cv here <ExternalLinkIcon mx='2px' />
                  </Link>
                </VStack>
              </CardBody>
            </Card>
          ))}
        </VStack>
      </VStack>
    </Box>
  )
}
