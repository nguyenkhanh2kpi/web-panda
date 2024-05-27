import React, { useEffect, useState } from 'react'
import { interviewService } from '../../Service/interview.service'
import { useParams } from 'react-router-dom'
import {
  Heading,
  HStack,
  SlideFade,
  VStack,
  Image,
  Text,
  Button,
  Wrap,
  WrapItem,
  Avatar,
  FormLabel,
  Input,
  Select,
  Box,
  SimpleGrid,
  Link,
  Spacer,
  Skeleton,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Card,
  CardBody,
  Icon,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  Flex,
  MenuButton,
  Badge,
} from '@chakra-ui/react'
import { MarkItem } from './MarkItem'
import { interviewDetailService } from '../../Service/interviewDetail.service'
import { AiOutlineEdit, AiOutlineUsergroupAdd } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'

export const MarkCandidate = () => {
  const [room, setRoom] = useState()
  const params = useParams()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [selected, setIdSelected] = useState(0)
  const [interviewDetail, setInterviewDetail] = useState(null)
  const [clickBox, setClockBox] = useState(false)

  useEffect(() => {
    interviewService.getInterviewByID(accessToken, params.roomId).then((res) => setRoom(res))
  }, [])

  const truncatedEmail = (email) => {
    if (email.length > 20) {
      return `${email.substring(0, 20)}...`
    }
    return email
  }

  useEffect(() => {
    if (selected === 0) {
      setInterviewDetail(null)
      setClockBox(false)
    } else {
      interviewDetailService.getInterviewDetailById(accessToken, selected).then((response) => {
        setInterviewDetail(response)
        setClockBox(false)
      })
    }
  }, [selected])

  if (room === undefined) {
    return (
      <Box backgroundColor={'#e9f3f5'} p={30} overflow='hidden'>
        <VStack spacing={10}>
          <Skeleton w={'70%'}>
            <div>contents wrapped</div>
            <div>won't be visible</div>
          </Skeleton>
          <Skeleton h={300} w={'70%'}>
            <div>contents wrapped</div>
            <div>won't be visible</div>
          </Skeleton>
          <Skeleton w={'70%'}>
            <div>contents wrapped</div>
            <div>won't be visible</div>
          </Skeleton>
          <Skeleton h={300} w={'70%'}>
            <div>contents wrapped</div>
            <div>won't be visible</div>
          </Skeleton>
          <Skeleton w={'70%'}>
            <div>contents wrapped</div>
            <div>won't be visible</div>
          </Skeleton>
        </VStack>
      </Box>
    )
  } else
    return (
      <>
        <Box overflow='auto' fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'}>
          <Breadcrumb pt={30}>
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Phòng phỏng vấn</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Chi tiết</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <VStack spacing={3} ml={30} mr={30}>
            <HStack w={'100%'} mb={3} alignItems='center' spacing={4}>
              <Icon as={AiOutlineUsergroupAdd} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
              <Text m={0} fontSize='2xl'>
                Danh sách ứng viên
              </Text>
            </HStack>

            <SimpleGrid w={'100%'} columns={{ base: 1, sm: 2, md: 3 }} spacing='10px'>
              {room.listCandidate.map((candidate) => (
                <Card mb={1} key={candidate.itemId} p={1}>
                  <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                      <Avatar name={candidate.name} src={candidate.avatar} />
                      <Box>
                        <Heading size='sm' isTruncated maxW='275px'>
                          {candidate.name} <Badge colorScheme={candidate.status === 'Đã chấm' ? 'green' : 'purple'}> {candidate.status}</Badge>
                        </Heading>
                        <Text isTruncated maxW='230px'>
                          {candidate.email}
                        </Text>
                      </Box>
                    </Flex>
                    <Menu>
                      <MenuButton as={IconButton} variant='ghost' colorScheme='gray' aria-label='See menu' icon={<BsThreeDotsVertical />} />
                      <MenuList>
                        <MenuItem
                          onClick={() => {
                            setIdSelected(candidate.itemId)
                            setClockBox(true)
                          }}>
                          Phỏng vấn
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Flex>
                </Card>
              ))}
            </SimpleGrid>

            <HStack w={'100%'} mb={3} alignItems='center' spacing={4}>
              <Icon as={AiOutlineEdit} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
              <Text m={0} fontSize='2xl'>
                Bản ghi phỏng vấn
              </Text>
            </HStack>

            <MarkItem isClick={clickBox} roomId={selected} loadDetail={interviewDetail} />
          </VStack>
        </Box>

        <Box fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'} p={30} overflow='hidden'>
          <VStack spacing={3}>
            <Box p={4} borderRadius='lg' backgroundColor={'#FFFFFF'} w={'100%'} h={'230px'} mb={0}>
              <HStack h={'100%'}>
                <Image borderRadius='lg' m={2} h={'100%'} w={'18%'} src='https://www.peninsulapersonnel.com.au/wp-content/uploads/2020/09/Best-HR-Interview-1.png' alt='Dan Abramov' />
                <VStack h={'100%'} w={'82%'} p={2}>
                  <HStack backgroundColor={'#FFFFFF'} w={'100%'} p={2} justifyContent={'space-between'} mb={0}>
                    <Text fontSize={27} fontWeight={'bold'}>
                      {room.roomName}
                    </Text>
                    <Button size='xs' colorScheme='green' variant='outline'>
                      {room.status}
                    </Button>
                    <HStack></HStack>
                  </HStack>
                  <Text p={2} w={'100%'}>
                    {room.roomDescription}
                  </Text>
                  <HStack spacing={5} w={'100%'} p={2} justifyContent={'flex-start'} mt={0}>
                    <Button size='sm' colorScheme='blue' variant='outline'>
                      {room.startDate}
                    </Button>
                    <Button size='sm' colorScheme='blue' variant='outline'>
                      {room.listCandidate && Array.isArray(room.listCandidate) ? room.listCandidate.length : 0} Ứng viên
                    </Button>
                    {/* <Wrap ml={20}>
                      {room.listCandidate.map((candidate) => (
                        <WrapItem key={candidate.itemId} position='relative'>
                          <Avatar name={candidate.name} src={candidate.avatar} />
                        </WrapItem>
                      ))}
                      {room.listInterviewer.map((interviewer) => (
                        <WrapItem key={interviewer.id} position='relative'>
                          <Avatar name={interviewer.fullName} src={interviewer.avatar} />
                        </WrapItem>
                      ))}
                    </Wrap> */}
                  </HStack>
                </VStack>
              </HStack>
            </Box>

            <Text fontWeight={'black'} ml={4} p={2} w={'100%'}>
              Danh sách ứng viên
            </Text>

            <Box overflow={'auto'} mt={0} p={6} borderRadius='lg' w={'100%'} backgroundColor={'#FFFFFF'} h={80}>
              <SimpleGrid columns={[2, null, 3]} spacing='10px'>
                {room.listCandidate.map((cadidate) => (
                  <Box
                    key={cadidate.itemId}
                    onClick={() => {
                      setIdSelected(cadidate.itemId)
                      setClockBox(true)
                    }}
                    w={'100%'}
                    maxW='sm'
                    borderWidth='3px'
                    borderRadius='lg'
                    overflow='hidden'
                    m={2}
                    backgroundColor={'#faffff'}
                    transition='transform 0.3s ease-in-out'
                    _hover={{ transform: 'scale(1.05)' }}>
                    <WrapItem w={'90%'} m={2} alignItems='center' justifyContent={'space-between'}>
                      <Avatar name={cadidate.name} src={cadidate.avatar} />
                      <VStack>
                        <Text m={2}>{truncatedEmail(cadidate.email)}</Text>
                        <Text m={2}>{cadidate.name}</Text>
                      </VStack>

                      <VStack justifyContent='flex-start'>
                        <Button p={1} h={'100%'} colorScheme={cadidate.status === 'Đã chấm' ? 'green' : 'red'} size='xs'>
                          {cadidate.status}
                        </Button>
                      </VStack>
                    </WrapItem>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>

            <Text fontWeight={'black'} ml={4} p={2} w={'100%'}>
              Chi tiết
            </Text>

            <MarkItem isClick={clickBox} roomId={selected} loadDetail={interviewDetail} />
          </VStack>
        </Box>
      </>
    )
}
