import React, { useState } from 'react'
// import { GoPrimitiveDot } from "react-icons/go";
import { MdOutlineSupervisorAccount } from 'react-icons/md'
import { IoIosMore } from 'react-icons/io'
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Stacked, Pie, LineChart, SparkLine } from '../Components-admin'
import { loadRoom } from '../redux/Room/Action'
import { loadInterviewer } from '../redux/Interviewer/Action'
import { Link } from 'react-router-dom'
import { Box, Button, Card, CardBody, HStack, Text, VStack } from '@chakra-ui/react'
import { earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../data/dummy'
import { useStateContext } from '../contexts/ContextProvider'
import product9 from '../data/product9.jpg'
import { loadJob } from '../redux/Job-posting/Action'
import { cvService } from '../Service/cv.service'

const Ecommerce = () => {
  const { currentColor, currentMode } = useStateContext()
  const [cvChartData, setCvChartData] = useState([])
  const [jobChartData, setJobChartData] = useState([])
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token

  useEffect(() => {
    dispatch(loadJob())
  }, [])
  const jobList = useSelector((store) => store.job.data)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadRoom())
    dispatch(loadInterviewer())
  }, [])
  const roomList = useSelector((store) => store.room.data)
  const interviewerList = useSelector((store) => store.interviewer.data)

  const datda = [
    { x: 1, yval: 2 },
    { x: 2, yval: 6 },
    { x: 3, yval: 8 },
    { x: 4, yval: 5 },
    { x: 5, yval: 10 },
  ]

  useEffect(() => {
    cvService.getAllCVs(accessToken).then((res) => {
      const cvCountPermonth = Array(12).fill(0)
      res.data.forEach((cv) => {
        const applyDate = new Date(cv.dateApply)
        const monthIndex = applyDate.getMonth()
        cvCountPermonth[monthIndex]++
      })
      const cvCountsData = cvCountPermonth.map((count, index) => ({
        x: new Date(2023, index, 1).toLocaleString('default', { month: 'short' }),
        y: count,
      }))
      setCvChartData(cvCountsData)
    })

    const m = [
      { x: 'Jan', y: 0 },
      { x: 'Feb', y: 0 },
      { x: 'Mar', y: 0 },
      { x: 'Apr', y: 0 },
      { x: 'May', y: 0 },
      { x: 'Jun', y: 0 },
      { x: 'Jul', y: 0 },
      { x: 'Aug', y: 0 },
      { x: 'Sep', y: 0 },
      { x: 'Oct', y: 0 },
      { x: 'Nov', y: 0 },
      { x: 'Dec', y: 0 },
    ]
    jobList.forEach((item) => {
      const month = new Date(item.createDate).getMonth()
      m[month].y += 1
    })
    setJobChartData(m)
  }, [])

  return (
    <>
      <Box minHeight={2000} overflow='auto' fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'}>
        <VStack spacing={3}>
          <Box minHeight={1000} overflow='auto' p={'3%'} borderRadius={20} backgroundColor={'#e9f3f5'} w={'100%'} mb={10}>
            <HStack justifyContent={'space-between'} w={'100%'}>
              <Box w={360} height={250}>
                <Card w={'100%'} height={'100%'}>
                  <CardBody>
                    <Text>{roomList.length} Phòng</Text>
                    <Text>Số lượng phòng</Text>
                    <Button height='50px' color='white' bgColor={currentColor} text='Xem chi tiết' borderRadius='10px'>
                      <Link to='/roomList'>Xem chi tiết</Link>
                    </Button>
                  </CardBody>
                </Card>
              </Box>
              <Box w={360} height={250}>
                <Card w={'100%'} height={'100%'}>
                  <CardBody>
                    <button type='button' style={{ color: '#03C9D7', backgroundColor: '#E5FAFB' }} className='text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl'>
                      <MdOutlineSupervisorAccount />
                    </button>
                    <p className='mt-3'>
                      <span className='text-lg font-semibold'>{interviewerList.length} người </span>
                    </p>
                    <p className='text-sm text-gray-400  mt-1'>Người phỏng vấn</p>
                  </CardBody>
                </Card>
              </Box>
              <Box w={360} height={250}>
                <Card w={'100%'} height={'100%'}>
                  <CardBody>
                    <button type='button' style={{ color: 'rgb(255, 244, 229)', backgroundColor: 'rgb(254, 201, 15)' }} className='text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl'>
                      <MdOutlineSupervisorAccount />
                    </button>
                    <p className='mt-3'>
                      <span className='text-lg font-semibold'>{interviewerList.length} người </span>
                    </p>
                    <p className='text-sm text-gray-400  mt-1'>Ứng viên</p>
                  </CardBody>
                </Card>
              </Box>
            </HStack>
            <Box mt={10} w={'100%'}>
              <Card w={'100%'} height={'100%'}>
                <CardBody>
                  <HStack justifyContent={'space-between'} spacing={10}>
                    <Box w={'50%'}>
                      <Text>Ứng tuyển việc làm</Text>
                      <Box>
                        <Text>{cvChartData.reduce((acc, cv) => acc + cv.y, 0)}</Text>
                        <Text>Lượt ứng tuyển</Text>
                      </Box>
                      <Box>
                        <Text>{jobList.length}</Text>
                        <Text>Bài đăng</Text>
                      </Box>
                      <SparkLine currentColor={currentColor} id='line-sparkLine' type='Line' height='80px' width='250px' data={datda} color={currentColor} />
                    </Box>
                    <Box w={'50%'}>
                      <Text>Ứng viên</Text>
                      <Text>Bài đăng</Text>
                      <Stacked currentMode={currentMode} width='320px' height='360px' cvData={cvChartData} jobData={jobChartData} />
                    </Box>
                  </HStack>
                </CardBody>
              </Card>
            </Box>
          </Box>
        </VStack>
      </Box>
    </>
  )
}

export default Ecommerce
