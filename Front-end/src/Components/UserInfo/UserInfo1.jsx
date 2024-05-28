import React, { useState, useRef, useEffect } from 'react'
import { Box, Button, FormLabel, Image, Input, useToast, VStack, FormControl, Select, InputRightAddon, InputGroup, SlideFade, Heading, HStack, Spinner, Text, Icon, Textarea, FormHelperText, FormErrorMessage } from '@chakra-ui/react'
import { userService } from '../../Service/user.servie'
import { ToastContainer } from 'react-toastify'
import { AiOutlineUser, AiOutlineUsergroupAdd } from 'react-icons/ai'
import { json } from 'react-router-dom'

const UserInfo1 = () => {
  const [user, setUser] = useState(null)

  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)
  const toast = useToast()
  const token = JSON.parse(localStorage.getItem('data')).access_token

  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    if (file) {
      try {
        setLoading(true)
        const response = await userService.uploadAvatar(file, token).then((response) => {
          console.log(response)
          setUser(response.data)
        })

        setLoading(false)
        toast({
          title: 'Upload successful.',
          description: 'Cập nhật ảnh đại diện thành công',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      } catch (error) {
        console.error('Error uploading avatar:', error)
        setLoading(false)
        toast({
          title: 'Upload failed.',
          description: 'Đã có lỗi xảy ra, hãy thử lại sau',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }
  }

  useEffect(() => {
    userService
      .getMyProfile(token)
      .then((response) => setUser(response.data))
      .catch((er) => console.log(er))
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }))
  }
  const SubmitHandler = async () => {
    if (user.fullName === '') {
      toast({
        title: 'Form input',
        description: 'Họ và tên không thể để trống',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } else {
      try {
        setLoading(true)
        const formData = user
        const updatedProfile = await userService.updateProfile(formData, token)
        toast({
          title: 'Profile updated.',
          description: 'Cập nhật thông tin cá nhân thành công',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })

        setLoading(false)
      } catch (error) {
        console.error('Error updating profile:', error)
        toast({
          title: 'Update failed.',
          description: 'Đã có lỗi xảy ra, hãy thử lại sau',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        setLoading(false)
      }
    }
  }

  return (
    <>
      <VStack bgColor={'#f0f4f5'} fontFamily={'Montserrat'}>
        <SlideFade in={!loading} offsetY={20}>
          <Heading size={'lg'} m={'6'} mt={24}></Heading>
        </SlideFade>
        {loading || user === null ? (
          <Box h={1000} mt={10}>
            <Spinner size='xl' />
            <Text mt={4}>Loading...</Text>
          </Box>
        ) : (
          <HStack h={1000} align={'flex-start'} w={'80vw'}>
            <VStack bgColor={'white'} w={'100%'} pr={3} p={10} borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow='md' align={'flex-start'}>
              <HStack alignItems='center' spacing={4}>
                <Icon as={AiOutlineUser} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
                <Text m={0} fontSize='2xl'>
                  Thông tin cá nhân
                </Text>
              </HStack>
              <HStack w={'100%'} alignItems='center' spacing={4}>
                <Box w={'30%'}>
                  <Image src={user.avatar} alt='Upload Avatar' w={'150px'} h={'150px'} objectFit='cover' cursor='pointer' onClick={handleImageClick} borderRadius='50%' />
                  <Input type='file' accept='image/*' ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
                  <Button onClick={handleImageClick} isLoading={loading} colorScheme='teal' mt={4} display='none'>
                    Upload Avatar
                  </Button>
                </Box>
                <FormControl isRequired isInvalid={user.fullName === ''}>
                  <FormLabel>Email</FormLabel>
                  <Input disabled value={user.email} type='email' />
                  <FormLabel>Họ và tên</FormLabel>
                  <Input name='fullName' onChange={handleInputChange} value={user.fullName} type='text' />
                  {!user.fullName === '' ? <></> : <FormErrorMessage>Yêu cầu tên đầy đủ.</FormErrorMessage>}
                </FormControl>
                <FormControl>
                  <FormLabel>SDT</FormLabel>
                  <Input name='phone' onChange={handleInputChange} value={user.phone} type='number' />
                  <FormLabel>Giới tính</FormLabel>
                  <Select value={user.gender} onChange={(e) => setUser({ ...user, gender: e.target.value })}>
                    <option value='MALE'>Nam</option>
                    <option value='FEMALE'>Nữ</option>
                    <option value='NON_BINARY'>Khác</option>
                  </Select>
                </FormControl>
              </HStack>
              <FormControl p={2} w={'100%'}>
                <HStack w={'100%'}>
                  <VStack w={'50%'} alignItems={'flex-start'}>
                    <FormLabel>Địa chỉ</FormLabel>
                    <Input name='address' onChange={handleInputChange} value={user.address} type='text' />
                  </VStack>
                  <VStack w={'50%'} alignItems={'flex-start'}>
                    <FormLabel>Ngôn ngữ</FormLabel>
                    <Input value={user.language} onChange={(e) => setUser({ ...user, language: e.target.value })} type='text' />
                  </VStack>
                </HStack>

                <FormLabel>Kĩ năng</FormLabel>
                <Input value={user.skill} onChange={(e) => setUser({ ...user, skill: e.target.value })} type='text' />
                <FormLabel>Kinh nghiệm</FormLabel>
                <Textarea value={user.experience} onChange={(e) => setUser({ ...user, experience: e.target.value })} type='text' />
                <FormLabel>Mô tả bản thân</FormLabel>
                <Textarea id='des' type='text' value={user.description} onChange={(e) => setUser({ ...user, description: e.target.value })} />
              </FormControl>
              <Button w={200} color={'white'} onClick={SubmitHandler} m={2} bgColor={'#2cccc7'}>
                Lưu
              </Button>
            </VStack>
          </HStack>
        )}
      </VStack>
    </>
  )
}

export default UserInfo1
