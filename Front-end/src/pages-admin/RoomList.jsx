import { Box, Flex, Text, Image, Button, HStack, VStack, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Card, CardBody, List, ListItem, ListIcon, Switch, Badge, AvatarGroup, Avatar, Select, Input, Icon, InputGroup, InputRightAddon } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { BsBag } from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'
import { BsFillStarFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { loadRoom } from '../redux/Room/Action'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { hostName } from '../global'
import { CheckIcon, DeleteIcon, Search2Icon, SearchIcon, StarIcon, ViewIcon } from '@chakra-ui/icons'
import { MdSettings } from 'react-icons/md'
const RoomList = () => {
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const submitHandler = async (e) => {
    e.preventDefault()
    const id = e.currentTarget.getAttribute('data-value')
    try {
      let data = ''
      let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${hostName}/job-posting/${id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        data: data,
      }

      axios
        .request(config)
        .then((response) => {})
        .catch((error) => {
          console.log(error)
          toast.error('Delete Failed', {
            position: 'top-center',
          })
        })

      toast.success('Delete Successfully', {
        position: 'top-center',
      })
      navigate('/allJob_Recruiter')
    } catch (error) {}
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadRoom())
  }, [])

  const format = (endDateString) => {
    const endDate = new Date(endDateString)

    if (isNaN(endDate)) {
      return 'Invalid date'
    }

    const formattedEndDate = endDate.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })

    return formattedEndDate
  }
  const roomList = useSelector((store) => store.room.data)

  const roomdatas = roomList.map((job) => {
    return (
      <Card mb={5}>
        <CardBody>
          <HStack>
            <Text fontSize='20px'>
              {job.roomName} - {job.jobName}
            </Text>
          </HStack>

          <List spacing={3}>
            <ListItem>
              <ListIcon as={ViewIcon} color='green.500' />
              Trạng thái: <Badge colorScheme='green'>{job.status}</Badge>
            </ListItem>
            <ListItem>
              <ListIcon as={StarIcon} color='green.500' />
              Mô tả: {job.roomDescription}
            </ListItem>
            <ListItem>
              <AvatarGroup size='md' max={2}>
                {job.listCandidate.map((can) => (
                  <Avatar name={can.name} src={can.avatar} />
                ))}
                {job.listInterviewer.map((intv) => (
                  <Avatar name={intv.fullName} src={intv.avatar} />
                ))}
              </AvatarGroup>
            </ListItem>
            <ListItem>
              <HStack>
                <Button onClick={() => navigate(`/addCandidate/${job.jobPostId}/${job.id}`)} rightIcon={<MdSettings />} colorScheme='gray' variant='outline'>
                  Chỉnh sửa
                </Button>
              </HStack>
            </ListItem>
          </List>

          <ToastContainer />
        </CardBody>
      </Card>
    )
  })

  return (
    <>
      <Box minHeight={2000} overflow='auto' fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'}>
        <HStack justifyContent={'space-between'} w={'100%'}>
          <Breadcrumb pt={30}>
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Phòng họp</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Button mr={30} color='white' backgroundColor='rgb(3, 201, 215)'>
            <Link to={`/roomAdd`}> + Thêm phòng họp</Link>
          </Button>
        </HStack>
        <VStack pl={30} pr={30} spacing={3}>
          <HStack w={'100%'}>
            <Select bgColor={'white'} w={'20%'} placeholder='Tất cả'>
              <option value='option1'>Mới tạo</option>
              <option value='option2'>Đang tiến hành</option>
              <option value='option3'>Kết thúc</option>
              <option value='option3'>Đã hủy</option>
            </Select>
            <Select bgColor={'white'} w={'20%'} placeholder='Công việc'>
              <option value='option1'>Mới tạo</option>
              <option value='option2'>Đang tiến hành</option>
              <option value='option3'>Kết thúc</option>
              <option value='option3'>Đã hủy</option>
            </Select>
            <Input bgColor={'white'} w={'20%'} type='date' />
            <InputGroup bgColor={'white'} w={'40%'}>
              <Input placeholder='tìm' />
              <InputRightAddon>
                <Icon as={SearchIcon} />
              </InputRightAddon>
            </InputGroup>
          </HStack>

          <Box minHeight={1000} overflow='auto' backgroundColor={'#e9f3f5'} w={'100%'}>
            {roomdatas}
          </Box>
        </VStack>
      </Box>
    </>
  )
}

export default RoomList
