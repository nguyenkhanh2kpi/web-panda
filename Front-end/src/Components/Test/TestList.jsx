import React, { useEffect, useState } from 'react'
import { ArrowForwardIcon, CopyIcon, StarIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { Box, CardHeader, Heading, Container, FormControl, VStack, FormErrorMessage, FormLabel, SlideFade, Stack, Input, HStack, CardBody, Card, Text, Radio, RadioGroup, StackDivider, Button, GridItem, Grid, Image } from '@chakra-ui/react'
import { testService } from '../../Service/test.service'

export const TestList = () => {
  const [tests, setTest] = useState([])
  const navigate = useNavigate()
  // const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  let accessToken = ''
  try {
    accessToken = JSON.parse(localStorage.getItem('data')).access_token
  } catch (error) {
    navigate('/login')
  }

  useEffect(() => {
    testService
      .getMyTest(accessToken)
      .then((response) => setTest(response))
      .catch((er) => console.log(er))
  }, [])

  console.log(tests)

  return (
    <>
      <VStack bgColor={'#f0f4f5'} fontFamily={'Montserrat'}>
        <SlideFade offsetY={20}>
          <Heading size={'lg'} m={'6'} mt={24}></Heading>
        </SlideFade>

        <HStack h={1000} align={'flex-start'} w={'80vw'}>
          <Grid templateColumns='repeat(3, 1fr)' gap={6}>
            {tests.length > 0 ? (
              tests.map((test) => (
                <GridItem key={test.id}>
                  <TestItem test={test} />
                </GridItem>
              ))
            ) : (
              <Box w='100%' h={200} borderRadius='md' p={4}>
                <Text fontSize='xl' fontWeight='bold' textAlign='center'>
                  Hiện tại không có bài test nào
                </Text>
              </Box>
            )}
          </Grid>
        </HStack>
      </VStack>
    </>
  )
}

const TestItem = ({ test }) => {
  const navigate = useNavigate()
  return (
    <Box
      backgroundColor='#ffffff'
      maxW='sm'
      borderRadius='lg'
      overflow='hidden'
      fontFamily={'Montserrat'}
      _hover={{
        boxShadow: 'xl',
        transition: 'all 0.2s ease-in-out',
        transform: 'translate(2px, -5px)',
      }}>
      <Box p='6' borderWidth='1px' borderRadius='lg'>
        <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1}>
          {test.summary}
        </Box>

        <Box noOfLines={3} mt='2'>
          Thời gian thực hiện: {test.time} phút
        </Box>
        <Box noOfLines={3}>Công việc: {test.job}</Box>

        <Box display='flex' mt='4' alignItems='center'>
          <Button rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='outline' flex='1' onClick={() => navigate('/test-record/' + test.id)}>
            Làm bài
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
