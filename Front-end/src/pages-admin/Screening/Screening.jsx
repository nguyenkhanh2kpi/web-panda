import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Image,
  Skeleton,
  Spinner,
  Text,
  VStack,
  HStack,
  IconButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Input,
  FormLabel,
  useDisclosure,
  Checkbox,
  ModalFooter,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  CardBody,
  Card,
} from '@chakra-ui/react'
import { loadJob } from '../../redux/Job-posting/Action'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillPlusCircle, AiOutlineDelete, AiOutlinePlus, AiOutlineProfile } from 'react-icons/ai'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { Tooltip } from '@chakra-ui/react'
import { testService } from '../../Service/test.service'
import { AiOutlineEdit } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify'
import { jobService } from '../../Service/job.service'

const Screening = () => {
  const params = useParams()
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [load, setLoad] = useState(false)
  const [job, setJob] = useState(null)

  useEffect(() => {
    jobService
      .getById(params.jobId)
      .then((response) => setJob(response))
      .catch((er) => console.log(er))
  }, [params])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [load])

  return (
    <Box minHeight={2000} overflow='auto' fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'}>
      <HStack justifyContent={'space-between'} w={'100%'}>
        <Breadcrumb pt={30}>
          <BreadcrumbItem>
            <BreadcrumbLink href='/process'>Chiến dịch tuyển dụng</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/process/item/${params.jobId}`}> {job ? job.name : ''}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Kiểm tra</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        {job ? <AddTestForm jobId={job.id} load={load} setLoad={setLoad} /> : <></>}
      </HStack>

      {job ? (
        <>
          <TestItemByJob jobId={job.id} load={load} setLoad={setLoad} />
        </>
      ) : (
        <></>
      )}
      <ToastContainer position='bottom-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />
    </Box>
  )
}

const TestItemByJob = ({ jobId, load, setLoad }) => {
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [tests, SetTests] = useState({})
  useEffect(() => {
    testService
      .getTestByjd(accessToken, jobId)
      .then((response) => SetTests(response))
      .catch((er) => console.log(er))
  }, [load])
  return <>{tests.length > 0 ? tests.map((test) => <TestItem test={test} jobId={jobId} load={load} setLoad={setLoad} />) : <></>}</>
}

const TestItem = ({ test, jobId, load, setLoad }) => {
  const navigate = useNavigate()
  return (
    <Box w={'100%'}>
      <HStack w={'100%'} mb={5} pl={30} pr={30}>
        <Card w={'100%'}>
          <CardBody>
            <HStack>
              <Image w={100} height={100} src='https://freedomtoteach.collins.co.uk/wp-content/uploads/sites/87/2023/03/shutterstock_397626016-1-scaled.jpg' />
              <VStack>
                <IconButton onClick={() => navigate(`/process/screening-test/${test.id}`)} backgroundColor={'#97E7E1'} icon={<AiOutlineEdit />} />
                <IconButton backgroundColor={'#FEC7B4'} icon={<AiOutlineDelete />} />
              </VStack>
              <Box pl={30} w={'100%'}>
                <Text>Test name: {test.summary}</Text>
                <Text>
                  From: {new Date(test.startTime).toLocaleString()} to {new Date(test.endTime).toLocaleString()}
                </Text>
              </Box>
            </HStack>
          </CardBody>
        </Card>
      </HStack>
    </Box>
  )
}

const AddTestForm = ({ jobId, load, setLoad }) => {
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [form, setForm] = useState({
    jdId: jobId,
    summary: '',
    startTime: '',
    endTime: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    })
  }
  const isValidTimeFormat = (time) => {
    const timeRegex = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/
    return timeRegex.test(time)
  }

  const validateForm = () => {
    if (!form.summary) {
      toast.error('Summary is required')
      return false
    }

    if (!form.startTime) {
      toast.error('Start time is required')
      return false
    }

    if (!form.endTime) {
      toast.error('End time is required')
      return false
    }

    return true
  }
  const handleSubmit = () => {
    if (validateForm()) {
      testService
        .addTest(accessToken, form)
        .then((response) => {
          toast.info(response.message)
          onClose()
          setLoad(!load)
        })
        .catch((er) => console.log(er))
    }
  }

  return (
    <>
      <Button ml={8} color='white' borderRadius={10} backgroundColor={'rgb(3, 201, 215)'} onClick={onOpen} mr={30}>
        + new test
      </Button>
      <Modal fontFamily={'Montserrat'} size={'2xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent fontFamily={'Montserrat'}>
          <ModalHeader>Add Test</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>JD ID</FormLabel>
              <Input type='number' name='jdId' value={form.jdId} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Summary</FormLabel>
              <Input type='text' name='summary' value={form.summary} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Start Time</FormLabel>
              <Input type='datetime-local' name='startTime' value={form.startTime} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>End Time</FormLabel>
              <Input type='datetime-local' name='endTime' value={form.endTime} onChange={handleChange} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button color='white' borderRadius={10} backgroundColor={'rgb(3, 201, 215)'} onClick={handleSubmit} mr={3}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Screening
