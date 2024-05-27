import { Avatar, Badge, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardBody, CardHeader, Flex, HStack, Heading, IconButton, Img, Menu, MenuButton, MenuItem, MenuList, Spinner, Stack, Text, VStack, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AddInterviewer } from './AddInterviewer'
import { interviewerService } from '../../Service/interviewer.service'
import { userService } from '../../Service/user.servie'
import { BsThreeDotsVertical } from 'react-icons/bs'


export const ManageInterviewer = () => {
  const toast = useToast()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [hrs, sethrs] = useState([])
  const [loading, setLoading] = useState(false)
  const [change, setChange] = useState(false)
  useEffect(() => {
    setLoading(true)
    interviewerService
      .getMyInterviewer(accessToken)
      .then((res) => {
        sethrs(res)
        setLoading(false)
      })
      .catch((err) => console.log(err.message))
  }, [change])

  const handleAddBlackList = (id) => {
    const forms = {
      userId: id,
      description: 'string',
    }
    userService
      .addBlacklist(accessToken, forms)
      .then((res) => {
        toast({
          title: 'Account block.',
          description: res.message,
          status: 'success',
          duration: 1000,
          isClosable: true,
        })
        setChange(!change)
      })
      .catch((error) => console.log(error.message))
  }
  const handleRemoveBlackList = (id) => {
    userService
      .removeBlacklist(accessToken, id)
      .then((res) => {
        toast({
          title: 'Account active.',
          description: res.message,
          status: 'success',
          duration: 1000,
          isClosable: true,
        })
        setChange(!change)
      })
      .catch((error) => console.log(error.message))
  }

  if (loading) {
    return (
      <Box fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'} p={30} overflow='hidden'>
        <VStack>
          <Box w={'100%'}>
            <AddInterviewer />
          </Box>
          <Text pt='20px' fontWeight='black' w='100%'>
            Danh sách đội tuyển dụng
          </Text>
          <Box w='100%' backgroundColor='#ffffff' p='2%' borderRadius={20}>
            <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
          </Box>
        </VStack>
      </Box>
    )
  } else if (hrs.length === 0 && loading === false) {
    return (
      <Box fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'} p={30} overflow='hidden'>
        <VStack>
          <Box w={'100%'}>
            <AddInterviewer />
          </Box>
          <Text pt='20px' fontWeight='black' w='100%'>
            Danh sách đội tuyển dụng
          </Text>
          <Box w='100%' backgroundColor='#ffffff' p='2%' borderRadius={20}>
            You dont have any hr
          </Box>
        </VStack>
      </Box>
    )
  } else
    return (
      <Box fontFamily={'Montserrat'}>
        <HStack justifyContent={'space-between'} w={'100%'}>
          <AddInterviewer />
        </HStack>

        <VStack>
          <Box h={900} w='100%'>
            <VStack mt={3} w='100%'>
              {hrs.map((hr) => (
                <Card w={'100%'} key={hr.id} p={1}>
                  <CardHeader>
                    <Flex spacing='4'>
                      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name={hr.name} src={hr.avatar} />

                        <Box>
                          <Heading size='sm'>{hr.fullName}</Heading>
                          <Text>{hr.email}</Text>
                        </Box>
                        <Box>{hr.status === 'INPROCESS' ? <Badge colorScheme='green'>Hoạt động</Badge> : <Badge colorScheme='red'>Khóa</Badge>}</Box>
                      </Flex>
                      <Menu>
                        <MenuButton>
                          <IconButton variant='ghost' colorScheme='gray' aria-label='See menu' icon={<BsThreeDotsVertical />} />
                        </MenuButton>
                        <MenuList>
                          <MenuItem onClick={() => handleAddBlackList(hr.id)}>Khóa</MenuItem>
                          <MenuItem onClick={() => handleRemoveBlackList(hr.id)}>Active</MenuItem>
                        </MenuList>
                      </Menu>
                    </Flex>
                  </CardHeader>
                </Card>
              ))}
              {/* 
              {hrs.map((hr) => (
                <Box w='100%'>
                  <Card>
                    <CardBody>
                      <HStack justifyContent={'space-between'}>
                        <HStack spacing={5}>
                          <Avatar size='xl' name={hr.fullName ? hr.fullName : hr.email} src={hr.avatar} />
                          <VStack>
                            <Text w='100%' fontWeight={'black'}>
                              Full Name: {hr.fullName}
                            </Text>
                            <Text w='100%'>Email: {hr.email}</Text>
                          </VStack>
                        </HStack>

                        {hr.status === 'INPROCESS' ? (
                          <Button onClick={() => handleAddBlackList(hr.id)} color={'white'} backgroundColor={'#30f0b6'}>
                            ACTIVE
                          </Button>
                        ) : (
                          <Button onClick={() => handleRemoveBlackList(hr.id)} color={'white'} backgroundColor={'#fa236e'}>
                            DISABLE
                          </Button>
                        )}
                      </HStack>
                    </CardBody>
                  </Card>
                </Box>
              ))} */}
            </VStack>
          </Box>
        </VStack>
      </Box>
    )
}
