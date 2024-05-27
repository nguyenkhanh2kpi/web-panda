import React, { useEffect, useState } from 'react'
import { IoIosMore } from 'react-icons/io'
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Divider, Grid, GridItem, HStack, Heading, IconButton, Image, SimpleGrid, Skeleton, Spinner, Stack, Text, VStack } from '@chakra-ui/react'
import { dropdownData } from '../../data/dummy'
import { useStateContext } from '../../contexts/ContextProvider'
import product9 from '../../data/product9.jpg'
import { eventService } from '../../Service/event.service'
import { ToastContainer, toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { DeleteIcon, EditIcon, SearchIcon } from '@chakra-ui/icons'
import { Header } from '../../Components-admin'

const DropDown = ({ currentMode }) => (
  <div className='w-28 border-1 border-color px-2 py-1 rounded-md'>
    <DropDownListComponent id='time' fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: currentMode === 'Dark' && 'white' }} value='1' dataSource={dropdownData} popupHeight='220px' popupWidth='120px' />
  </div>
)

export const K_Event = () => {
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token

  const [events, setEvents] = useState()
  const naigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await eventService.getMyEvent(accessToken)
        setEvents(response)
      } catch (error) {
        toast.error('something went wrong')
      }
    }
    fetchData()
  }, [events])

  const handleDelete = async (e) => {
    eventService
      .DeleteEvent(e, accessToken)
      .then((response) => toast.info(response.message))
      .catch((error) => toast.error('something went wrong'))
  }

  function formatDate(inputDate) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const date = new Date(inputDate)
    const year = date.getFullYear()
    const month = months[date.getMonth()]
    const day = date.getDate()
    return `${month} ${day}, ${year}`
  }

  if (events === undefined) {
    return (
      <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
        <Header category='App' title='Event' />
        <Stack>
          <Skeleton height='50px' />
          <Skeleton height='50px' />
          <Skeleton height='50px' />
        </Stack>
      </div>
    )
  } else if (events.length === 0) {
    return (
      <Box fontFamily={'Montserrat'} fontWeight={400} className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
        <Header category='App' title='Event' />
        <Button mb={10} height='50px' color='white' bgColor='#03C9D7' text='Xem chi tiết' borderRadius='10px'>
          <Link to='/event/add'>Add</Link>
        </Button>
        <Text>You don't have any event</Text>
      </Box>
    )
  } else
    return (
      <>
        <Box minHeight={2000} overflow='auto' fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'}>
          <HStack justifyContent={'space-between'} w={'100%'}>
            <Breadcrumb pt={30}>
              <BreadcrumbItem>
                <BreadcrumbLink href='#'>Events</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <Button mr={30} color='white' bgColor='#03C9D7' text='Xem chi tiết' borderRadius='10px'>
              <Link to='/event/add'>+ Add event</Link>
            </Button>
          </HStack>
          <VStack spacing={3} pl={30} pr={30}>
            <Box minHeight={1000} overflow='auto' w={'100%'} mb={10}>
              <SimpleGrid maxW='100%' w='100%' spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                {events
                  .filter((event) => event.status)
                  .map((event) => (
                    <Card maxW='sm'>
                      <CardBody>
                        <Image src={event.image} alt={event.title} borderRadius='lg' />
                        <Stack mt='6' spacing='3'>
                          <Heading size='md'>{event.title}</Heading>
                          <Text>{event.article}</Text>
                          <Text color='blue.600' fontSize='2xl'>
                            {formatDate(event.time)}
                          </Text>
                        </Stack>
                      </CardBody>
                      <Divider />
                      <CardFooter>
                        <ButtonGroup spacing='2'>
                          <Button onClick={() => naigate(`/event/edit/${event.id}`)} variant='solid' colorScheme='blue'>
                            Sửa
                          </Button>
                          <Button onClick={() => handleDelete(event.id)} variant='ghost' colorScheme='blue'>
                            Xóa
                          </Button>
                        </ButtonGroup>
                      </CardFooter>
                    </Card>
                  ))}
                {events
                  .filter((event) => event.status)
                  .map((event) => (
                    <Card maxW='sm'>
                      <CardBody>
                        <Image src={event.image} alt={event.title} borderRadius='lg' />
                        <Stack mt='6' spacing='3'>
                          <Heading size='md'>{event.title}</Heading>
                          <Text>{event.article}</Text>
                          <Text color='blue.600' fontSize='2xl'>
                            {formatDate(event.time)}
                          </Text>
                        </Stack>
                      </CardBody>
                      <Divider />
                      <CardFooter>
                        <ButtonGroup spacing='2'>
                          <Button onClick={() => naigate(`/event/edit/${event.id}`)} variant='solid' colorScheme='blue'>
                            Sửa
                          </Button>
                          <Button onClick={() => handleDelete(event.id)} variant='ghost' colorScheme='blue'>
                            Xóa
                          </Button>
                        </ButtonGroup>
                      </CardFooter>
                    </Card>
                  ))}
                {events
                  .filter((event) => event.status)
                  .map((event) => (
                    <Card maxW='sm'>
                      <CardBody>
                        <Image src={event.image} alt={event.title} borderRadius='lg' />
                        <Stack mt='6' spacing='3'>
                          <Heading size='md'>{event.title}</Heading>
                          <Text>{event.article}</Text>
                          <Text color='blue.600' fontSize='2xl'>
                            {formatDate(event.time)}
                          </Text>
                        </Stack>
                      </CardBody>
                      <Divider />
                      <CardFooter>
                        <ButtonGroup spacing='2'>
                          <Button onClick={() => naigate(`/event/edit/${event.id}`)} variant='solid' colorScheme='blue'>
                            Sửa
                          </Button>
                          <Button onClick={() => handleDelete(event.id)} variant='ghost' colorScheme='blue'>
                            Xóa
                          </Button>
                        </ButtonGroup>
                      </CardFooter>
                    </Card>
                  ))}
                {events
                  .filter((event) => event.status)
                  .map((event) => (
                    <Card maxW='sm'>
                      <CardBody>
                        <Image src={event.image} alt={event.title} borderRadius='lg' />
                        <Stack mt='6' spacing='3'>
                          <Heading size='md'>{event.title}</Heading>
                          <Text>{event.article}</Text>
                          <Text color='blue.600' fontSize='2xl'>
                            {formatDate(event.time)}
                          </Text>
                        </Stack>
                      </CardBody>
                      <Divider />
                      <CardFooter>
                        <ButtonGroup spacing='2'>
                          <Button onClick={() => naigate(`/event/edit/${event.id}`)} variant='solid' colorScheme='blue'>
                            Sửa
                          </Button>
                          <Button onClick={() => handleDelete(event.id)} variant='ghost' colorScheme='blue'>
                            Xóa
                          </Button>
                        </ButtonGroup>
                      </CardFooter>
                    </Card>
                  ))}
              </SimpleGrid>

              {/* <Grid p={5} w={'100%'} templateColumns='repeat(3, 1fr)' gap={3}>
                {events
                  .filter((event) => event.status)
                  .map((event) => (
                    <GridItem w={'100%'}>
                      <Box backgroundColor='#ffffff' borderRadius={20} p={5} boxShadow='lg' key={event.id}>
                        <Box d='flex' justifyContent='space-between'>
                          <Text fontSize='xl' fontWeight='semibold'>
                            {event.title}
                          </Text>
                          <IconButton color='#03C9D7' backgroundColor='#f7f7f7' aria-label='Edit' icon={<EditIcon />} />
                        </Box>
                        <Box mt={10}>
                          <Image w='md' h='50' src={event.image} alt={event.title} />
                          <Box mt={8}>
                            <Text fontWeight='semibold' fontSize='lg'>
                              {event.author}
                            </Text>
                            <Text color='gray.400'>{formatDate(event.time)}</Text>
                            <Text mt={8} fontSize='sm' color='gray.400'>
                              {event.article}
                            </Text>
                            <Box mt={3}>
                              <IconButton color='#e85f76' backgroundColor='#f7f7f7' aria-label='Delete' icon={<DeleteIcon />}  />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </GridItem>
                  ))}
              </Grid> */}
            </Box>
          </VStack>
        </Box>
        <ToastContainer />
      </>
    )
}
