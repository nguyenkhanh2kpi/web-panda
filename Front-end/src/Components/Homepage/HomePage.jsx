import { Box, Button, Container, Flex, HStack, Heading, Icon, Image, Input, Select, SlideFade, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import JobButton from './JobButton'
import 'swiper/css'
import 'swiper/css/navigation'
import JobInterest from './JobInterest'
import Navbar from '../Navbar/Navbar1'
import JobSlider from './JobSlider'
import FeatureCompony from './FeatureCompony'
import DiscoverJob from './DiscoverJob'
import JobOption from './JobOption'
import { useNavigate } from 'react-router-dom'
import { locationService } from '../../Service/location.service'
import NewJob from './NewJob'
import SliderBanner from './Banner'
import ListIndustry from './ListIndustry'
import ListCompany from './ListCompany'
import { Notification } from '../../Components-admin'
import { AiOutlineUser } from 'react-icons/ai'

const HomePage = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('userInfo'))
  
  const [search, setSearch] = useState({
    keyword: '',
    location: 'all',
    experience: 'all',
    salary: 'all',
  })

  const [province, setProvince] = useState([])

  const handleChangeSearch = (e) => {
    const { name, value } = e.target
    setSearch((search) => ({ ...search, [name]: value }))
  }

  // Đảm bảo dữ liệu trong localStorage tồn tại
  let storedData = localStorage.getItem('keyw')
  if (storedData === null) {
    storedData = JSON.stringify({ keyw: '' })
    localStorage.setItem('keyw', storedData)
  }
  const keyWords = JSON.parse(storedData).keyw

  const handleSearch = () => {
    if (search.keyword !== '') {
      // sessionStorage.setItem('keyw', search.keyword)
      localStorage.setItem('keyw', JSON.stringify({ keyw: search.keyword }))
      navigate(`/jobpage-search/${search.keyword}/${search.location}/${search.experience}/${search.salary}`)
    } else {
      navigate(`/jobpage-search/${search.location}/${search.experience}/${search.salary}`)
    }
  }

  useEffect(() => {
    locationService
      .getAllProvince()
      .then((response) => {
        setProvince(response)
      })
      .catch((er) => console.log(er))
  }, [])

  return (
    <VStack w={'100%'} bgColor={'#f0f4f5'} fontFamily={'Montserrat'} mt={'72px'}>
      <VStack pb={10} bgGradient='linear(to-b, #8ad4d4, #f0f4f5)' w={'100%'} overflow='hidden' align={'center'}>
        <Container mt={10} h={'80px'} maxW={'100%'}>
          <Heading color={'white'} fontFamily={'Montserrat'} textAlign={'center'} fontWeight={'700'} fontSize={'35px'} lineHeight={'50px'} mb={'3px'}>
            Tìm việc làm nhanh 24h, việc làm mới nhất.
          </Heading>
        </Container>
        <Container h={'70px'} maxW={'100%'}>
          <Flex boxShadow='base' p='6' rounded='md' bg='white' w={'80%'} h={'100%'} m={'auto'} borderRadius={'50px'} pl={'24px'} pr={'9px'} py={'9px'}>
            <Box w={'28px'} display={'flex'} alignItems={'center'}>
              <Image mr={'8px'} w={'20px'} h={'20px'} src='https://static.naukimg.com/s/7/103/i/search.9ec0e1ac.svg' />
            </Box>
            <Box w={'340px'} h={'100%'} pr={'12px'} py={'4px'} pl={'4px'}>
              <Input fontFamily={'Montserrat'} value={search.keyword} name='keyword' onChange={handleChangeSearch} border={'none'} color={'#8292b4'} placeholder='vị trí tuyển dụng' />
            </Box>
            <Box w={'223px'} h={'100%'} pr={'0px'} pt={'4px'} pl={'10px'} pb={'6px'}>
              <Select fontFamily={'Montserrat'} onChange={handleChangeSearch} name='location' color={'#8292b4'} border={'none'} defaultValue='all'>
                <option value='all'>Địa điểm</option>
                {province.map((p) => (
                  <option key={p.name} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </Select>
            </Box>
            <Box w={'223px'} h={'100%'} pr={'0px'} pt={'4px'} pl={'10px'} pb={'6px'}>
              <Select fontFamily={'Montserrat'} onChange={handleChangeSearch} name='experience' color={'#8292b4'} border={'none'} defaultValue='all'>
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
            </Box>
            <Box w={'223px'} h={'100%'} pr={'0px'} pt={'4px'} pl={'10px'} pb={'6px'}>
              <Select fontFamily={'Montserrat'} onChange={handleChangeSearch} name='salary' color={'#8292b4'} border={'none'} defaultValue='all'>
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
            </Box>
            <Button fontFamily={'Montserrat'} onClick={handleSearch} color={'white'} fontWeight={'600'} fontSize={'19px'} bgColor={'#457eff'} borderRadius={'50px'} h={'48px'} w={'120px'} px={'28px'} py={'11px'}>
              Tìm
            </Button>
          </Flex>
        </Container>
        <SliderBanner />
      </VStack>
      <VStack mb={100} minH={1000} align={'flex-start'} w={'80vw'}>
        <VStack bgColor={'white'} w={'100%'} borderWidth='1px' borderRadius='lg' boxShadow='md' align={'flex-start'}>
          <NewJob />
        </VStack>
        <VStack bgColor={'white'} w={'100%'} borderWidth='1px' borderRadius='lg' boxShadow='md' align={'flex-start'}>
          <FeatureCompony />
        </VStack>
        <VStack bgColor={'white'} w={'100%'} borderWidth='1px' borderRadius='lg' boxShadow='md' align={'flex-start'}>
          <ListIndustry />
        </VStack>
        <VStack bgColor={'white'} w={'100%'} borderWidth='1px' borderRadius='lg' boxShadow='md' align={'flex-start'}>
        </VStack>
      </VStack>
    </VStack>

    // <Box>
    //   <Container mb={'28px'} h={'80px'} maxW={'100%'}>
    //     <Heading fontFamily={'Montserrat'} textAlign={'center'} fontWeight={'700'} fontSize={'35px'} lineHeight={'50px'} mb={'3px'} mt={'104px'}>
    //       Tìm việc làm nhanh 24h, việc làm mới nhất.
    //     </Heading>
    //   </Container>
    //   {/* <Notification/> */}
    //   <Container h={'70px'} maxW={'100%'}>
    //     <Flex boxShadow='base' p='6' rounded='md' bg='white' w={'80%'} h={'100%'} m={'auto'} borderRadius={'50px'} pl={'24px'} pr={'9px'} py={'9px'}>
    //       <Box w={'28px'} display={'flex'} alignItems={'center'}>
    //         <Image mr={'8px'} w={'20px'} h={'20px'} src='https://static.naukimg.com/s/7/103/i/search.9ec0e1ac.svg' />
    //       </Box>
    //       <Box w={'340px'} h={'100%'} pr={'12px'} py={'4px'} pl={'4px'}>
    //         <Input fontFamily={'Montserrat'} value={search.keyword} name='keyword' onChange={handleChangeSearch} border={'none'} color={'#8292b4'} placeholder='vị trí tuyển dụng' />
    //       </Box>
    //       <Box w={'223px'} h={'100%'} pr={'0px'} pt={'4px'} pl={'10px'} pb={'6px'}>
    //         <Select fontFamily={'Montserrat'} onChange={handleChangeSearch} name='location' color={'#8292b4'} border={'none'} defaultValue='all'>
    //           <option value='all'>Địa điểm</option>
    //           {province.map((p) => (
    //             <option key={p.name} value={p.name}>
    //               {p.name}
    //             </option>
    //           ))}
    //         </Select>
    //       </Box>
    //       <Box w={'223px'} h={'100%'} pr={'0px'} pt={'4px'} pl={'10px'} pb={'6px'}>
    //         <Select fontFamily={'Montserrat'} onChange={handleChangeSearch} name='experience' color={'#8292b4'} border={'none'} defaultValue='all'>
    //           <option value='all'>Kinh nghiệm</option>
    //           <option value='chưa có'>chưa có</option>
    //           <option value='dưới 1 năm'>dưới 1 năm</option>
    //           <option value='1 năm'>1 năm</option>
    //           <option value='2 năm'>2 năm</option>
    //           <option value='3 năm'>3 năm</option>
    //           <option value='4 năm'>4 năm</option>
    //           <option value='5 năm'>5 năm</option>
    //           <option value='trên 5 năm'>trên 5 năm</option>
    //         </Select>
    //       </Box>
    //       <Box w={'223px'} h={'100%'} pr={'0px'} pt={'4px'} pl={'10px'} pb={'6px'}>
    //         <Select fontFamily={'Montserrat'} onChange={handleChangeSearch} name='salary' color={'#8292b4'} border={'none'} defaultValue='all'>
    //           <option value='all'>Mức lương</option>
    //           <option value='Dưới 10 triệu'>Dưới 10 triệu</option>
    //           <option value='10 -15 triệu'>10 -15 triệu</option>
    //           <option value='15 -20 triệu'>15 -20 triệu</option>
    //           <option value='20 -25 triệu'>20 -25 triệu</option>
    //           <option value='25 -30 triệu'>25 -30 triệu</option>
    //           <option value='30 -50 triệu'>30 -50 triệu</option>
    //           <option value='trên 50 triệu'>trên 50 triệu</option>
    //           <option value='thỏa thuận'>thỏa thuận</option>
    //         </Select>
    //       </Box>
    //       <Button fontFamily={'Montserrat'} onClick={handleSearch} color={'white'} fontWeight={'600'} fontSize={'19px'} bgColor={'#457eff'} borderRadius={'50px'} h={'48px'} w={'120px'} px={'28px'} py={'11px'}>
    //         Search
    //       </Button>
    //     </Flex>
    //   </Container>
    //   <SliderBanner />
    //   <NewJob />
    //   {/* <JobInterest /> */}
    //   <ListIndustry />
    //   {/* <JobButton /> */}
    //   <FeatureCompony />
    //   {/* <ListCompany /> */}
    //   {/* event */}
    //   {/* <JobSlider /> */}
    //   {/* <DiscoverJob />
    //   <JobOption /> */}
    // </Box>
  )
}

export default HomePage
