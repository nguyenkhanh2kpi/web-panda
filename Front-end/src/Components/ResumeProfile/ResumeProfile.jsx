import { Box, FormControl, FormLabel, HStack, Input, Select, Text, Textarea, VStack, Button, SlideFade, Heading, Icon, useToast } from '@chakra-ui/react'

import React, { useEffect, useState } from 'react'
import { resumeService } from '../../Service/resume.service'
import { ResumeWorkEx } from './ResumeWorkEx'
import { Stack } from 'react-bootstrap'
import { Grid } from 'swiper'
import { ResumeHelp } from './ResumeHelp'
import { ResumeProject } from './ResumeProject'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { AiOutlineUser } from 'react-icons/ai'
import { BiBrain, BiBriefcase, BiFolder } from 'react-icons/bi'
import { FaGraduationCap } from 'react-icons/fa'
import { locationService } from '../../Service/location.service'

export const ResumeProfile = () => {
  const toast = useToast()
  const [reload, setReload] = useState()
  const navigate = useNavigate()
  const [resume, setResume] = useState({
    id: null,
    fullName: '',
    applicationPosition: '',
    email: '',
    phone: '',
    gender: '',
    dateOB: '',
    city: '',
    address: '',
    linkedIn: '',
    github: '',
    aboutYourself: '',
    workingExperiences: [],
    mainSkill: '',
    skills: [],
    school: '',
    startEducationTime: '',
    endEducationTime: '',
    major: '',
    others: '',
    workingProjects: [],
  })

  // const [selectedProject, setSelectedProject] = useState({
  //   id: null,
  //   nameProject: '',
  //   startTime: '',
  //   endTime: '',
  //   client: '',
  //   description: '',
  //   members: '',
  //   position: '',
  //   responsibilities: '',
  //   technology: '',
  // })

  // const [selectedWorkEx, setSelectedWorkEx] = useState({
  //   id: null,
  //   companyName: '',
  //   startWorkingTime: '',
  //   endWorkingTime: '',
  //   position: '',
  //   jobDetail: '',
  //   technology: '',
  // })

  // const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  let access_token = ''

  try {
    const data = JSON.parse(localStorage.getItem('data'))
    if (data && data.access_token) {
      access_token = data.access_token
    } else {
      navigate('/login')
    }
  } catch (error) {
    navigate('/login')
  }

  useEffect(() => {
    if (access_token === '') {
      navigate('/login')
    } else {
      resumeService
        .getMyResume(access_token)
        .then((response) => setResume(response))
        .catch((er) => console.log(er.message))
    }
  }, [])

  const handleAddSkill = () => {}

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setResume((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSave = () => {
    resumeService
      .putResume(access_token, resume)
      .then((response) => {
        // setResume(response)
        toast({
          title: 'Cập nhật hồ sơ.',
          description: response.message,
          status: 'info',
          duration: 4000,
          isClosable: true,
        })
      })
      .catch((er) => console.log(er))
  }

  const [province, setProvince] = useState([])
  useEffect(() => {
    locationService
      .getAllProvince()
      .then((response) => {
        setProvince(response)
      })
      .catch((er) => console.log(er))
  }, [])

  return (
    <>
      <VStack bgColor={'#f0f4f5'} fontFamily={'Montserrat'}>
        <SlideFade offsetY={20}>
          <Heading size={'lg'} m={'6'} mt={24}></Heading>
        </SlideFade>
        <Button onClick={() => navigate('/cv-build')} backgroundColor={'#92e0cf'}>
          Preview
        </Button>
        <VStack pb={20} minH={1000} align={'flex-start'} w={'80vw'}>
          <VStack p={10} bgColor={'white'} w={'100%'} borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow='md' align={'flex-start'}>
            <HStack alignItems='center' spacing={4}>
              <Icon as={AiOutlineUser} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
              <Text m={0} fontSize='2xl'>
                Thông tin cá nhân
              </Text>
            </HStack>
            <VStack w={'100%'}>
              <HStack spacing={10} w={'100%'}>
                <FormControl w={'50%'} isRequired>
                  <FormLabel>Họ và tên</FormLabel>
                  <Input onChange={handleOnChange} name='fullName' value={resume.fullName} />
                </FormControl>
                <FormControl w={'50%'} isRequired>
                  <FormLabel>Vị trí hiện tại, vị trí ứng tuyển</FormLabel>
                  <Input onChange={handleOnChange} name='applicationPosition' value={resume.applicationPosition} />
                </FormControl>
              </HStack>
              <HStack spacing={10} w={'100%'}>
                <FormControl w={'50%'} isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input onChange={handleOnChange} name='email' value={resume.email} />
                </FormControl>
                <FormControl w={'50%'} isRequired>
                  <FormLabel>Số điện thoại</FormLabel>
                  <Input onChange={handleOnChange} name='phone' value={resume.phone} />
                </FormControl>
              </HStack>

              <HStack spacing={10} w={'100%'}>
                <FormControl w={'50%'} isRequired>
                  <FormLabel>Giới tính</FormLabel>
                  <Select onChange={handleOnChange} name='gender' value={resume.gender} placeholder='Giới tính'>
                    <option value='Male'>Nam</option>
                    <option value='Male'>Nữ</option>
                    <option value='Other'>Khác</option>
                  </Select>
                </FormControl>
                <FormControl w={'50%'} isRequired>
                  <FormLabel>Ngày sinh</FormLabel>
                  <Input onChange={handleOnChange} name='dateOB' type='date' placeholder='Full name' value={resume.dateOB} />
                </FormControl>
              </HStack>

              <HStack spacing={10} w={'100%'}>
                <FormControl w={'50%'} isRequired>
                  <FormLabel>Thành phố</FormLabel>
                  {/* <Select onChange={handleOnChange} name='city' value={resume.city} placeholder='Tỉnh/Thành phố'>
                    <option>TP. Hồ Chí Minh</option>
                    <option>Đà Nẵng</option>
                    <option>Hà Nội</option>
                  </Select> */}
                  <Select onChange={handleOnChange} name='city' value={resume.city} placeholder='Tỉnh/Thành phố'>
                    {province.map((p) => (
                      <option key={p.name} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl w={'50%'}>
                  <FormLabel>Địa chỉ</FormLabel>
                  <Input onChange={handleOnChange} name='address' value={resume.address} />
                </FormControl>
              </HStack>

              <HStack spacing={10} w={'100%'}>
                <FormControl w={'50%'}>
                  <FormLabel>Linkedin</FormLabel>
                  <Input onChange={handleOnChange} name='linkedIn' value={resume.linkedIn} />
                </FormControl>
                <FormControl w={'50%'}>
                  <FormLabel>Github</FormLabel>
                  <Input onChange={handleOnChange} name='github' placeholder='Dành cho ứng viên là lập trình viên' value={resume.github} />
                </FormControl>
              </HStack>

              <HStack spacing={10} w={'100%'}>
                <FormControl w={'100%'}>
                  <FormLabel>Giới thiệu bản thân</FormLabel>
                  <Textarea onChange={handleOnChange} name='aboutYourself' value={resume.aboutYourself} />
                </FormControl>
              </HStack>
            </VStack>
          </VStack>

          <VStack p={10} bgColor={'white'} w={'100%'} borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow='md' align={'flex-start'}>
            <HStack alignItems='center' spacing={4}>
              <Icon as={BiBriefcase} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
              <Text m={0} fontSize='2xl'>
                Kinh nghiệm làm việc
              </Text>
            </HStack>
            <ResumeWorkEx workExps={resume.workingExperiences} setResume={setResume} />
          </VStack>

          <VStack p={10} bgColor={'white'} w={'100%'} borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow='md' align={'flex-start'}>
            <HStack alignItems='center' spacing={4}>
              <Icon as={FaGraduationCap} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
              <Text m={0} fontSize='2xl'>
                Học vấn
              </Text>
            </HStack>
            <HStack spacing={10} w={'100%'}>
              <FormControl w={'50%'}>
                <FormLabel>Tên trường cơ sở đào tạo chính quy</FormLabel>
                <Input onChange={handleOnChange} name='school' value={resume.school} />
              </FormControl>
              <FormControl w={'50%'}>
                <FormLabel>Chuyên ngành</FormLabel>
                <Input onChange={handleOnChange} name='major' placeholder='' value={resume.major} />
              </FormControl>
            </HStack>
            <HStack spacing={10} w={'100%'}>
              <FormControl w={'50%'}>
                <FormLabel>Thời gian bắt đầu</FormLabel>
                <Input onChange={handleOnChange} name='startEducationTime' type='date' placeholder='' value={resume.startEdudatiomTime} />
              </FormControl>
              <FormControl w={'50%'}>
                <FormLabel>Thời gian kết thúc</FormLabel>
                <Input onChange={handleOnChange} name='endEducationTime' type='date' placeholder='' value={resume.endEducationTime} />
              </FormControl>
            </HStack>
            <HStack spacing={10} w={'100%'}>
              <FormControl w={'100%'}>
                <FormLabel>Giải thưởng - Hoạt động</FormLabel>
                <Textarea onChange={handleOnChange} name='others' placeholder='' value={resume.others} />
              </FormControl>
            </HStack>
          </VStack>

          <VStack p={10} bgColor={'white'} w={'100%'} borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow='md' align={'flex-start'}>
            <HStack alignItems='center' spacing={4}>
              <Icon as={BiBrain} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
              <Text m={0} fontSize='2xl'>
                Kĩ năng
              </Text>
            </HStack>
            <HStack spacing={10} w={'100%'}>
              <FormControl w={'100%'}>
                <FormLabel>Kĩ năng chính</FormLabel>
                <Input name='mainSkill' onChange={handleOnChange} placeholder='' value={resume.mainSkill} />
              </FormControl>
            </HStack>
            <HStack spacing={10} w={'100%'}>
              <FormControl w={'100%'}>
                <FormLabel>Kĩ năng khác</FormLabel>
                <VStack>
                  {resume.skills?.map((skill) => (
                    <HStack>
                      <Input value={skill} placeholder='' />
                      <Button>+</Button>
                      <Button>X</Button>
                    </HStack>
                  ))}
                </VStack>
              </FormControl>
            </HStack>
          </VStack>

          <VStack p={10} bgColor={'white'} w={'100%'} borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow='md' align={'flex-start'}>
            <HStack alignItems='center' spacing={4}>
              <Icon as={BiFolder} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
              <Text m={0} fontSize='2xl'>
                Dự án
              </Text>
            </HStack>
            <ResumeProject workProjects={resume.workingProjects} setResume={setResume} />
          </VStack>

          <HStack>
            <Button onClick={handleSave}>Lưu</Button>
          </HStack>
        </VStack>
      </VStack>

      {/* <Box fontFamily={'Montserrat'} mt={100} h={10000} display={'flex'} justifyContent={'center'}>
        <Box h={500} w={'60%'}>
          <HStack align='flex-start'>
            <Box borderRadius={20} p={5} mt={20} m={5} w={'100%'} boxShadow={'lg'} backgroundColor={'#f0f5f4'}>
              <VStack>
                <ToastContainer />
                <Box fontSize='3xl' fontWeight={'bold'} p={1} w={'100%'} display='flex' alignItems='baseline'>
                  {resume.fullName}
                </Box>

      

                <Box p={5} borderRadius={20} boxShadow={'lg'} w={'100%'} backgroundColor={'white'} alignItems='baseline'>
                  <VStack w={'100%'}>
                    <Text p={1} w={'100%'} fontSize='3xl'>
                      Personal Information
                    </Text>
                    <FormControl isRequired>
                      <FormLabel>Full name</FormLabel>
                      <Input onChange={handleOnChange} name='fullName' placeholder='Full name' value={resume.fullName} />

                      <FormLabel>Current position/Application position</FormLabel>
                      <Input onChange={handleOnChange} name='applicationPosition' placeholder='Ex: Fresher' value={resume.applicationPosition} />

                      <FormLabel>Email</FormLabel>
                      <Input onChange={handleOnChange} name='email' placeholder='email' value={resume.email} />

                      <FormLabel>Phone</FormLabel>
                      <Input onChange={handleOnChange} name='phone' placeholder='phone' value={resume.phone} />

                      <FormLabel>Gender</FormLabel>
                      <Select onChange={handleOnChange} name='gender' value={resume.gender} placeholder='Select gender'>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </Select>

                      <FormLabel>Date of Birth</FormLabel>
                      <Input onChange={handleOnChange} name='dateOB' type='date' placeholder='Full name' value={resume.dateOB} />

                      <FormLabel>City</FormLabel>
                      <Select onChange={handleOnChange} name='city' value={resume.city} placeholder='Select city'>
                        <option>TP. Hồ Chí Minh</option>
                        <option>Đà Nẵng</option>
                        <option>Hà Nội</option>
                      </Select>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Address</FormLabel>
                      <Input onChange={handleOnChange} name='address' placeholder='Enter your address' value={resume.address} />

                      <FormLabel>Linkedin</FormLabel>
                      <Input onChange={handleOnChange} name='linkedIn' placeholder='Enter your LinkedIn profile URL' value={resume.linkedIn} />

                      <FormLabel>Github</FormLabel>
                      <Input onChange={handleOnChange} name='github' placeholder='Enter your GitHub username' value={resume.github} />
                    </FormControl>
                  </VStack>
                </Box>

                <Box p={5} borderRadius={20} boxShadow={'lg'} w={'100%'} backgroundColor={'white'} alignItems='baseline'>
                  <Text fontSize='3xl'>About yourself</Text>
                  <FormControl isRequired>
                    <FormLabel>About yourself</FormLabel>
                    <Textarea onChange={handleOnChange} name='aboutYourself' placeholder='' value={resume.aboutYourself} />
                  </FormControl>
                </Box>

         
                <Box p={5} borderRadius={20} boxShadow={'lg'} w={'100%'} backgroundColor={'white'} alignItems='baseline'>
                  <HStack>
                    <Text w={'100%'} fontSize='3xl'>
                      Work experience
                    </Text>
                    <HStack>
                      <Button>Đã có kinh nghiệm</Button>
                      <Button>Chưa có kinh nghiệm</Button>
                    </HStack>
                  </HStack>
                  <ResumeWorkEx workExps={resume.workingExperiences} setResume={setResume} />
                </Box>

       

                <Box p={5} borderRadius={20} boxShadow={'lg'} w={'100%'} backgroundColor={'white'} alignItems='baseline'>
                  <Text w={'100%'} fontSize='3xl'>
                    Skills
                  </Text>
                  <FormControl isRequired>
                    <FormLabel>Main skill group</FormLabel>
                    <Input name='mainSkill' onChange={handleOnChange} placeholder='' value={resume.mainSkill} />
                    <FormLabel>List the skills in the group</FormLabel>
                    <VStack>
                      {resume.skills?.map((skill) => (
                        <HStack>
                          <Input value={skill} placeholder='' />
                          <Button>+</Button>
                          <Button>X</Button>
                        </HStack>
                      ))}
                    </VStack>
                  </FormControl>
                </Box>


                <Box p={5} borderRadius={20} boxShadow={'lg'} w={'100%'} backgroundColor={'white'} alignItems='baseline'>
                  <Text w={'100%'} fontSize='3xl'>
                    Education
                  </Text>
                  <VStack w={'100%'}>
                    <FormControl isRequired>
                      <FormLabel>Name of school of formal training facility</FormLabel>
                      <Input onChange={handleOnChange} name='school' placeholder='' value={resume.school} />
                      <FormLabel>Learning time </FormLabel>
                      <HStack>
                        <Text>From</Text>
                        <Input onChange={handleOnChange} name='startEducationTime' type='date' placeholder='' value={resume.startEdudatiomTime} />
                        <Text>To</Text>
                        <Input onChange={handleOnChange} name='endEducationTime' type='date' placeholder='' value={resume.endEducationTime} />
                        <Button>Now</Button>
                      </HStack>

                      <FormLabel>Majors</FormLabel>
                      <Input onChange={handleOnChange} name='major' placeholder='' value={resume.major} />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Other</FormLabel>
                      <Textarea onChange={handleOnChange} name='others' placeholder='' value={resume.others} />
                    </FormControl>
                  </VStack>
                </Box>

        
                <Box p={5} borderRadius={20} boxShadow={'lg'} w={'100%'} backgroundColor={'white'} alignItems='baseline'>
                  <HStack w={'100%'}>
                    <Text w={'100%'} fontSize='3xl'>
                      Projects
                    </Text>
                    <HStack>
                      <Button>No Projects</Button>
                    </HStack>
                  </HStack>
                  <ResumeProject workProjects={resume.workingProjects} setResume={setResume} />
                </Box>

            

                <HStack>
                  <Button onClick={handleSave}>Save</Button>
                  <Button onClick={() => navigate('/cv-build')} backgroundColor={'#92e0cf'}>
                    Preview
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </HStack>
        </Box>
      </Box> */}
    </>
  )
}
