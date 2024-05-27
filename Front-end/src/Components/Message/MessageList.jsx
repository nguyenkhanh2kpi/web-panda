import React from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  Box,
  ButtonGroup,
  IconButton,
  Stack,
} from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons'
import { ChatEngineId } from '../../global'
import './style.css'
import { useNavigate } from 'react-router-dom'


export const MessageList = () => {
  const initialFocusRef = React.useRef()
  const data = JSON.parse(localStorage.getItem('data'))
  const navigate = useNavigate()

  function renderNewChatForm(creds) {
    return <></>
  }
  function renderChatCard(chat, index) {
    return (
      <>
      </>
      // <ChatCard
      //   {...chat}
      //   onChatClick={() => {
      //     navigate('/message')
      //   }}
      // />
    )
  }

  function renderChatList(props) {
    return (
      <ChatList
        renderChatCard={(chat, index) => renderChatCard({ chat, index })}
        renderNewChatForm={(creds) => renderNewChatForm(creds)}
        {...props}
      />
    )
  }

  return (
    <Popover initialFocusRef={initialFocusRef} placement='bottom' closeOnBlur={false}>
      <PopoverTrigger>
        <IconButton
          border={'1px'}
          borderColor={'#457eff'}
          borderRadius={'50px'}
          aria-label='Call Segun'
          h={'40px'}
          w={'auto'}
          size='lg'
          ml={2}
          icon={<ChatIcon color={'#457eff'} />}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Your message</PopoverHeader>
        <PopoverBody p={1}>
          <Stack backgroundColor={'green'} w={900}>
            {/* <ChatEngine
              projectID={ChatEngineId}
              userName='candidate@gmail.com'
              userSecret='123'
              renderChatList={(props) => renderChatList(props)}
              renderChatFeed={(props) => {return (<></>)}}
              renderChatSettings={(props) => {return (<></>)}}
            /> */}
            {/* <PrettyChatWindow
              projectId={ChatEngineId}
              username={data.data.email}
              secret='123'
              style={{ height: '100%', width: '100%' }}
            /> */}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
