import {
  Avatar,
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Card,
  CardBody,
  ChakraProvider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  List,
  ListIcon,
  ListItem,
  Radio,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { loadJobDetail } from '../../redux/JobDetail/Action'
import { Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { interviewService } from '../../Service/interview.service'
import { testService } from '../../Service/test.service'
import { AiOutlinePlayCircle } from 'react-icons/ai'
import { jobService } from '../../Service/job.service'
import { locationService } from '../../Service/location.service'
import { Stack } from 'react-bootstrap'
import { CheckIcon, EmailIcon, PhoneIcon, Search2Icon, SearchIcon, StarIcon, ViewIcon } from '@chakra-ui/icons'
import { CandidateDetailInProces } from './CandidateDetailInProcess'
import { ManageLabel } from './ManageLabel'
import { labelService } from '../../Service/label.service'
import { MdSettings } from 'react-icons/md'

const steps = [
  { title: 'Tiếp nhận CV', description: 'Đăng tuyển dụng và chờ đợi các ứng viên ứng tuyển' },
  { title: 'Kiểm tra sàng lọc', description: 'Kiểm tra năng lực ứng viên bằng bài test online' },
  { title: 'Kết quả sàng lọc', description: 'Chọn những ứng viên phỏng vấn' },
  { title: 'Phỏng vấn', description: 'Tiến hành phỏng vấn' },
  { title: 'Đánh giá', description: `Đánh giá khả năng làm việc của ứng viên` },
]

export const ProcessItem = () => {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const job = useSelector((store) => store.jobDetail.data)
  const [job, setJob] = useState({})

  useEffect(() => {
    // dispatch(loadJobDetail(params.jobId))
    jobService.getById(params.jobId).then((response) => setJob(response))
  }, [params.jobId])

  const data = {
    id: 0,
    name: 'TOP VIP',
    price: 500000,
    des: 'Trải nghiệm đăng tin tuyển dụng hiệu quả với vị trí nổi bật trong Việc làm tốt nhất kết hợp cùng các dịch vụ cao cấp, giá dùng thử hấp dẫn',
    benefit: 'Hiển thị trong TOP đề xuất việc làm phù hợp, Tin tuyển dụng được nằm trong danh sách đề xuất gửi thông báo tới ứng viên tiềm năng qua email / ứng dụng di động TopCV (hệ thống AI tự động gửi theo danh sách đề xuất nếu tin tuyển dụng phù hợp với ứng viên).',
  }

  const tabIndex = parseInt(params.tab, 10) || 0

  return (
    // đây là trang chính
    <Box minHeight={2000} overflow='auto' fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'}>
      <Breadcrumb pt={30}>
        <BreadcrumbItem>
          <BreadcrumbLink href='/process'>Chiến dịch tuyển dụng</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>{job.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack pl={30} pr={30} spacing={3}>
        <Box minHeight={1000} overflow='auto' backgroundColor={'#FFFFFF'} w={'100%'} mb={10}>
          <Tabs borderRadius={10} defaultIndex={tabIndex}>
            <TabList>
              <Tab>Bài đăng</Tab>
              <Tab>Tiến trình</Tab>
              <Tab>CV ứng tuyển</Tab>
              <Tab>CV đề xuất</Tab>
              <Tab>Gán nhãn CV</Tab>
              <Tab>Dịch vụ</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Post jobId={params.jobId} />
              </TabPanel>
              <TabPanel>
                <StepProcess job={job} />
              </TabPanel>
              <TabPanel>
                <ListCVTab job={job} />
              </TabPanel>
              <TabPanel>4</TabPanel>
              <TabPanel>
                <ManageLabel />
              </TabPanel>
              <TabPanel>
                <Box bgColor={'#FEEBC8'} w={'100%'} as='blockquote' borderRadius={3} borderLeft='4px solid' borderColor='blue.400' pl={4} py={2} mb={4}>
                  Khi bạn sử dụng dịch vụ vip bạn chỉ có thể áp dụng cho 1 chiến dịch tuyển dụng
                </Box>
                <Card>
                  <Box padding='4'>
                    <Heading as='h2' size='lg' mb={2}>
                      {data.name}
                    </Heading>
                    <Text mb={2}>
                      <strong>Giá:</strong> {data.price}
                    </Text>
                    <Text mb={2}>
                      <strong>Mô tả:</strong> {data.des}
                    </Text>
                    <Text mb={4}>
                      <strong>Quyền lợi:</strong> {data.benefit}
                    </Text>
                    <Button color={'white'} bgColor={'#2CCCC7'}>
                      Áp dụng
                    </Button>
                  </Box>
                </Card>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </VStack>
    </Box>
  )
}

const StepProcess = ({ job }) => {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })
  const setIndex = (index) => {
    setActiveStep(index)
  }
  return (
    <Stepper orientation='vertical' index={activeStep}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
          </StepIndicator>
          <Box flexShrink='0'>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>
              <Rt description={step.description} setIndex={setIndex} index={index} job={job} />
            </StepDescription>
          </Box>
          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  )
}

const Rt = ({ index, job, setIndex, description }) => {
  switch (index) {
    case 0:
      return <Step0Item description={description} index={index} setIndex={setIndex} job={job} />
    case 1:
      return <Step1Item description={description} index={index} setIndex={setIndex} job={job} />
    case 2:
      return <Step2Item description={description} index={index} setIndex={setIndex} job={job} />
    case 3:
      return <Step3Item description={description} index={index} setIndex={setIndex} job={job} />
    case 4:
      return <Step4Item description={description} index={index} setIndex={setIndex} job={job} />
    default:
      return null
  }
}
const Step0Item = ({ job, index, setIndex, description }) => {
  return (
    <Box p={5} w={'100%'} boxShadow={'lg'} borderRadius={20}>
      <Text>{description}</Text>
      <Text>Ngày tạo: {job.createDate}</Text>
      <Text>Số lượng tuyển: {job.number}</Text>
      <ListCandidate job={job} />
    </Box>
  )
}

const Step1Item = ({ job, index, setIndex, description }) => {
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [tests, SetTests] = useState({})
  useEffect(() => {
    testService
      .getTestByjd(accessToken, job.id)
      .then((response) => SetTests(response))
      .catch((er) => console.log(er))
  }, [])
  return (
    <Box p={5} w={'100%'} boxShadow={'lg'} borderRadius={20}>
      <Text>{description}</Text>
      <Text>Số bài test: {tests.length}</Text>
      <HStack>
        <IconButton borderRadius={20} fontSize={14} onClick={() => setIndex(index)} icon={<AiOutlinePlayCircle />} />
        <Button borderRadius={20} fontSize={14} onClick={() => navigate(`/process/screening/${job.id}`)}>
          Kiểm tra sàng lọc
        </Button>
      </HStack>
    </Box>
  )
}
const Step2Item = ({ job, index, setIndex, description }) => {
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [tests, SetTests] = useState({})
  useEffect(() => {
    testService
      .getTestByjd(accessToken, job.id)
      .then((response) => SetTests(response))
      .catch((er) => console.log(er))
  }, [])

  return (
    <Box fontSize={14} p={5} w={'100%'} boxShadow={'lg'} borderRadius={20}>
      <Text>{description}</Text>
      <Text>Số ứng viên: 2</Text>
      <HStack>
        <IconButton borderRadius={20} fontSize={14} onClick={() => setIndex(index)} icon={<AiOutlinePlayCircle />} />
        <Button borderRadius={20} fontSize={14} onClick={() => navigate(`/process/step/screening-resume/${job.id}`)}>
          Xem kết quả sàng lọc
        </Button>
      </HStack>
    </Box>
  )
}
const Step3Item = ({ job, index, setIndex, description }) => {
  const navigate = useNavigate()
  const [number, setNumber] = useState(0)
  return (
    <Box fontSize={14} p={5} w={'100%'} boxShadow={'lg'} borderRadius={20}>
      <Text>{description}</Text>
      <Text>Số phòng phỏng vấn: {number}</Text>
      <HStack>
        <IconButton borderRadius={20} fontSize={14} onClick={() => setIndex(index)} icon={<AiOutlinePlayCircle />} />
        <ListRoom setNumber={setNumber} job={job} />
        <Button borderRadius={20} fontSize={14} onClick={() => navigate('/roomAdd')}>
          Tạo phòng phỏng vấn
        </Button>
      </HStack>
    </Box>
  )
}
const Step4Item = ({ job, index, setIndex, description }) => {
  const navigate = useNavigate()
  return (
    <Box fontSize={14} p={5} w={'100%'} boxShadow={'lg'} borderRadius={20}>
      <Text>{description}</Text>
      <Text>Kết quả</Text>
      <HStack>
        <IconButton borderRadius={20} fontSize={14} onClick={() => setIndex(index)} icon={<AiOutlinePlayCircle />} />
        <Button borderRadius={20} fontSize={14} onClick={() => navigate('/result')}>
          Xem kết quả
        </Button>
      </HStack>
    </Box>
  )
}

function ListCandidate({ job }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [candidates, setCandidates] = useState([])
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  useEffect(() => {
    interviewService
      .getCandidatesByJob(accessToken, job.id)
      .then((response) => setCandidates(response))
      .catch((er) => console.log(er))
  }, [job])
  return (
    <>
      <Button borderRadius={20} fontSize={14} onClick={onOpen}>
        Chi tiết
      </Button>

      <Modal fontFamily={'Montserrat'} size={'2xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxH={500} overflow={'auto'}>
          <ModalHeader>{candidates.length} resumes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {candidates.map((candidate) => (
              <Box p={5} boxShadow='md' borderRadius={20}>
                <Text>{candidate.fullName}</Text>
                <Text>{candidate.email}</Text>
                <Text fontWeight={'bold'}>{candidate.interviewStatus}</Text>
                <Button borderRadius={20} color={'#ffffff'} backgroundColor='rgb(3, 201, 215)' as='a' href={candidate.cv} target='_blank'>
                  Link CV
                </Button>
              </Box>
            ))}
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

function ListRoom({ job, setNumber }) {
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [rooms, setRooms] = useState([])
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token

  useEffect(() => {
    interviewService
      .getInterviewByJobId(accessToken, job.id)
      .then((response) => {
        setRooms(response)
        setNumber(response.length)
      })
      .catch((er) => console.log(er))
  }, [job])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    const hours = ('0' + date.getHours()).slice(-2)
    const minutes = ('0' + date.getMinutes()).slice(-2)
    return `${year}-${month}-${day} ${hours}:${minutes}`
  }
  return (
    <>
      <Button borderRadius={20} fontSize={14} onClick={onOpen}>
        Phòng họp
      </Button>

      <Modal fontFamily={'Montserrat'} size={'2xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w={1000} maxH={500} overflow={'auto'}>
          <ModalHeader>Phòng</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {rooms.map((room) => (
              <Box p={5} boxShadow='md' borderRadius={20}>
                <Text>Tên: {room.roomName}</Text>
                <Text>Title: {room.roomSkill}</Text>
                <Text>Số ứng viên: {room.listCandidate.length}</Text>
                <Text>
                  Thời gian: {formatDate(room.startDate)} to {formatDate(room.endDate)}
                </Text>
                <Text>Trạng thái phòng: {room.status}</Text>
                <Button onClick={() => navigate(`/addCandidate/${job.id}/${room.id}`)} borderRadius={20} color={'#ffffff'} backgroundColor='rgb(3, 201, 215)'>
                  Chi tiết
                </Button>
              </Box>
            ))}
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

//  component item khi xem ở chế độ tiến trình
const Post = ({ jobId }) => {
  const [data, setData] = useState({})
  const [province, setProvince] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    jobService.getById(jobId).then((response) => setData(response))
  }, [])

  useEffect(() => {
    locationService
      .getAllProvince()
      .then((response) => {
        setProvince(response)
      })
      .catch((er) => console.log(er))
  }, [])
  return (
    <Card>
      <CardBody>
        <HStack>
          <Text fontSize='20px'>{data.name}</Text>
        </HStack>

        <List spacing={3}>
          <ListItem>
            <ListIcon as={ViewIcon} color='green.500' />
            Hiển thị
          </ListItem>
          <ListItem>
            <ListIcon as={StarIcon} color='green.500' />
            Dịch vụ vip
          </ListItem>
          <ListItem>
            <HStack>
              <Button onClick={() => navigate(`/allJob_Recruiter/jobDetail_Recruiter/${data.id}`)} rightIcon={<MdSettings />} colorScheme='gray' variant='outline'>
                Chỉnh sửa
              </Button>
              <Button onClick={() => navigate(`/process/screening/${data.id}`)} rightIcon={<CheckIcon />} colorScheme='yellow' variant='outline'>
                Bài test sàng lọc
              </Button>
            </HStack>
          </ListItem>
        </List>
      </CardBody>
    </Card>
  )
}

/// tab danh sách CV ứng tuyển
const ListCVTab = ({ job, setTabIndex }) => {
  let states = {
    RECEIVE_CV: 'Tiếp nhận CV',
    SUITABLE: 'Phù hợp yêu cầu',
    SCHEDULE_INTERVIEW: 'Lên lịch phỏng vấn',
    SEND_PROPOSAL: 'Gửi đề nghị',
    ACCEPT: 'Nhận việc',
    REJECT: 'Từ chối',
  }
  const [candidates, setCandidates] = useState([])
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [labels, setLabels] = useState([])
  const [load, setLoad] = useState(false)
  useEffect(() => {
    interviewService
      .getCandidatesByJob(accessToken, job.id)
      .then((response) => setCandidates(response))
      .catch((er) => console.log(er))
  }, [job, load])

  useEffect(() => {
    labelService
      .getMyLabel(accessToken)
      .then((response) => setLabels(response))
      .catch((er) => console.log(er))
  }, [])

  // bộ lọc
  const [filteredCandidates, setFilteredCandidates] = useState([])
  const [filter, setFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [labelFilter, setLabelFilter] = useState('')

  useEffect(() => {
    const applyFilters = () => {
      let filtered = candidates
      if (filter) {
        filtered = filtered.filter((candidate) => (filter === 'viewed' ? candidate.view === true : candidate.view === false))
      }
      if (statusFilter) {
        filtered = filtered.filter((candidate) => candidate.cvStatus === statusFilter)
      }
      if (labelFilter) {
        filtered = filtered.filter((candidate) => {
          const candidateLabels = JSON.parse(candidate.labels)
          // Lọc nhãn có giá trị là true
          return candidateLabels[labelFilter] === true
        })
      }
      setFilteredCandidates(filtered)
    }

    applyFilters()
  }, [candidates, filter, statusFilter, labelFilter])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleFilterStatusChange = (event) => {
    setStatusFilter(event.target.value)
  }

  const handleLabelFilterChange = (event) => {
    setLabelFilter(event.target.value)
  }

  return (
    <>
      <HStack w={'100%'} mb={5} spacing={1}>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <SearchIcon color='gray.300' />
          </InputLeftElement>
          <Input type='text' placeholder='Tìm ứng viên' />
        </InputGroup>
        <Select placeholder='Tất cả trạng thái' onChange={handleFilterStatusChange}>
          {Object.entries(states).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </Select>
        <Select placeholder='Hiện tất cả CV' onChange={handleFilterChange}>
          <option value='viewed'>Đã xem</option>
          <option value='notViewed'>Chưa xem</option>
        </Select>
        <Select placeholder='Tất cả nhãn' onChange={handleLabelFilterChange}>
          {labels.map((label) => (
            <option key={label.id} value={label.id}>
              {label.name}
            </option>
          ))}
        </Select>
      </HStack>
      {/* <Box bgColor={'#FEEBC8'} w={'100%'} as='blockquote' borderRadius={3} borderLeft='4px solid' borderColor='blue.400' pl={4} py={2} mb={4}>
        Hãy sàng lọc những CV phù hợp với yêu cầu của mình và gán nhãn cho họ đến với những bước tiếp theo tron quá trình tuyển dụng
      </Box> */}

      <TableContainer fontFamily={'Montserrat'}>
        <Table mb={5} borderWidth={1} variant='simple'>
          <Thead>
            <Tr>
              <Th>Ứng viên</Th>
              <Th>CV</Th>
              <Th>Thông tin liên hệ</Th>
              <Th>Ngày ứng tuyển</Th>
              <Th>Trạng thái</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredCandidates.map((candidate) => (
              <CandidateDetailInProces load={load} setLoad={setLoad} candidate={candidate} setTabIndex={setTabIndex} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <HStack w={'100%'} mb={5} spacing={1} justifyContent='flex-end'>
        <Radio value='1'>Chỉ xem ứng viên pro</Radio>
        <Button size={'sm'}>Xuất danh sách</Button>
      </HStack>
    </>
  )
}
