import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, HStack, IconButton, Input, Link, Select, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { loadJobDetail } from '../../redux/JobDetail/Action'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react'
import { testService } from '../../Service/test.service'
import { interviewService } from '../../Service/interview.service'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'
import { AiFillPlusCircle, AiOutlinePlayCircle } from 'react-icons/ai'

export const SceningProcess = () => {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const job = useSelector((store) => store.jobDetail.data)
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [tests, SetTests] = useState([])
  const [candidates, setCandidates] = useState([])
  useEffect(() => {
    testService
      .getTestByjd(accessToken, job.id)
      .then((response) => SetTests(response))
      .catch((er) => console.log(er))
    interviewService
      .getCandidatesByJob(accessToken, job.id)
      .then((response) => setCandidates(response))
      .catch((er) => console.log(er))
  }, [job])
  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(loadJobDetail(params.jobId))
  }, [params.jobId])

  const [selectedStatus, setSelectedStatus] = useState('')

  const handleChange = (event) => {
    setSelectedStatus(event.target.value)
  }
  const filteredCandidates = selectedStatus ? candidates.filter((candidate) => candidate.interviewStatus === selectedStatus) : candidates

  //record
  const [record, setRecord] = useState({})
  useEffect(() => {
    testService
      .getRecordByJobId(accessToken, job.id)
      .then((response) => {
        setRecord(response.data)
      })
      .catch((er) => console.log(er))
  }, [])

  /// get score
  const getScore = (userId, testId) => {
    let score = null
    record ? record.map((r) => {
      if (r.userAccountEntity.id === userId && r.testEntity.id === testId) {
        score = r.score
      }
    }) : (<></>)
    return score
  } 
  /// get score/question
  const scorePerQuestion = (score, test) => {
    return score.toString() + '/' + test.questions.length
  }

  return (
    <Box minHeight={2000} overflow='auto' fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'} p={30}>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href='/process'>Chiến dịch tuyển dụng</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/process/item/${job.id}`}>{job.name}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Kết quả</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack spacing={3} w={'100%'}>
        <Box p={'1%'} minHeight={1000} overflow='auto' borderRadius={20} backgroundColor={'#e9f3f5'} w='100%' mb={10}>
          <Box w={'50%'}>
            <HStack>
              <Select backgroundColor={'#ffffff'} borderWidth={0.5} boxShadow={'s'} borderRadius={10} placeholder='Interview Status' onChange={handleChange}>
                <option value='Chưa đăng kí'>Chưa đăng kí</option>
                <option value='Chưa phỏng vấn'>Chưa phỏng vấn</option>
                <option value='Đã chấm'>Đã Phỏng vấn</option>
              </Select>
              <Flex>
                <Select backgroundColor={'#ffffff'} borderWidth={0.5} flex='1' borderRadius={10} placeholder='Test' mr={2}>
                  {tests.map((test) => (
                    <option key={test.id}>test: {test.id}</option>
                  ))}
                </Select>
                <NumberInput backgroundColor={'#ffffff'} flex='1' borderRadius={10} defaultValue={0} min={0} max={10}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
            </HStack>
          </Box>
          <Box backgroundColor={'#ffffff'} mt={30} boxShadow={'lg'} borderRadius={10}>
            <TableContainer w={1000}>
              <Table variant='simple'>

                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Status</Th>
                    {tests.map((test) => (
                      <Th>Test id: {test.id}</Th>
                    ))}
                    <Th>Detail</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredCandidates.map((candidate) => (
                    <Tr>
                      <Td>{candidate.fullName ? candidate.fullName : candidate.email}</Td>
                      <Td>{candidate.interviewStatus}</Td>
                      {tests.map((test) => (
                        <Td>{getScore(candidate.userId, test.id) ? scorePerQuestion(getScore(candidate.userId, test.id), test) : '--'}</Td>
                      ))}
                      <Td>
                        <CVview candidate={candidate} />
                        <AssignCandidate job={job} />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </VStack>
    </Box>
  )
}

const CVview = ({ candidate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button fontFamily={'Montserrat'} padding={2} fontSize={15} size='s' onClick={onOpen} m={4}>
        CV
      </Button>

      <Modal onClose={onClose} size='4xl' isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w={'100%'} display='flex' justifyContent='center'>
              <iframe src={candidate.cv} width='100%' height='500px' title='PDF Viewer'></iframe>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

const AssignCandidate = ({ job }) => {
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [rooms, setRooms] = useState([])
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token

  useEffect(() => {
    interviewService
      .getInterviewByJobId(accessToken, job.id)
      .then((response) => {
        setRooms(response)
      })
      .catch((er) => console.log(er))
  }, [job])
  return (
    <>
      <Button fontFamily={'Montserrat'} padding={2} fontSize={15} size='s' onClick={onOpen} m={4}>
        Interview
      </Button>

      <Modal fontFamily={'Montserrat'} size={'2xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Assign Interview </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              {rooms.map((room) => (
                <Box borderRadius={20} p={3} boxShadow={'md'} key={room.id}>
                  <Text>
                    Name: {room.roomName} - From: {new Date(room.startDate).toLocaleString()} to {new Date(room.endDate).toLocaleString()}
                  </Text>
                  <Text>Description: {room.roomDescription}</Text>
                  <HStack justifyContent='space-between'>
                    <Text>Status: {room.status}</Text>
                    <Button color={'white'} backgroundColor={'rgb(3, 201, 215)'} p={2} size={'s'}>
                      Assign
                    </Button>
                  </HStack>
                </Box>
              ))}
              <Button borderRadius={50} m={4} onClick={() => navigate('/roomAdd')}>
                +
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
