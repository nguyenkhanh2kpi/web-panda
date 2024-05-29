import { Box, Container, Flex, Text, Image, Heading, Button, HStack, Icon, VStack } from '@chakra-ui/react'
import { ChevronRightIcon, StarIcon } from '@chakra-ui/icons'

import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import { companyService } from '../../Service/company.service'
import { AiOutlineAlert } from 'react-icons/ai'

const FeatureCompony = () => {
  const navigate = useNavigate()
  const [companies, setCompanies] = useState([])
  useEffect(() => {
    companyService
      .getAllCompany()
      .then((res) => setCompanies(res))
      .catch((er) => console.log(er.message))
  }, [])
  return (
    <VStack fontFamily={'Montserrat'} w={'100%'}>
      <Box borderRadius={10} overflow={'hidden'} position='relative' w={'100%'} bgColor={'white'}>
        <HStack alignItems='center' spacing={4} p={4}>
          <Icon as={AiOutlineAlert} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
          <Text fontWeight={'bold'} m={0} fontSize='2xl'>
            Công ty
          </Text>
        </HStack>

        <Box className='container justify-conten-center '>
          <Swiper
            freeMode={true}
            grabCursor={true}
            modules={[FreeMode]}
            className='mySwiper'
            slidesPerView={4}
            spaceBetween={30}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
            }}>
            {companies
              .map((company) => (
                <SwiperSlide key={company.id}>
                  <div>
                    <Box
                      _hover={{
                        boxShadow: 'xl',
                        transition: 'all 0.2s ease-in-out',
                        transform: 'translate(2px, -5px)',
                      }}
                      onClick={() => navigate(`/companies/${company.id}`)}
                      maxW='sm'
                      borderWidth='1px'
                      borderRadius={5}
                      mt={5}
                      overflow='hidden'
                      fontFamily={'Montserrat'}>
                      <Image h={146} w={310} src={company.avatar} fallbackSrc='https://static.tintuc.com.vn/images/ver3/2020/02/06/1580924892844-screenshot-135.png' />

                      <Box p='6'>
                        <Box mt={2} display='flex' alignItems='baseline'>
                          <Box color='gray.500' fontWeight='semibold' letterSpacing='wide' fontSize='xs' textTransform='uppercase'>
                            {company.website}
                          </Box>
                        </Box>

                        <Box mt={2} fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1}>
                          {company.name}
                        </Box>

                        <Box mt={2}>
                          {company.phone}
                          <Box as='span' color='gray.600' fontSize='sm'></Box>
                        </Box>
                      </Box>
                    </Box>
                  </div>
                </SwiperSlide>
              ))
              .slice(-10)}
          </Swiper>
          <Container textAlign='center' mt={3} mb={5}>
            <Button fontFamily={'Montserrat'} onClick={() => navigate('/companies')} border='1px solid teal' p={7} borderRadius={20} bg='white' color='teal' fontWeight='bold'>
              Xem tất cả
            </Button>
          </Container>
        </Box>
      </Box>
    </VStack>
  )
}

export default FeatureCompony
