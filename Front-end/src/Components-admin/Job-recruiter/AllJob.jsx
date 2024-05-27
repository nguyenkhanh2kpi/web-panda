import { Box, Flex, Text, Image, Button, VStack, Grid, GridItem, List, Breadcrumb, BreadcrumbItem, BreadcrumbLink, HStack, CardBody, Card, ListItem, ListIcon, Switch, Select, Icon } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { BsBag } from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'
import { BsFillStarFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadJob } from '../../redux/Job-posting/Action'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { hostName, webHost } from '../../global'
import { FcFlashOn } from 'react-icons/fc'
import { MdCheckCircle, MdSettings } from 'react-icons/md'
import { ArrowUpIcon, CheckIcon, DeleteIcon, Search2Icon, StarIcon, ViewIcon } from '@chakra-ui/icons'
// stateEnum.ts
// stateEnum.js
export const State = {
  CREATE: 'Tạo',
  ON: 'Mở nhận CV',
  PAUSE: 'Tạm dừng',
  END: 'Kết thúc',
}

const AllJob = () => {
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
    // getData(typeOfProduct).then((res) => setProductArr(res));
    dispatch(loadJob())
  }, [])

  const userId = JSON.parse(localStorage.getItem('data')).data.userInfo.id
  const jobData = useSelector((store) => store.job.data)
  const jobdatas = jobData.map((job) => {
    return job.status === true && job.user_id === userId ? (
      <Box w='100%' key={job.id} mb={5}>
        <Card border={job.isVip ? '2px solid gold' : '1px solid #e2e8f0'} boxShadow={job.isVip ? '0 0 10px rgba(255, 215, 0, 0.5)' : 'none'}>
          <CardBody>
            <HStack>
              <Text fontSize='20px'>{job.name}</Text>
            </HStack>

            <List spacing={3}>
              <ListItem>
                <ListIcon as={ViewIcon} color='green.500' />
                Trạng thái : {job.state}
              </ListItem>
              <ListItem>
                <ListIcon as={StarIcon} color='green.500' />
                TOP VIP : {job.isVip}
              </ListItem>
              <ListItem>
                <HStack>
                  <Button onClick={() => navigate(`/process/item/${job.id}/2`)} rightIcon={<Search2Icon />} colorScheme='blue' variant='outline'>
                    Xem CV ứng tuyển
                  </Button>
                  <Button onClick={() => navigate(`/allJob_Recruiter/jobDetail_Recruiter/${job.id}`)} rightIcon={<MdSettings />} colorScheme='gray' variant='outline'>
                    Chỉnh sửa
                  </Button>
                  <Button onClick={() => navigate(`/process/screening/${job.id}`)} rightIcon={<CheckIcon />} colorScheme='yellow' variant='outline'>
                    Bài test sàng lọc
                  </Button>
                  <Button rightIcon={<DeleteIcon />} colorScheme='red' variant='outline' data-value={job.id} onClick={submitHandler}>
                    Xóa
                  </Button>
                </HStack>
              </ListItem>
            </List>

            <ToastContainer />
          </CardBody>
        </Card>
      </Box>
    ) : (
      <div></div>
    )
  })

  return (
    <>
      <Box minHeight={2000} overflow='auto' fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'}>
        <HStack w={'97%'} justifyContent={'space-between'}>
          <Breadcrumb pt={30}>
            <BreadcrumbItem>
              <BreadcrumbLink href='/allJob_Recruiter'>Công việc của tôi</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Button ml={30} borderRadius={10} color='white' backgroundColor='rgb(3, 201, 215)'>
            <Link to={`/allJob_Recruiter/job-posting`}> + Đăng tuyển dụng</Link>
          </Button>
        </HStack>

        <Box w={'97%'} fontFamily={'Montserrat'} display='flex' justifyContent='space-between'>
          <List w={'100%'}>{jobdatas}</List>
        </Box>
      </Box>
    </>
  )
}

export default AllJob
