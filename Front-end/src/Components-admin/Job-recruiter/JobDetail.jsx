import { Box, Button, Image, Text, Badge, Select, Input, Textarea, VStack, Link, HStack, FormControl, FormLabel, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Card, CardBody, Icon, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { loadJobDetail } from '../../redux/JobDetail/Action'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { hostName } from '../../global'
import { locationService } from '../../Service/location.service'
import { jobService } from '../../Service/job.service'
import { AiOutlineEye, AiOutlineFolderOpen, AiOutlineInfoCircle } from 'react-icons/ai'
import ConfirmVipDialog from './ConfirmVipDialog'
export const State = {
  CREATE: 'Tạo',
  ON: 'Mở nhận CV',
  PAUSE: 'Tạm dừng',
  END: 'Kết thúc',
}

function JobDetailRecruiter() {
  const toast = useToast()
  const params = useParams()
  const cancelRef = React.useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [data, setData] = useState({})
  useEffect(() => {
    jobService.getById(params.id).then((response) => setData(response))
  }, [])

  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [name, setName] = useState(data.name)
  const [position, setPosition] = useState(data.position)
  const [requirements, setRequirements] = useState(data.requirements)
  const [location, setLocation] = useState(data.location)
  const [salary, setSalary] = useState(data.salary)
  const [number, setNumber] = useState(data.number)
  const [workingForm, setWorkingForm] = useState(data.workingForm)
  const [sex, setSex] = useState(data.sex)
  const [experience, setExperience] = useState(data.experience)
  const [detailLocation, setDetailLocation] = useState(data.detailLocation)
  const [detailJob, setDetailJob] = useState(data.detailJob)
  const [interest, setInterest] = useState(data.interest)
  const [testImage, setTestImage] = useState()
  const [status, setStatus] = useState(data.status)
  const [language, setLanguage] = useState(data.language)

  const [industry, setIndustry] = useState(data.industry)
  const [industry2, setIndustry2] = useState(data.industry2)

  const [province, setProvince] = useState([])
  useEffect(() => {
    locationService
      .getAllProvince()
      .then((response) => {
        setProvince(response)
      })
      .catch((er) => console.log(er))
  }, [])

  let img = []

  const onOpen = async (e) => {
    e.preventDefault()
    if (name === '') {
      toast.error('name is required!', {
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
    } else {
      if (testImage != null && !window.testImage) {
        const formData = new FormData()
        console.log('vao dc r', testImage)
        formData.append('file', testImage)

        const imageResponse = await axios.post(`${hostName}/file/upload`, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        img.push(imageResponse.data.data)
      } else {
        console.log('img bi null r ')
      }
      console.log('img', img.at(0))
      let data1 = JSON.stringify({
        name: name,
        position: position,
        language: language,
        location: location,
        salary: salary,
        number: number,
        workingForm: workingForm,
        sex: sex,
        experience: experience,
        detailLocation: detailLocation,
        detailJob: detailJob,
        requirements: requirements,
        interest: interest,
        image: img.length != 0 ? img.at(0) : data.image,
        status: status,
        industry: industry,
        industry2: industry2,
      })

      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${hostName}/job-posting/${params.id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        data: data1,
      }

      console.log(config)

      axios
        .request(config)
        .then((response) => {
          console.log('haha')
        })
        .catch((error) => {
          console.log(error)
          toast.error('Update Job Failed', {
            position: 'top-center',
          })
        })

      toast.success('Update Job Successfuly', {
        position: 'top-center',
      })
      setTimeout(() => {
        navigate('/allJob_Recruiter')
      }, 2000)
    }
  }

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

  const handleApplyVip = () => {
    jobService
      .putVipJob(accessToken, params.id)
      .then((response) =>
        toast({
          title: 'Áp dụng Top vip',
          description: response.message,
          status: 'info',
          duration: 1000,
          isClosable: true,
        })
      )
      .catch((er) => console.log(er))
  }

  if (data != null)
    return (
      <>
        <Box minHeight={2000} overflow='auto' fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'}>
          <Breadcrumb pt={30}>
            <BreadcrumbItem>
              <BreadcrumbLink href='/allJob_Recruiter'>Công việc của tôi</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Đăng tuyển dụng</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          {/* hien thi */}
          <Box pl={30} pr={30} w={'100%'} mb={5}>
            <Card>
              <CardBody>
                <FormControl>
                  <HStack alignItems='center' spacing={4}>
                    <Icon as={AiOutlineEye} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
                    <Text m={0} fontSize='2xl'>
                      Hiển thị
                    </Text>
                  </HStack>
                  <HStack mt={3}>
                    <FormLabel w={'15%'}>Trạng thái</FormLabel>
                    <Select w={'35%'} variant='filled'>
                      {Object.values(State).map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </Select>
                    <FormLabel w={'15%'}>Top vip</FormLabel>
                    <ConfirmVipDialog job={data} onConfirm={handleApplyVip} />
                  </HStack>
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
                    <Select value={industry != null ? industry : data.industry} w={'35%'} placeholder='Chọn ngành nghề' onChange={(e) => setIndustry(e.target.value)}>
                      {industries.map((industry, index) => (
                        <option key={index} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </Select>
                    <FormLabel w={'15%'}>Ngành nghề phụ</FormLabel>
                    <Select value={industry2 != null ? industry2 : data.industry2} w={'35%'} placeholder='Chọn ngành nghề' onChange={(e) => setIndustry2(e.target.value)}>
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

          <VStack pl={30} pr={30} spacing={3}>
            <Box w={'100%'} mb={10}>
              <Card>
                <CardBody>
                  <FormControl>
                    <HStack alignItems='center' spacing={4}>
                      <Icon as={AiOutlineInfoCircle} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
                      <Text m={0} fontSize='2xl'>
                        Thông tin
                      </Text>
                    </HStack>
                    <HStack mt={3}>
                      <FormLabel w={'15%'}>Tên công việc</FormLabel>
                      <Input w={'35%'} type='text' value={name != null ? name : data.name} onChange={(e) => setName(e.target.value)} name='name' id='Name' />
                      <FormLabel w={'15%'}>Địa chỉ làm việc</FormLabel>
                      <Input w={'35%'} type='text' value={detailLocation != null ? detailLocation : data.detailLocation} onChange={(e) => setDetailLocation(e.target.value)} name='position' id='position' />
                    </HStack>

                    <HStack mt={3}>
                      <FormLabel w={'15%'}>Lương</FormLabel>
                      <Select w={'35%'} onChange={(e) => setSalary(e.target.value)} value={salary != null ? salary : data.salary}>
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
                      <Input w={'35%'} type='text' onChange={(e) => setWorkingForm(e.target.value)} name='workingForm' id='workingForm' value={workingForm != null ? workingForm : data.workingForm} />
                    </HStack>

                    <HStack mt={3}>
                      <FormLabel w={'15%'}>Địa chỉ</FormLabel>
                      <Select w={'35%'} value={location != null ? location : data.location} onChange={(e) => setLocation(e.target.value)}>
                        <option value='all'>Địa điểm</option>
                        {province.map((p) => (
                          <option key={p.id} value={p.name}>
                            {p.name}
                          </option>
                        ))}
                      </Select>
                      <FormLabel w={'15%'}>Ngôn ngữ</FormLabel>
                      <Input value={language != null ? language : data.language} w={'35%'} type='text' onChange={(e) => setLanguage(e.target.value)} name='language' id='language' />
                    </HStack>

                    <HStack mt={3}>
                      <FormLabel w={'15%'}>Giới tính</FormLabel>
                      <Select w={'35%'} onChange={(e) => setSex(e.target.value)} value={sex != null ? sex : data.sex}>
                        <option value='Nam'>Nam</option>
                        <option value='Nữ'>Nữ</option>
                        <option value='Không yêu cầu'>Không yêu cầu</option>
                      </Select>
                      <FormLabel w={'15%'}>Số lượng tuyển</FormLabel>
                      <Input value={number != null ? number : data.number} w={'35%'} onChange={(e) => setNumber(e.target.value)} type='text' name='number' id='number' />
                    </HStack>

                    <HStack mt={3}>
                      <FormLabel w={'15%'}>Chức vụ</FormLabel>
                      <Input w={'35%'} value={position != null ? position : data.position} onChange={(e) => setPosition(e.target.value)} type='text' name='detailLocation' id='detailLocation' />
                      <FormLabel w={'15%'}>Kinh nghiệm</FormLabel>
                      <Select w={'35%'} onChange={(e) => setExperience(e.target.value)} value={experience != null ? experience : data.experience}>
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

                    <FormLabel>Mô tả</FormLabel>
                    <Textarea height={200} value={detailJob != null ? detailJob : data.detailJob} onChange={(e) => setDetailJob(e.target.value)} type='text' name='detailJob' id='detailJob' />

                    <FormLabel>Yêu cầu</FormLabel>
                    <Textarea height={200} value={requirements != null ? requirements : data.requirements} onChange={(e) => setRequirements(e.target.value)} type='text' name='requirements' id='requirements' />

                    <FormLabel>Quyền lợi</FormLabel>
                    <Textarea height={200} value={interest != null ? interest : data.interest} onChange={(e) => setInterest(e.target.value)} type='text' name='interest' id='interest' />

                    <FormLabel>Hình ảnh</FormLabel>
                    <Image style={{ padding: '5px', width: '200px' }} src={`${data.image}`} />
                    <Input type='file' onChange={(e) => setTestImage(e.target.files[0])} name='avatar' id='avatar' />
                  </FormControl>
                </CardBody>
              </Card>
            </Box>
          </VStack>

          <HStack justifyContent={'space-between'} pl={30} pr={30} w={'100%'} mb={5}>
            <Button w={300} color={'white'} onClick={onOpen} bgColor={'#2cccc7'}>
              Lưu
            </Button>
          </HStack>
        </Box>
        <Box minHeight={2000} overflow='auto' fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'} p={30}>
          <ToastContainer />
        </Box>
      </>
    )
}
export default JobDetailRecruiter
