import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, VStack, HStack, Button, Flex, Avatar, Heading, Text, IconButton } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

export default function SliderBanner() {
  const slides = [
    { id: 1, content: 'Chợ việc làm 2024', imageUrl: 'https://static.topcv.vn/img/2024-05-07_154050.png' },
    { id: 2, content: 'Chúng tôi đang tuyển', imageUrl: 'https://static.topcv.vn/img/banner_shinhan.png' },
    { id: 3, content: 'Slide 3 Content', imageUrl: 'https://static.topcv.vn/img/T1%201100x220.png' },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 3000)
    return () => clearInterval(slideInterval)
  }, [])

  return (
    <VStack fontFamily={'Montserrat'} mt={10} w={'80%'}>
      <Box borderRadius={10} overflow={'hidden'} position='relative' w='100%' bgColor={'white'}>
        {slides.map((slide, index) => (
          <Box key={slide.id} display={index === currentSlide ? 'block' : 'none'}>
            <Box h='300px' w='100%' bgImage={`url(${slide.imageUrl})`} bgSize='cover' bgPosition='center' textAlign='center' lineHeight='200px' fontSize='2xl' color='white'>
              {slide.content}
            </Box>
            {/* <HStack p={3} w={'100%'}>
              <Flex w={'100%'} spacing='4'>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                  <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                  <Box>
                    <Heading size='sm'>{slide.content}</Heading>
                    <Text>Creator, Chakra UI</Text>
                  </Box>
                </Flex>
                <IconButton variant='ghost' colorScheme='gray' aria-label='See menu' icon={<BsThreeDotsVertical />} />
              </Flex>
            </HStack> */}
          </Box>
        ))}
        <HStack position='absolute' top='50%' w='100%' justifyContent='space-between' px={4}>
          <Button borderRadius={'50%'} onClick={prevSlide}>
            <ChevronLeftIcon />
          </Button>
          <Button borderRadius={'50%'} onClick={nextSlide}>
            <ChevronRightIcon />
          </Button>
        </HStack>
      </Box>
    </VStack>
  )
}
