import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, VStack, HStack, Button } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'

export default function SliderBanner() {
  const slides = [
    { id: 1, content: 'Chợ việc làm 2024', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/quanlytuyendung-4fb2c.appspot.com/o/1716569674288_banne3.jpg?alt=media' },
    { id: 2, content: 'Chúng tôi đang tuyển', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/quanlytuyendung-4fb2c.appspot.com/o/1716569694628_bann2.jpg?alt=media' },
    { id: 3, content: 'Slide 3 Content', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/quanlytuyendung-4fb2c.appspot.com/o/1716569718088_banner1.jpg?alt=media' },
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
    <VStack fontFamily={'Montserrat'} mt={10} w={'80hv'}>
      <Box borderRadius={10} overflow={'hidden'} position='relative' w='80%' bgColor={'white'}>
        {slides.map((slide, index) => (
          <Box key={slide.id} display={index === currentSlide ? 'block' : 'none'} h='200px' w='100%' bgImage={`url(${slide.imageUrl})`} bgSize='cover' bgPosition='center' textAlign='center' lineHeight='200px' fontSize='2xl' color='white'>
            {slide.content}
          </Box>
        ))}
        <HStack position='absolute' top='50%' w='100%' justifyContent='space-between' px={4}>
          <Button onClick={prevSlide}><ChevronLeftIcon/></Button>
          <Button onClick={nextSlide}><ChevronRightIcon/></Button>
        </HStack>
      </Box>
    </VStack>
  )
}
