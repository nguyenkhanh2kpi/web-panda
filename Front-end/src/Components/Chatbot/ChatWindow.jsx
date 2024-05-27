import React, { useEffect, useRef, useState } from 'react'
import './ChatWindow.css'
import { Box, Button, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { chatBotService } from './chatbot.service'
import { jobService } from '../../Service/job.service'
import { AiOutlineSend } from 'react-icons/ai'

const ChatWindow = ({ onClose }) => {
  const messagesEndRef = useRef(null)
  const initChat = [
    {
      bot: true,
      message: 'Hello! Tôi là trợ lý Panda, tôi có thể giúp gì cho bạn?',
    },
  ]
  const [chats, setChats] = useState(initChat)
  const [message, setMessage] = useState('')
  const [jobs, setJob] = useState([])

  const handleChangMessage = (event) => {
    setMessage(event.target.value)
  }
  const handleSendMessage = () => {
    if (message.trim() !== '') {
      chatBotService
        .postMessage(message)
        .then((response) => {
          if (response.response.tag === 'gợi_ý_việc_làm') {
            console.log('goi yyyyyyyyyyyyyyyyy')
          }
          const newChat = [...chats, { bot: false, message: message }]
          setChats(newChat)
          setChats((prevChats) => [...prevChats, { bot: true, message: response.response.message }])
          setMessage('')
        })
        .catch((error) => {
          console.error('Error sending message:', error)
        })
      setMessage('')
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chats])

  useEffect(() => {
    jobService
      .getAllJob()
      .then((response) => setJob(response))
      .catch((er) => console.log(er))
  }, [])

  const getAdviceJob = ({ message }) => {}

  return (
    <div className='chat-window'>
      <div className='header'>
        <span className='title'>Chatbot AI</span>
      </div>
      <div className='content'>
        <Box>
          {chats.map((chat, index) => (
            <div key={index}>{chat.bot ? <BotMessage message={chat.message} /> : <MyMessage message={chat.message} />}</div>
          ))}
          <div ref={messagesEndRef}></div>
        </Box>
      </div>

      <div className='input-container'>
        {/* <InputGroup className='message-input'>
          <Input
            borderRadius={20}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSendMessage()
              }
            }}
            value={message}
            onChange={handleChangMessage}
            placeholder='Text your message...'
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </InputGroup> */}
        <InputGroup borderRadius={20} className='message-input' size='md'>
          <Input
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSendMessage()
              }
            }}
            value={message}
            onChange={handleChangMessage}
            p={7}
            type='text'
            placeholder='Text your message...'
            borderRadius={20}
          />
          <InputRightElement width='4.5rem'>
            <IconButton mt={3} backgroundColor={'white'} onClick={handleSendMessage} aria-label='Search database' icon={<AiOutlineSend />} />
          </InputRightElement>
        </InputGroup>
      </div>
    </div>
  )
}

const BotMessage = ({ message }) => {
  return (
    <div className='bot-message'>
      <p>{message}</p>
    </div>
  )
}

const MyMessage = ({ message }) => {
  return (
    <div className='my-message'>
      <div className='in-my-message'>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default ChatWindow
