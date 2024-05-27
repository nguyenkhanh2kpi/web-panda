import React, { useEffect, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { FiShoppingCart } from 'react-icons/fi'
import { BsChatLeft } from 'react-icons/bs'
import { RiNotification3Line } from 'react-icons/ri'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'

import { Cart, Chat, Notification, UserProfile } from '.'
import { useStateContext } from '../contexts/ContextProvider'
import { Avatar, Box, HStack, Link, Menu, MenuButton, MenuItem, MenuList, Text, WrapItem, Button, IconButton } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { RiVipCrown2Line } from 'react-icons/ri'
import { ChevronDownIcon } from '@chakra-ui/icons'

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position='BottomCenter'>
    <button type='button' onClick={() => customFunc()} style={{ color }} className='relative text-xl rounded-full p-3 hover:bg-light-gray'>
      <span style={{ background: dotColor }} className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2' />
      {icon}
    </button>
  </TooltipComponent>
)

const Navbar = () => {
  const navigate = useNavigate()
  const data = JSON.parse(localStorage.getItem('data'))
  const user = JSON.parse(localStorage.getItem('data')).userInfo
  const avatar = JSON.parse(localStorage.getItem('avatar'))
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext()

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false)
    } else {
      setActiveMenu(true)
    }
  }, [screenSize])

  const handleActiveMenu = () => setActiveMenu(!activeMenu)

  return (
    <div className='flex justify-between p-2 md:ml-6 md:mr-6 relative'>
      <NavButton title='Menu' customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
      <div className='flex'>
        {/* <NavButton title='Cart' customFunc={() => navigate('/vip/my-bills')} color={currentColor} icon={<FiShoppingCart />} />
        <NavButton title='Chat' dotColor='#03C9D7' customFunc={() => handleClick('chat')} color={currentColor} icon={<BsChatLeft />} />
        <NavButton title='Notification' dotColor='rgb(254, 201, 15)' customFunc={() => handleClick('notification')} color={currentColor} icon={<RiNotification3Line />} /> */}
        <HStack>
          <Menu>
            <MenuButton bgColor={'white'} as={Button}>
              <WrapItem>
                <FiShoppingCart />
              </WrapItem>
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton bgColor={'white'} as={Button}>
              <WrapItem>
                <BsChatLeft />
              </WrapItem>
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton bgColor={'white'} as={Button}>
              <WrapItem>
                <RiNotification3Line />
              </WrapItem>
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton bgColor={'white'} as={Button} rightIcon={<ChevronDownIcon />}>
              <WrapItem>
                <HStack spacing='2'>
                  <Avatar name={data.data.username} src={data.data.userInfo.avatar} size='sm' />
                  <Text mt={3}>{data.data.username}</Text>
                  <IconButton borderRadius={'50%'} bgColor='yellow' icon={<RiVipCrown2Line />} />
                </HStack>
              </WrapItem>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => navigate('/userInfo')}>User info</MenuItem>
              <MenuItem onClick={() => navigate('/userInfo1')}>User info1</MenuItem>
              <MenuItem onClick={() => navigate('/messages')}>Messages</MenuItem>
              <MenuItem onClick={() => navigate('/AdLogout')}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>


        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  )
}

export default Navbar
