import React, { useId, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import {
  Box,
  Flex,
  Text,
  Image,
  Badge,
  Select,
  HStack,
  VStack,
  Button,
  Textarea,
  Input,
  FormControl,
  FormLabel,
  BreadcrumbItem,
  BreadcrumbLink,
  Breadcrumb,
  Card,
  CardBody,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepTitle,
  StepDescription,
  StepNumber,
  useSteps,
  StepIcon,
  StepSeparator,
  Heading,
  Icon,
} from '@chakra-ui/react'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import './style4.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadJob } from '../../redux/Job-posting/Action'
import uuid from 'react-uuid'
import { Link } from 'react-router-dom'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebase.js'
import { v4 } from 'uuid'
import { hostName } from '../../global.js'
import { locationService } from '../../Service/location.service.js'
import { DragHandleIcon, InfoIcon, SmallAddIcon } from '@chakra-ui/icons'
import { AiOutlineEdit, AiOutlineFire, AiOutlineFolderOpen, AiOutlineInfoCircle } from 'react-icons/ai'
const JobPosting = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadJob())
  }, [])

  const data = useSelector((store) => store.job.data)
  if (data !== null) {
    console.log(data.length)
  }
  const jobList = data !== null ? data.slice(data.length - 3, data.length) : []
  const [passShow, setPassShow] = useState(false)
  const [cpassShow, setCPassShow] = useState(false)
  const navigate = useNavigate()

  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [language, setLanguage] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')
  const [number, setNumber] = useState('')
  const [workingForm, setWorkingForm] = useState('')
  const [sex, setSex] = useState('NONE')
  const [experience, setExperience] = useState('')
  const [detailLocation, setDetailLocation] = useState('')
  const [detailJob, setDetailJob] = useState('')
  const [requirements, setRequirements] = useState('')
  const [interest, setInterest] = useState('')
  const [image, setImage] = useState('')

  const [industry, setIndustry] = useState('')
  const [industry2, setIndustry2] = useState('')

  const handleUpload = (e) => {
    const storageRef = ref(storage, `/files/${e.target.files[0].name + v4()}`)
    uploadBytes(storageRef, e.target.files[0]).then((data) => {
      console.log(data)
      getDownloadURL(data.ref).then((url) => {
        setImage(url)
        console.log('image', url)
      })
    })
  }

  const HandleSubmit = async (e) => {
    e.preventDefault()
    if (name === '') {
      toast.error('name is required!', {
        position: 'top-center',
      })
    } else if (industry === '') {
      toast.error('industry is required!', {
        position: 'top-center',
      })
    } else if (industry2 === '') {
      toast.error('industry2 is required!', {
        position: 'top-center',
      })
    } else if (position === '') {
      toast.error('position is required!', {
        position: 'top-center',
      })
    } else if (salary === '') {
      toast.error('salary is required!', {
        position: 'top-center',
      })
    } else if (workingForm === '') {
      toast.error('workingForm is required!', {
        position: 'top-center',
      })
    } else if (location === '') {
      toast.error('location is required!', {
        position: 'top-center',
      })
    } else if (language === '') {
      toast.error('language is required!', {
        position: 'top-center',
      })
    } else if (sex === '') {
      toast.error('sex is required!', {
        position: 'top-center',
      })
    } else if (number === '') {
      toast.error('number is required!', {
        position: 'top-center',
      })
    } else if (detailLocation === '') {
      toast.error('detailLocation is required!', {
        position: 'top-center',
      })
    } else if (experience === '') {
      toast.error('experience is required!', {
        position: 'top-center',
      })
    } else if (detailJob === '') {
      toast.error('detailJob is required!', {
        position: 'top-center',
      })
    } else if (requirements === '') {
      toast.error('requirements is required!', {
        position: 'top-center',
      })
    } else if (interest === '') {
      toast.error('interest is required!', {
        position: 'top-center',
      })
    } else if (image === null) {
      toast.error('image is required!', {
        position: 'top-center',
      })
    } else {
      try {
        const formData = new FormData()
        formData.append('file', image)

        const imageResponse = await axios.post(`${hostName}/file/upload`, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        const imageData = imageResponse.data.data
        let data = JSON.stringify({
          name,
          position,
          language,
          location,
          salary,
          number,
          workingForm,
          sex,
          experience,
          detailLocation,
          detailJob,
          requirements,
          interest,
          industry,
          industry2,
          image: imageData,
        })

        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${hostName}/job-posting`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          data: data,
        }

        axios
          .request(config)
          .then((response) => {
            console.log('ok')
          })
          .catch((error) => {
            console.log(error)
            toast.error('Upload Job Failed', {
              position: 'top-center',
            })
          })

        toast.success('Upload Job Successfuly', {
          position: 'top-center',
        })
        window.location.replace(`/job-posting`)
      } catch (error) {}
    }
  }

  const userId = JSON.parse(localStorage.getItem('data')).data.userInfo.id

  const [province, setProvince] = useState([])
  useEffect(() => {
    locationService
      .getAllProvince()
      .then((response) => {
        setProvince(response)
      })
      .catch((er) => console.log(er))
  }, [])

  // danh sach nganh nghe
  const [industries, setIndustries] = useState([])
  useEffect(() => {
    axios
      .get(`${hostName}/industries`)
      .then((response) => {
        setIndustries(response.data)
      })
      .catch((error) => {
        console.error('There was an error fetching the industries!', error)
      })
  }, [])

  return (
    <>
      <Box minHeight={2000} overflow='auto' fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'}>
        <ToastContainer />
        <Breadcrumb pt={30}>
          <BreadcrumbItem>
            <BreadcrumbLink href='/allJob_Recruiter'>Công việc của tôi</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Đăng tuyển dụng</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* tiêu đề */}
        <Box pl={30} pr={30} w={'100%'} mb={5}>
          <Card>
            <CardBody>
              <FormControl>
                <HStack alignItems='center' spacing={4}>
                  <Icon as={AiOutlineEdit} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
                  <Text m={0} fontSize='2xl'>
                    Tiêu đề tuyển dụng
                  </Text>
                </HStack>
                <Input mt={5} w={'50%'} type='text' onChange={(e) => setName(e.target.value)} name='name' id='Name' />
              </FormControl>
            </CardBody>
          </Card>
        </Box>

        {/* ngành nghề */}
        <Box pl={30} pr={30} w={'100%'} mb={5}>
          <Card>
            <CardBody>
              <FormControl>
                <HStack alignItems='center' spacing={4}>
                  <Icon as={AiOutlineFolderOpen} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
                  <Text m={0} fontSize='2xl'>
                    Ngành nghề
                  </Text>
                </HStack>
                <HStack mt={3}>
                  <FormLabel w={'15%'}>Ngành nghề chính</FormLabel>
                  <Select w={'35%'} placeholder='Chọn ngành nghề' value={industry} onChange={(e) => setIndustry(e.target.value)}>
                    {industries.map((industry, index) => (
                      <option key={index} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </Select>
                  <FormLabel w={'15%'}>Ngành nghề phụ</FormLabel>
                  <Select w={'35%'} placeholder='Chọn ngành nghề' value={industry2} onChange={(e) => setIndustry2(e.target.value)}>
                    {industries.map((industry, index) => (
                      <option key={index} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </Select>
                </HStack>
              </FormControl>
            </CardBody>
          </Card>
        </Box>
        {/* thoong tin chung */}
        <Box pl={30} pr={30} w={'100%'} mb={5}>
          <Card>
            <CardBody>
              <FormControl>
                <HStack alignItems='center' spacing={4}>
                  <Icon as={AiOutlineInfoCircle} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
                  <Text m={0} fontSize='2xl'>
                    Thông tin chung
                  </Text>
                </HStack>
                <HStack mt={3}>
                  <FormLabel w={'15%'}>Địa chỉ làm việc</FormLabel>
                  <Input w={'50%'} type='text' onChange={(e) => setDetailLocation(e.target.value)} name='position' id='position' />
                </HStack>

                <HStack mt={3}>
                  <FormLabel w={'15%'}>Lương</FormLabel>
                  <Select w={'35%'} onChange={(e) => setSalary(e.target.value)} defaultValue='all'>
                    <option value='all'>Mức lương</option>
                    <option value='Dưới 10 triệu'>Dưới 10 triệu</option>
                    <option value='10 -15 triệu'>10 -15 triệu</option>
                    <option value='15 -20 triệu'>15 -20 triệu</option>
                    <option value='20 -25 triệu'>20 -25 triệu</option>
                    <option value='25 -30 triệu'>25 -30 triệu</option>
                    <option value='30 -50 triệu'>30 -50 triệu</option>
                    <option value='trên 50 triệu'>trên 50 triệu</option>
                    <option value='thỏa thuận'>thỏa thuận</option>
                  </Select>
                  <FormLabel w={'15%'}>Hình thức làm việc</FormLabel>
                  <Input w={'35%'} type='text' onChange={(e) => setWorkingForm(e.target.value)} name='workingForm' id='workingForm' />
                </HStack>

                <HStack mt={3}>
                  <FormLabel w={'15%'}>Địa điểm</FormLabel>
                  <Select w={'35%'} defaultValue='all' onChange={(e) => setLocation(e.target.value)}>
                    <option value='all'>Địa điểm</option>
                    {province.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </Select>
                  <FormLabel w={'15%'}>Ngôn ngữ</FormLabel>
                  <Input w={'35%'} type='text' onChange={(e) => setLanguage(e.target.value)} name='language' id='language' />
                </HStack>

                <HStack mt={3}>
                  <FormLabel w={'15%'}>Giới tính</FormLabel>
                  <Select w={'35%'} onChange={(e) => setSex(e.target.value)} defaultValue='NONE'>
                    <option value='Nam'>Nam</option>
                    <option value='Nữ'>Nữ</option>
                    <option value='Không yêu cầu'>Không yêu cầu</option>
                  </Select>
                  <FormLabel w={'15%'}>Số lượng tuyển</FormLabel>
                  <Input w={'35%'} onChange={(e) => setNumber(e.target.value)} type='text' name='number' id='number' />
                </HStack>

                <HStack mt={3}>
                  <FormLabel w={'15%'}>Chức vụ</FormLabel>
                  <Input w={'35%'} onChange={(e) => setPosition(e.target.value)} type='text' name='detailLocation' id='detailLocation' />
                  <FormLabel w={'15%'}>Kinh nghiệm</FormLabel>
                  <Select w={'35%'} onChange={(e) => setExperience(e.target.value)} defaultValue={'Chưa có'}>
                    <option value='all'>Kinh nghiệm</option>
                    <option value='chưa có'>chưa có</option>
                    <option value='dưới 1 năm'>dưới 1 năm</option>
                    <option value='1 năm'>1 năm</option>
                    <option value='2 năm'>2 năm</option>
                    <option value='3 năm'>3 năm</option>
                    <option value='4 năm'>4 năm</option>
                    <option value='5 năm'>5 năm</option>
                    <option value='trên 5 năm'>trên 5 năm</option>
                  </Select>
                </HStack>
              </FormControl>
            </CardBody>
          </Card>
        </Box>
        {/* chi tiet */}
        <Box pl={30} pr={30} minHeight={1000} w={'100%'} mb={5}>
          <Card>
            <CardBody>
              <FormControl>
                <HStack alignItems='center' spacing={4}>
                  <Icon as={DragHandleIcon} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
                  <Text m={0} fontSize='2xl'>
                    Thông tin chi tiết
                  </Text>
                </HStack>
                <FormLabel>Mô tả</FormLabel>
                <Textarea h={250} onChange={(e) => setDetailJob(e.target.value)} type='text' name='detailJob' id='detailJob' />

                <FormLabel>Yêu cầu</FormLabel>
                <Textarea h={250} onChange={(e) => setRequirements(e.target.value)} type='text' name='requirements' id='requirements' />

                <FormLabel>Quyền lợi</FormLabel>
                <Textarea h={250} onChange={(e) => setInterest(e.target.value)} type='text' name='interest' id='interest' />

                <FormLabel>Hình ảnh</FormLabel>
                <Input type='file' onChange={(e) => setImage(e.target.files[0])} name='image' id='image' />
              </FormControl>
            </CardBody>
          </Card>
        </Box>
        {/* bổ sung */}
        <Box pl={30} pr={30} w={'100%'} mb={5}>
          <Card>
            <CardBody>
              <FormControl>
                <HStack alignItems='center' spacing={4}>
                  <Icon as={AiOutlineFire} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
                  <Text m={0} fontSize='2xl'>
                    Bổ sung
                  </Text>
                </HStack>
                <HStack mt={3}>
                  <FormLabel w={'15%'}>Vip</FormLabel>
                  <Select w={'35%'} placeholder='Select option'>
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                  </Select>
                  <FormLabel w={'15%'}>Bài test sàng lọc</FormLabel>
                  <Select w={'35%'} placeholder='Select option'>
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                  </Select>
                </HStack>
              </FormControl>
            </CardBody>
          </Card>
        </Box>

        <HStack justifyContent={'space-between'} pl={30} pr={30} w={'100%'} mb={5}>
          <Button w={300} color={'white'} onClick={HandleSubmit} bgColor={'#2cccc7'}>
            Lưu
          </Button>
        </HStack>
      </Box>
    </>
  )
}

export default JobPosting
