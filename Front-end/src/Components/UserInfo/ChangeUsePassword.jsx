import { Box, Button, FormControl, FormLabel, HStack, Heading, Icon, Input, SlideFade, Spinner, Text, VStack, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loadUserInfo } from '../../redux/UserInfo/Action'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { hostName } from '../../global'
import axios from 'axios'
import { userService } from '../../Service/user.servie'

export const ChangeUsePassword = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast({
        title: 'Please fill all fields!',
        status: 'error',
        position: 'top-center',
        duration: 5000,
        isClosable: true,
      })
      return
    }

    const form = {
      password: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    }

    const response = await userService.changePassword(accessToken, form)

    if (response.data.status === '200 OK') {
      toast({
        title: response.message,
        status: 'success',
        position: 'top-center',
        duration: 5000,
        isClosable: true,
      })
      navigate('/userInfo1')
    } else if (response.data.status === "401 UNAUTHORIZED") {
      toast({
        title: response.message,
        status: 'error',
        position: 'top-center',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <VStack bgColor={'#f0f4f5'} fontFamily={'Montserrat'}>
      <SlideFade offsetY={20}>
        <Heading size={'lg'} m={'6'} mt={24}></Heading>
      </SlideFade>
      <HStack h={1000} align={'flex-start'} w={'40vw'}>
        <VStack bgColor={'white'} w={'100%'} pr={3} p={10} borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow='md' align={'flex-start'}>
          <HStack alignItems='center' spacing={4}>
            <Icon as={AiOutlineUser} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
            <Text m={0} fontSize='2xl'>
              Đổi mật khẩu
            </Text>
          </HStack>
          <FormControl w={'100%'}>
            <FormLabel>Mật khẩu cũ</FormLabel>
            <Input type='password' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
            <FormLabel>Mật khẩu mới</FormLabel>
            <Input type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <FormLabel>Nhập lại mật khẩu mới</FormLabel>
            <Input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </FormControl>
          <Button mt={4} colorScheme='teal' onClick={handleChangePassword}>
            Đổi mật khẩu
          </Button>
        </VStack>
      </HStack>
    </VStack>
  )
}
