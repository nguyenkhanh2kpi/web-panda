import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './style3.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadJob } from '../../redux/Job-posting/Action'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, FormControl, FormLabel, HStack, Heading, Image, Input, Select, Text, VStack } from '@chakra-ui/react'
import { hostName } from '../../global'

const RoomAdd = () => {
  const userId = JSON.parse(localStorage.getItem('data')).data.userInfo.id
  const dispatch = useDispatch()
  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(loadJob())
  }, [])
  const data = useSelector((store) => store.job.data)
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [jobName, setJObName] = useState('')
  const [roomName, setRoomName] = useState('')
  const [roomSkill, setRoomSkill] = useState('')
  const [roomDescription, setRoomDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [linkmeet, setLinkmeet] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (jobName === '') {
      toast.warning('Job is required!', {
        position: 'top-center',
      })
    } else if (roomName === '') {
      toast.warning('room Name is required!', {
        position: 'top-center',
      })
    } else if (roomSkill === '') {
      toast.error('room Skill is required!', {
        position: 'top-center',
      })
    } else if (roomDescription === '') {
      toast.error('room Description is required!', {
        position: 'top-center',
      })
    } else if (startDate === '') {
      toast.error('start Date is required!', {
        position: 'top-center',
      })
    } else if (endDate === '') {
      toast.error('end Date is required!', {
        position: 'top-center',
      })
    } else if (startDate >= endDate) {
      toast.error('Start date should be before the end date', {
        position: 'top-center',
      })
    } else {
      try {
        let data = JSON.stringify({
          jobPostId: jobName,
          roomName: roomName,
          roomSkill: roomSkill,
          roomDescription: roomDescription,
          startDate: startDate,
          endDate: endDate,
          linkmeet: linkmeet,
        })

        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${hostName}/interview/create-interview`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          data: data,
        }

        axios
          .request(config)
          .then((response) => {
            console.log('haha')
          })
          .catch((error) => {
            console.log(error)
            toast.error('Upload Room Failed', {
              position: 'top-center',
            })
          })

        toast.success('Upload Room Successfuly', {
          position: 'top-center',
        })
        navigate('/')
      } catch (error) {}
    }
  }

  return (
    <Box minHeight={2000} overflow='auto' fontFamily='Montserrat' fontWeight={400} backgroundColor='#e9f3f5'>
      <Breadcrumb pt={30}>
        <BreadcrumbItem>
          <BreadcrumbLink href='/roomList'>Phòng họp</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Thêm phòng họp</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack ml={30} mr={30} spacing={3}>
        <Box overflow='auto' p={10} borderRadius={5} backgroundColor='#FFFFFF' w='100%' mb={10}>
          <HStack alignItems={'self-start'}>
            <Box w={'50%'}>
              <FormControl>
                <FormLabel htmlFor='name'>Công việc</FormLabel>
                <Select
                  w={450}
                  borderColor='#8292b4'
                  placeholder='Job Name'
                  backgroundColor='#ffffff'
                  mt='10px'
                  mb='10px'
                  onChange={(e) => {
                    setJObName(e.target.value)
                  }}>
                  {data
                    .filter((job) => job.status === true && job.user_id === userId)
                    .map((i) => {
                      return (
                        <option key={i.id} value={i.id}>
                          {i.name}
                        </option>
                      )
                    })}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor='position'>Meeting name</FormLabel>
                <Input w={450} type='text' onChange={(e) => setRoomName(e.target.value)} name='position' id='position' />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor='position'>Kĩ năng</FormLabel>
                <Input w={450} type='text' onChange={(e) => setRoomSkill(e.target.value)} name='position' id='position' />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor='position'>Mô tả</FormLabel>
                <Input w={450} type='text' onChange={(e) => setRoomDescription(e.target.value)} name='position' id='position' />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor='position'>Thời gian</FormLabel>
                <HStack w={'100%'}>
                  <Input onChange={(e) => setStartDate(e.target.value)} name='startDate' backgroundColor='#FFFFFF' placeholder='Room description' type='datetime-local' w={209} />
                  <Text> {'  '}to </Text>
                  <Input onChange={(e) => setEndDate(e.target.value)} name='endDate' backgroundColor='#FFFFFF' placeholder='Room description' type='datetime-local' w={209} />
                </HStack>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor='position'>Meet Link</FormLabel>
                <Input w={450} type='text' onChange={(e) => setLinkmeet(e.target.value)} name='position' id='position' />
              </FormControl>

              <Button w={200} mt={30} color='white' mb={10} backgroundColor='rgb(3, 201, 215)' type='submit' onClick={handleSubmit}>
                Thêm
              </Button>

              <ToastContainer />
            </Box>
            <Box w={'50%'} mt={100}>
              <Image borderRadius={20} h={'100%'} src='https://assets-global.website-files.com/6242f480c281185091f94d52/6262c3161abdd90a938e8a77_625837e19d80bd0780a0a18c_interveiw.jpeg' />
            </Box>
          </HStack>
        </Box>
      </VStack>
    </Box>
  )
}

export default RoomAdd
