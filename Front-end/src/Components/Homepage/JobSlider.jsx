import { Box, Container, Flex, Text, Image, Heading, Button } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'bootstrap/dist/css/bootstrap.min.css'
import { eventService } from '../../Service/event.service'
import { useNavigate } from 'react-router-dom'
const JobSlider = () => {
  const [events, setEvents] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    eventService
      .getEvent()
      .then((res) => setEvents(res))
      .catch((er) => console.log(er.message))
  }, [])

  return (
    <div>
      <Heading fontFamily={'Montserrat'} mt={10} mb={10} textAlign='center'>
        New Event
      </Heading>
      <Box className='container py-4 px-4 justify-conten-center '>
        <Swiper
          freeMode={true}
          grabCursor={true}
          modules={[FreeMode]}
          className='mySwiper'
          slidesPerView={5}
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
          {events.filter((event) => event.status === true)
            .map((event) => (
              <SwiperSlide>
                <div>
                  <Box
                    _hover={{
                      boxShadow: 'xl',
                      transition: 'all 0.2s ease-in-out',
                      transform: 'translate(2px, -5px)',
                    }}
                    fontFamily={'Montserrat'}
                    onClick={() => navigate(`/event/${event.id}`)}
                    maxW='sm'
                    borderRadius='lg'
                    mt={3}
                    overflow='hidden'>
                    <Image src={event.image} />
                    <Box p='6'>
                      <Box display='flex' alignItems='baseline'>
                        <Box color='gray.500' fontWeight='semibold' letterSpacing='wide' fontSize='xs' textTransform='uppercase'>
                          {event.title}
                        </Box>
                      </Box>

                      <Box>
                        {}
                        <Box as='span' color='gray.600' fontSize='sm'>
                          by : {event.author}
                        </Box>
                      </Box>

                      <Box display='flex' mt='2' alignItems='center'>
                        <Box as='span' color='gray.600' fontSize='sm'>
                          {event.time}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </div>
              </SwiperSlide>
            ))
            .slice(-10)}
        </Swiper>
      </Box>
    </div>
  )
}

export default JobSlider
