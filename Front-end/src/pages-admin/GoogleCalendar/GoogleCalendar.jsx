import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { Button, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Input, Box, Image, FormControl, FormLabel, Checkbox, Text, useToast } from '@chakra-ui/react'
import { MdVideocam } from 'react-icons/md'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { interviewService } from '../../Service/interview.service'
import { useGoogleLogin } from '@react-oauth/google'
import { format } from 'date-fns'

const client_id = '854899780211-p148qqqvv8svo8mmviv8tuf6sbmip7iq.apps.googleusercontent.com'
export const GoogleCalendar = ({ startDate, endDate, listEmail, roomId }) => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [formGoogle, setGoogleForm] = useState({
    roomId: roomId,
    location: '',
    summary: '',
    description: '',
    startTime: startDate,
    endTime: endDate,
    attendees: listEmail,
    token: '',
    offline: true,
  })

  const handleOnChangeForm = (event) => {
    const { name, value } = event.target
    setGoogleForm((prevForm) => ({ ...prevForm, [name]: value }))
    // setGoogleForm((prevForm) => ({ ...prevForm, token: googleToken }))
  }

  function formatDateTime(dateTime) {
    const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/
    if (!dateTimeRegex.test(dateTime)) {
      throw new Error('Invalid datetime format! The format should be YYYY-MM-DDTHH:MM')
    }
    return dateTime + ':00+07:00'
  }

  const formatForm = () => {
    const formattedStartDate = formatDateTime(startDate)
    const formattedEndDate = formatDateTime(endDate)
    setGoogleForm({
      ...formGoogle,
      startTime: formattedStartDate,
      endTime: formattedEndDate,
    })
  }

  const handleSendCalendar = async () => {
    if (validate()) {
      try {
        const response = await interviewService.sendCalendar(formGoogle, accessToken)
        toast({
          title: 'Lên lịch calendar',
          description: response.message,
          status: 'info',
          duration: 5000,
          isClosable: true,
        })
      } catch (error) {
        toast({
          title: 'Lên lịch calendar',
          description: 'Đã có lỗi',
          status: 'error', 
          duration: 5000,
          isClosable: true,
        })
      }
    } else {
      toast({
        title: 'Lên lịch calendar',
        description: 'Hãy nhập đầy đủ thông tin',
        status: 'error', 
        duration: 5000,
        isClosable: true,
      })
    }
  }

  function validate() {
    const { location, summary, description, startTime, endTime, attendees } = formGoogle
    if (location.trim() === '' || summary.trim() === '' || description.trim() === '' || startTime.trim() === '' || endTime.trim() === '' || attendees.length === 0) {
      return false
    }
    return true
  }

  useEffect(() => {
    formatForm()
  }, [isOpen])

  const loginss = useGoogleLogin({
    clientId: client_id,
    scope: 'openid email profile https://www.googleapis.com/auth/calendar.events',
    onSuccess: (tokenResponse) => setGoogleForm((prevForm) => ({ ...prevForm, token: tokenResponse.access_token })),
    onFailure: (error) => console.log('Login failed', error),
  })

  const handleOpen = () => {
    loginss()
    onOpen()
  }

  return (
    <>
      <Button ml={500} fontFamily={'Montserrat'} fontWeight={400} w={'30%'} leftIcon={<MdVideocam />} colorScheme='teal' variant='solid' onClick={handleOpen}>
        Lên lịch phỏng vấn
      </Button>
      <Drawer size={'lg'} isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent fontFamily={'Montserrat'} fontWeight={400}>
          <DrawerCloseButton />
          <DrawerHeader>Gooogle Calendar</DrawerHeader>
          <DrawerBody>
            <Button display={'none'} onClick={loginss}>
              Login
            </Button>
            <Text>
              Thời gian từ {format(startDate, 'HH:mm dd/MM/yyyy')} đến {format(endDate, 'HH:mm dd/MM/yyyy')}
            </Text>
            <FormControl>
              <FormLabel>Tiêu đề</FormLabel>
              <Input onChange={handleOnChangeForm} type='summary' name='summary' value={formGoogle.summary} />
              <FormLabel>Lưu ý cho ứng viên</FormLabel>
              <Input onChange={handleOnChangeForm} type='sescription' name='description' value={formGoogle.description} />
              <FormLabel>Địa điểm</FormLabel>
              <Input onChange={handleOnChangeForm} type='sescription' name='location' value={formGoogle.location} />
              <FormLabel>Hình thức</FormLabel>
              <Checkbox
                onChange={() =>
                  setGoogleForm((prevState) => ({
                    ...prevState,
                    offline: !prevState.offline,
                  }))
                }
                isChecked={formGoogle.offline}>
                offline
              </Checkbox>
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Thoát
            </Button>
            <Button onClick={handleSendCalendar} colorScheme='blue'>
              Lưu
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
