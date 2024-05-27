import { Avatar, AvatarGroup, Badge, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardBody, CardFooter, Grid, GridItem, HStack, Heading, Icon, Image, Link, List, ListIcon, ListItem, SimpleGrid, Skeleton, Stack, Tag, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { MdCheckCircle } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { interviewService } from '../../Service/interview.service'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'

function formatDateTime(isoString) {
  const date = new Date(isoString)
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  return date.toLocaleString('vi-VN', options)
}

export default function InterviewerListRoom() {
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [listRooms, setListRoom] = useState()

  useEffect(() => {
    interviewService
      .getAllRooms(accessToken)
      .then((res) => setListRoom(res))
      .catch((error) => console.log(error))
  }, [])

  const countCandidates = listRooms
    ? listRooms.reduce((acc, interview) => {
        return acc + interview.listCandidate.length
      }, 0)
    : 0
  const countInterviewedCandidates = listRooms
    ? listRooms.reduce((acc, interview) => {
        const interviewedCandidates = interview.listCandidate.filter((candidate) => candidate.status === 'Đã chấm').length
        return acc + interviewedCandidates
      }, 0)
    : 0
  const candidates = listRooms ? listRooms.flatMap((interview) => interview.listCandidate) : 0

  if (listRooms === undefined) {
    return (
      <>
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
      </>
    )
  }
  if (listRooms.length === 0) {
    return (
      <>
        <Box backgroundColor={'#e9f3f5'} p={30} overflow='hidden'>
          <VStack spacing={10}>
            <Text>No interview room</Text>
          </VStack>
        </Box>
      </>
    )
  } else
    return (
      <>
        <Box minH={'1000px'} overflow='auto' fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'}>
          <Breadcrumb pt={30}>
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Phòng phỏng vấn</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <VStack spacing={3} ml={30} mr={30}>
            <Grid w='100%' templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={6}>
              <Card>
                <CardBody>
                  <Text fontWeight='bold'>{listRooms.length} buổi phỏng vấn</Text>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <Text fontWeight='bold'>{countCandidates} ứng viên</Text>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <Text fontWeight='bold'>{countInterviewedCandidates} Đã phỏng vấn</Text>
                  <Text fontWeight='bold'>{countCandidates - countInterviewedCandidates} Chưa phỏng vấn</Text>
                  <AvatarGroup size='md' max={5}>
                    {candidates.map((candidate) => (
                      <Avatar key={candidate.candidateId} name={candidate.name} src={candidate.avatar} />
                    ))}
                  </AvatarGroup>
                </CardBody>
              </Card>
            </Grid>

            <HStack w={'100%'} mb={3} alignItems='center' spacing={4}>
              <Icon as={AiOutlineUsergroupAdd} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
              <Text m={0} fontSize='2xl'>
                Các buổi phỏng vấn
              </Text>
            </HStack>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
              {listRooms.map((room) => (
                <Card key={room.id} direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
                  <Stack>
                    <CardBody>
                      <Heading size='md'>Tên phòng :{room.roomName}</Heading>
                      <List w={'100%'} spacing={3}>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Tên công việc: {room.jobName}
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          <Badge colorScheme='purple'> {formatDateTime(room.startDate)}</Badge>
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Trạng thái: <Badge>{room.status}</Badge>
                        </ListItem>
                        <ListItem>
                          <ListIcon as={MdCheckCircle} color='green.500' />
                          Số ứng viên: {room.listCandidate.length}
                        </ListItem>
                      </List>
                    </CardBody>
                    <CardFooter>
                      <Button
                        color='white'
                        onClick={() => {
                          navigate(`/mark-candidate/${room.id}`)
                        }}
                        w={'100%'}
                        backgroundColor={'rgb(3, 201, 215)'}>
                        Xem thông tin
                      </Button>
                    </CardFooter>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>
        </Box>
      </>
    )
}
