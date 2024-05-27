import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { Button, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Input, Box, Image, FormControl, FormLabel, Checkbox } from '@chakra-ui/react'
import { MdVideocam } from 'react-icons/md'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'
import { interviewService } from '../../Service/interview.service'

const client_id = '854899780211-p148qqqvv8svo8mmviv8tuf6sbmip7iq.apps.googleusercontent.com'
export const GoogleCalendar = ({ startDate, endDate, listEmail, roomId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const [responseReceived, setResponseReceived] = useState(false)
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [googleToken, setGoogleToken] = useState()
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
    setGoogleForm((prevForm) => ({ ...prevForm, token: googleToken }))
  }

  const responseGoogle = (response) => {
    if (response.accessToken != undefined) {
      setGoogleToken(response.accessToken)
    } else {
      setResponseReceived(!responseReceived)
    }
  }

  const responseError = (error) => {
    console.log(error)
  }

  const onsuccessLogout = (response) => {
    console.log('dang xuat thanh cong:' + response)
  }

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: client_id,
        scope: 'openid email profile https://www.googleapis.com/auth/calendar.events',
      })
    }
    gapi.load('client:auth2', start)
  })

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
      interviewService
        .sendCalendar(formGoogle, accessToken)
        .then((response) => toast.info(response.message))
        .catch((error) => toast.error('something went wrong'))
    } else {
      toast.error('invalid form')
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

  return (
    <>
      <ToastContainer position='bottom-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />
      <Button ml={500} fontFamily={'Montserrat'} fontWeight={400} w={'30%'} leftIcon={<MdVideocam />} colorScheme='teal' variant='solid' onClick={onOpen}>
        Lên lịch phỏng vấn
      </Button>
      <Drawer size={'lg'} isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent fontFamily={'Montserrat'} fontWeight={400}>
          <DrawerCloseButton />
          <DrawerHeader>Gooogle Calendar</DrawerHeader>

          <DrawerBody>
            <Image h={100} w={100} src='https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_18_2x.png' />
            <GoogleLogin
              borderWidth='1px'
              borderRadius='lg'
              clientId={client_id}
              buttonText='Login'
              onSuccess={responseGoogle}
              onFailure={responseError}
              cookiePolicy={'single_host_origin'}
              responseType='code'
              accessType='offline'
              isSignedIn={true}
              scope='openid email profile https://www.googleapis.com/auth/calendar.events'
            />
            <FormControl pt={4}>
              <FormLabel>Summary</FormLabel>
              <Input onChange={handleOnChangeForm} type='summary' name='summary' value={formGoogle.summary} />
              <FormLabel>Description</FormLabel>
              <Input onChange={handleOnChangeForm} type='sescription' name='description' value={formGoogle.description} />
              <FormLabel>Location</FormLabel>
              <Input onChange={handleOnChangeForm} type='sescription' name='location' value={formGoogle.location} />
              <FormLabel>Types interview</FormLabel>
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

              {/* <FormLabel>Start date</FormLabel>
              <Input disabled={true} type='datetime-local' name='startTime' value={formGoogle.startTime} />
              <FormLabel>End Date</FormLabel>
              <Input disabled={true} type='datetime-local' name='endTime' value={formGoogle.endTime} /> */}
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSendCalendar} colorScheme='blue'>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
