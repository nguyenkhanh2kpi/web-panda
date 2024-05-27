import { Badge, Box, Button, Center, HStack, Heading, IconButton, Image, SlideFade, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { eventService } from '../../Service/event.service'
import { ArrowForwardIcon, CopyIcon } from '@chakra-ui/icons'

export const EventDetailHome = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState({
    id: 0,
    title: '',
    article: '',
    time: '',
    status: true,
    image: '',
    content: '',
  })

  useEffect(() => {
    eventService.getEventById(params.id).then((res) => {
      setEvent(res)
    })
  }, [])

  return (
    <VStack fontFamily={'Montserrat'} m={2} p={2}>
      <SlideFade in={true} offsetY={20}>
        <Heading size={'lg'} m={'6'} mt={24} ml={2} textAlign={'left'} marginRight='auto'></Heading>
      </SlideFade>
      <HStack align={'flex-start'} w={'70vw'} alignItems={'center'} display={'flex'} justifyContent={'center'}>
        <Box maxW='960px' borderWidth='1px' borderRadius='lg' overflow='hidden' w={'100%'}>
          <Image src={event.image} alt='Image' />

          <Box p='6'>
            <Box display='flex' mt={2} alignItems='baseline'>
              <Badge borderRadius='full' px='2' colorScheme='teal'>
                Author
              </Badge>
              <Box color='gray.500' fontWeight='semibold' letterSpacing='wide' fontSize='xs' textTransform='uppercase' ml='2'>
                {event.author}
              </Box>
            </Box>
            <Box display='flex' mt={2} alignItems='baseline'>
              <Badge borderRadius='full' px='2' colorScheme='teal'>
                Time
              </Badge>
              <Box color='gray.500' fontWeight='semibold' letterSpacing='wide' fontSize='xs' textTransform='uppercase' ml='2'>
                {event.time}
              </Box>
            </Box>

            <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1}>
              {event.title}
            </Box>

            <Box>{event.article}</Box>
          </Box>
        </Box>
      </HStack>
      <HStack align={'flex-start'} w={'70vw'} alignItems={'center'} display={'flex'} justifyContent={'center'}>
        <Box maxW='960px' borderWidth='1px' borderRadius='lg' overflow='hidden' w={'100vw'}>
          <Box m={5}>{event.content}</Box>
        </Box>
      </HStack>
    </VStack>
  )
}
