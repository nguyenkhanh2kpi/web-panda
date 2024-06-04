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
  CardHeader,
  Flex,
  Avatar,
  Heading,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
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
import { EmailIcon } from '@chakra-ui/icons'
import { FaCode, FaPencilAlt, FaRegQuestionCircle } from 'react-icons/fa'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { bgcolor } from '@mui/system'

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
      </HStack>
      <HStack mb={3}>
        {job ? <AddTestForm jobId={job.id} load={load} setLoad={setLoad} /> : <></>}

        <Button color={'white'} leftIcon={<FaPencilAlt />} backgroundColor={'rgb(3, 201, 215)'} variant='solid'>
          Bài kiểm tra tự luận
        </Button>
        <Button color={'white'} leftIcon={<FaCode />} backgroundColor={'rgb(3, 201, 215)'} variant='solid'>
          Kiểm tra code(dành cho ngành IT)
        </Button>
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
            <CardHeader>
              <Flex spacing='4'>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                  <Avatar name='Question' src='https://img.icons8.com/?size=100&id=6651&format=png&color=000000' />

                  <Box>
                    <Heading fontFamily={'Montserrat'} size='sm'>
                      Tên: {test.summary}
                    </Heading>
                    <Text>Thời gian làm bài {test.time} phút</Text>
                  </Box>
                </Flex>
                <Menu>
                  <MenuButton _hover={{bgcolor: "white"}} bgColor={'white'} as={Button} rightIcon={<BsThreeDotsVertical />} />
                  <MenuList>
                    <MenuItem onClick={() => navigate(`/process/screening-test/${test.id}`)} >Chỉnh sửa</MenuItem>
                    <MenuItem>Xóa</MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </CardHeader>
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
    time: '',
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
      toast.error('Yêu cầu nhập tên')
      return false
    }

    if (!form.time) {
      toast.error('Yêu cầu nhập thời gian làm bài')
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
      <Button ml={8} color={'white'} leftIcon={<FaRegQuestionCircle />} onClick={onOpen} backgroundColor={'rgb(3, 201, 215)'} variant='solid'>
        Bài kiểm tra trắc nghiệm
      </Button>
      <Modal fontFamily={'Montserrat'} size={'2xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent fontFamily={'Montserrat'}>
          <ModalHeader>Thêm bài kiểm tra trắc nghiệm</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>JD ID</FormLabel>
              <Input disabled type='number' name='jdId' value={form.jdId} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Tên</FormLabel>
              <Input type='text' name='summary' value={form.summary} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Thời gian làm bài (phút)</FormLabel>
              <Input type='number' name='time' value={form.time} onChange={handleChange} min={1} max={200} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button color='white' borderRadius={10} backgroundColor={'rgb(3, 201, 215)'} onClick={handleSubmit} mr={3}>
              Lưu
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Screening
