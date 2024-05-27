import React, { useEffect, useState } from 'react'
import { Box, Flex, IconButton, useColorModeValue } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { CometChat } from '@cometchat/chat-sdk-javascript'
import { CometChatMessageComposer, CometChatMessageHeader, CometChatMessageList, MessageHeaderStyle, MessageListStyle } from '@cometchat/chat-uikit-react'

const messageHeaderStyle = new MessageHeaderStyle({
  border: '0px',
  onlineStatusColor: '#ad09d6',
})

const ChatWindow = ({ onClose, email }) => {
  const bg = useColorModeValue('white', 'gray.800')
  const color = useColorModeValue('black', 'white')

  const [chatUser, setChatUser] = useState()
  useEffect(() => {
    CometChat.getUser(email.split('@')[0])
      .then((user) => {
        setChatUser(user)
      })
      .catch((er) => console.log(er))
  }, [])

  const getSubtitleView = (user) => {
    return <span style={{ color: '#474347', font: '500 14px Inter, sans-serif' }}>{chatUser?.getStatus()}</span>
  }

  const messageListStyle = new MessageListStyle({
    background: 'transparent',
    border: '0px',
    borderRadius: '0px',
    height: '100%',
    width: '100%',
    loadingIconTint: 'red',
    nameTextColor: 'pink',
    threadReplyTextColor: 'green',
  })

  return (
    <Box zIndex={10000000} position='fixed' bottom='0' right='20px' width='400px' height='500px' bg={bg} color={color} borderRadius='8px 8px 0 0' boxShadow='lg' display='flex' flexDirection='column'>
      <Flex pr={2} justifyContent='space-between' alignItems='center' bg='white' color='white' borderRadius='8px 8px 0 0'>
        {chatUser && <CometChatMessageHeader hideBackButton={true} user={chatUser} subtitleView={getSubtitleView(chatUser)} messageHeaderStyle={messageHeaderStyle} />}
        <IconButton icon={<CloseIcon />} size='sm' onClick={onClose} aria-label='Close chat' />
      </Flex>
      <Box flex='1' overflowY='auto'>
        {chatUser && <CometChatMessageList user={chatUser} messageListStyle={messageListStyle} />}
      </Box>
      <Flex borderTop='1px solid' borderColor='gray.200'>
        {chatUser && <CometChatMessageComposer user={chatUser} />}
      </Flex>
    </Box>
  )
}

export default ChatWindow
