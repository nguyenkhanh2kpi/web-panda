import React from 'react'
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  SlideFade,
  Stack,
  Text,
  Wrap,
  WrapItem,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Container,
  Divider,
  Avatar,
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useMediaQuery,
} from '@chakra-ui/react'

import mainlogo from '../../Components/req/jobpandacom-logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { ChatIcon, ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons'
import { GoogleLogout } from 'react-google-login'
import { webHost } from '../../global'
import { CometChatUIKit } from '@cometchat/chat-uikit-react'
import ChatContainer from '../Chatbot/Chatbot'
import Notification from './Notification'
import { NotifyMessage } from './NotifyMessage'

const Navbar1 = () => {
  const navigate = useNavigate()
  const companies = useDisclosure()
  const services = useDisclosure()
  const data = JSON.parse(localStorage.getItem('data'))

  const handleLogout = () => {
    console.log('logout')
    if (window.gapi && window.gapi.auth2) {
      const auth2 = window.gapi.auth2.getAuthInstance()
      if (auth2 != null) {
        auth2.signOut().then(auth2.disconnect())
      }
    }
    localStorage.removeItem('data')
    window.location.replace(`${webHost}`)
    CometChatUIKit.logout()
  }

  return (
    <Box fontFamily={'Montserrat'} as={Container} zIndex='100' top='0' maxW='100%' h={'72px'} position='fixed' bgColor='white' mb='150px'>
      <ChatContainer />
      <HStack justifyContent={'space-between'} direction='row' w='100%' h='100%' m='auto' display='flex'>
        <Stack direction={'row'} h={'100%'}>
          <Box w={'150px'} h={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} cursor={'pointer'}>
            <Link to='/'>
              <Image w={'90%'} src={mainlogo} alt='Logo' alignItems={'center'} cursor={'pointer'} />
            </Link>
          </Box>
          <Box h={'100%'} display={'flex'} w={'33.3%'} alignItems={'center'} justifyContent={'center'} fontWeight={'500'} lineHeight={'20px'} color={'#445578'} cursor={'pointer'}>
            <Menu>
              <MenuButton bgColor={'white'} as={Button}>
                Việc làm
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate('/jobpage')}>Tìm việc làm</MenuItem>
                <MenuItem>Việc làm yêu thích</MenuItem>
                <MenuItem>Đã ứng tuyển</MenuItem>
              </MenuList>
            </Menu>
          </Box>

          <Box h={'100%'} display={'flex'} w={'auto'} alignItems={'center'} justifyContent={'center'} fontWeight={'500'} lineHeight={'20px'} color={'#445578'} cursor={'pointer'}>
            <Menu>
              <MenuButton bgColor={'white'} as={Button}>
                Công ty
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate('/companies')}>Tìm công ty</MenuItem>
              </MenuList>
            </Menu>
          </Box>

          <Box h={'100%'} display={'flex'} w={'33.3%'} alignItems={'center'} justifyContent={'center'} fontWeight={'500'} lineHeight={'20px'} color={'#445578'} cursor={'pointer'}>
            <Menu>
              <MenuButton bgColor={'white'} as={Button}>
                Sự kiện
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate('/')}>Xem sự kiện</MenuItem>
              </MenuList>
            </Menu>
          </Box>

          <Box h={'100%'} display={'flex'} w={'auto'} alignItems={'center'} justifyContent={'center'} fontWeight={'500'} lineHeight={'20px'} color={'#445578'} cursor={'pointer'}>
            <Menu>
              <MenuButton bgColor={'white'} as={Button}>
                Hồ sơ
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate('/resume')}>Resume</MenuItem>
                <MenuItem>CV của tôi</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Stack>

        <Stack direction={'row'} h={'100%'} alignItems={'center'}>
          {data !== null ? (
            <HStack w={'100%'}>
              <NotifyMessage />
              <Notification />
              <Menu>
                <MenuButton bgColor={'white'} as={Button} rightIcon={<ChevronDownIcon />}>
                  <WrapItem>
                    <HStack spacing='2'>
                      <Avatar name={data.data.username} src={data.data.userInfo.avatar} size='sm' />
                      <Text mt={3}>{data.data.username}</Text>
                    </HStack>
                  </WrapItem>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => navigate('/userInfo1')}>Thông tin cá nhân</MenuItem>
                  <MenuItem onClick={() => navigate('/change-password')}>Đổi mật khẩu</MenuItem>
                  <MenuItem onClick={() => navigate('/messages')}>Tin nhắn</MenuItem>
                  <MenuItem onClick={() => navigate('/resume')}>Hồ sơ CV</MenuItem>
                  <MenuItem onClick={() => navigate('/test')}>Kiểm tra sàng lọc</MenuItem>
                  <MenuItem onClick={() => handleLogout()}>Đăng xuất</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          ) : (
            <HStack>
              <Button border={'1px'} borderColor={'#457eff'} borderRadius={'50px'} color={'#457eff'} bg={'white'} h={'40px'} fontWeight={'600'}>
                <Link to='/login'>Đăng nhập</Link>
              </Button>
              <Button ml={2} border={'none'} borderRadius={'50px'} color={'white'} borderColor={'#ff7555'} bgColor={'#ff7555'} w={'100px'}>
                <Link to='/signup'>Đăng kí</Link>
              </Button>
            </HStack>
          )}
        </Stack>
      </HStack>
    </Box>
  )
}

export default Navbar1
