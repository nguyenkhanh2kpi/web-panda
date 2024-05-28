import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Card, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import { ConversationsStyle, MessagesStyle } from '@cometchat/uikit-shared'
import { CometChatConversations, CometChatMessages, TitleAlignment } from '@cometchat/chat-uikit-react'
import { useState } from 'react'
import { CometChat } from '@cometchat/chat-sdk-javascript'
const conversationsStyle = new ConversationsStyle({
  width: '100%',
  height: '100%',
  fontFamily: 'Montserrat',
})
const avatarStyle = {
  width: '75px',
  height: '75px',
  borderRadius: '50%',
  border: '1px solid white',
}
const listItemStyle = {
  width: '100%',
  height: '100%',
  transition: 'box-shadow 0.3s ease-in-out',
  boxShadow: 'none',
  cursor: 'pointer',
  borderRadius: '10px',
  ':hover': {
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
  },
}
const messagesStyle = new MessagesStyle({
  width: '100%',
  height: '100%',
  background: 'transparent',
  borderRadius: '20px',
  messageTextColor: 'blue',
  messageTextFont: 'sans-serif',
})

const MessageAdmin = () => {
  const data = JSON.parse(localStorage.getItem('data'))
  const [chatUser, setChatUser] = useState('')

  const handleOnItemClick = (item) => {
    CometChat.getUser(item.conversationWith.uid).then((user) => {
      setChatUser(user)
    })
  }

  return (
    <Box fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'} overflow='hidden'>
      {/* <Breadcrumb pt={30}>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Tin nhắn</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb> */}
      <VStack pt={30} h={800} pl={30} pr={30} spacing={10}>
        <Card h={600} w={'100%'} direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
          <HStack w={'100%'}>
            <Box h={'100%'} w={'30%'}>
              <CometChatConversations onItemClick={handleOnItemClick} listItemStyle={listItemStyle} avatarStyle={avatarStyle} title='Tin nhắn' titleAlignment={TitleAlignment.center} conversationsStyle={conversationsStyle} />
            </Box>
            <Box w={'70%'} h={'100%'}>
              {chatUser && <CometChatMessages messagesStyle={messagesStyle} user={chatUser} />}
            </Box>
          </HStack>
        </Card>
      </VStack>
    </Box>

    // <Box mb={20} mt={120} fontFamily={'Montserrat'}>
    //   <Box h={600} display='flex' justifyContent='space-evenly'>
    //     <Box overflow={'hidden'} borderRadius={20} borderWidth={1} h={600} display='flex' w='75%' boxShadow={'lg'}>
    //       <HStack w={'100%'}>
    //         <Box h={'100%'} w={'30%'}>
    //           <CometChatConversations onItemClick={handleOnItemClick} listItemStyle={listItemStyle} avatarStyle={avatarStyle} title='Messages' titleAlignment={TitleAlignment.center} conversationsStyle={conversationsStyle} />
    //         </Box>
    //         <Box w={'70%'} h={'100%'}>
    //           {chatUser && <CometChatMessages messagesStyle={messagesStyle} user={chatUser} />}
    //         </Box>
    //       </HStack>
    //     </Box>
    //   </Box>
    // </Box>
  )
}

export default MessageAdmin
