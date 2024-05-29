import React, { useState, useEffect, useRef } from 'react'
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'
import { AiOutlineBell } from 'react-icons/ai'
import './Popover.css'
import { Badge, Box, Button, Card, CardBody, HStack, Heading, Icon, Link, Text, VStack, useStyleConfig } from '@chakra-ui/react'
import { notifyService } from '../../Service/notify.service'
import { format } from 'date-fns'
import { CheckCircleIcon, CheckIcon } from '@chakra-ui/icons'

const Notification = () => {
  const [showPopover, setShowPopover] = useState(false)
  const buttonRef = useRef(null)
  const [myNotifications, setMynotifications] = useState([])
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws')
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log(new Date(), str)
      },
      onConnect: (frame) => {
        console.log('Connected: ' + frame)
        stompClient.subscribe('/topic/notifications', (notification) => {
          fetchNotifications()
          // setShowPopover(true)
        })
      },
    })
    stompClient.activate()

    return () => {
      if (stompClient) {
        stompClient.deactivate()
      }
    }
  }, [])

  const fetchNotifications = () => {
    notifyService.getMyNotify(accessToken).then((response) => setMynotifications(response))
  }

  useEffect(() => {
    fetchNotifications()
  }, [accessToken])

  const calculatePopoverPosition = () => {
    const buttonRect = buttonRef.current.getBoundingClientRect()
    const left = buttonRect.left - 190
    const top = buttonRect.bottom + 10
    return { left, top }
  }
  const popoverPosition = showPopover ? calculatePopoverPosition() : null

  const unreadCount = myNotifications.filter((notification) => notification.status === 'UNREAD').length

  const changeStatus = async (id) => {
    try {
      const response = await notifyService.changeStatus(accessToken, id)
      setMynotifications((prevNotifications) => prevNotifications.map((notification) => (notification.id === id ? { ...notification, status: response.status } : notification)))
    } catch (error) {
      console.error('Error updating notification status:', error)
    }
  }

  const cardStyles = useStyleConfig('Card', {})

  return (
    <>
      <button ref={buttonRef} type='button' onClick={() => setShowPopover(!showPopover)} className='relative text-xl rounded-full p-3 hover:bg-light-gray'>
        {unreadCount > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              height: '20px',
              width: '20px',
              borderRadius: '50%',
              background: 'red',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
            }}>
            {unreadCount}
          </div>
        )}
        <AiOutlineBell />
      </button>

      {showPopover && (
        <div style={{ position: 'absolute', left: popoverPosition.left, top: popoverPosition.top }}>
          <Box fontFamily={'Montserrat'} p={1} maxH={600} bgColor={'white'} w={400} boxShadow={'lg'} borderRadius={10} borderWidth={1}>
            <VStack w={'100%'}>
              <HStack p={2} w={'100%'} justifyContent={'space-between'}>
                <Heading fontFamily={'Montserrat'} size={'md'}>
                  Thông báo
                </Heading>
              </HStack>
              <VStack spacing={0} m={0} w={'100%'} maxH={500} overflowY={'auto'}>
                {myNotifications.length > 0 ? (
                  myNotifications.map((notify) => (
                    <Card p={2} key={notify.id} w={'100%'} sx={cardStyles}>
                      <Heading fontFamily={'Montserrat'} size={'sm'}>
                        {notify.title}
                        {notify.status === 'UNREAD' ? (
                          <Icon viewBox='0 0 200 200' color='red.500'>
                            <path fill='currentColor' d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0' />
                          </Icon>
                        ) : (
                          <></>
                        )}
                      </Heading>
                      <Link onClick={() => changeStatus(notify.id)} href={notify.link} isExternal>
                        {notify.message}
                      </Link>
                      <HStack justifyContent={'space-between'} w={'100%'}>
                        <Text>{format(new Date(notify.createdAt), 'PPpp')}</Text>
                        <CheckIcon onClick={() => changeStatus(notify.id)} />
                      </HStack>
                    </Card>
                  ))
                ) : (
                  <>
                    <Card p={2} w={'100%'} sx={cardStyles}>
                      <Heading fontFamily={'Montserrat'} size={'sm'}>
                        Bạn không có thông báo nào
                      </Heading>
                    </Card>
                  </>
                )}
              </VStack>
            </VStack>
          </Box>
        </div>
      )}
    </>
  )
}

export default Notification
