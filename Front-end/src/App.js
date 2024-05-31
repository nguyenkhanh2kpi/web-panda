import './App.css'
import React, { useEffect, useState } from 'react'
import Navbar1 from './Components/Navbar/Navbar1'
import AllRoutes from './Routes/AllRoutes'
import AllRoutesAd from './Routes/AllRoutesAd'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import Footer from './Components/Footer/Footer'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useStateContext } from './contexts/ContextProvider'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import { FiSettings } from 'react-icons/fi'
import { Navbar, FooterAdmin, Sidebar, ThemeSettings } from './Components-admin'
import { ConversationsStyle, MessagesStyle, UIKitSettingsBuilder } from '@cometchat/uikit-shared'
import { AvatarStyle, BackdropStyle, BadgeStyle, CometChatConversations, CometChatMessages, CometChatUIKit, ListItemStyle, TitleAlignment } from '@cometchat/chat-uikit-react'
import { CometChatUsersWithMessages } from '@cometchat/chat-uikit-react'
import { ConversationsRequestBuilder } from '@cometchat/chat-sdk-javascript'
import { CometChat } from '@cometchat/chat-sdk-javascript'
import { cometChatService } from './Service/cometchat.service'
import ChatWindow from './pages-admin/MessageAdmin/ChatWindow'
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs'

function App() {
  const data = JSON.parse(localStorage.getItem('data'))

  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext()

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode')
    const currentThemeMode = localStorage.getItem('themeMode')
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor)
      setCurrentMode(currentThemeMode)
    }
  }, [])
  // localStorage.removeItem("data");
  const handleAddNewUser = (uid, username, avatar, email, phone) => {
    cometChatService
      .createNewUser(uid, username, avatar, email, phone)
      .then((reponse) => console.log('userBNN', reponse))
      .catch((er) => console.log(er))
  }

  useEffect(() => {
    if (data != null) {
      const COMETCHAT_CONSTANTS = {
        APP_ID: '25621446d429b454',
        REGION: 'us',
        AUTH_KEY: '1de6a118d4d1a49b1ffb70d9b76a274fc9a330c9',
      }
      const UIKitSettings = new UIKitSettingsBuilder().setAppId(COMETCHAT_CONSTANTS.APP_ID).setRegion(COMETCHAT_CONSTANTS.REGION).setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY).subscribePresenceForFriends().build()
      CometChatUIKit.init(UIKitSettings)
        .then(() => {
          console.log('Initialization completed successfully')
        })
        .catch((er) => console.log(er))
      CometChatUIKit.getLoggedinUser().then((user) => {
        if (!user) {
          CometChatUIKit.login(data.data.email.split('@')[0])
            .then((user) => {
              console.log('Login cometchat Successful:', { user })
            })
            .catch((er) => {
              if (er.code === 'ERR_UID_NOT_FOUND') {
                handleAddNewUser(data.data.email, data.data.username, data.data.userInfo.avatar, data.data.email, data.data.userInfo.phone ? data.data.userInfo.phone : '0123456789')
              } else {
                console.log('comoetnchat', er)
              }
            })
        } else {
        }
      })
    }
  }, [data])

  // chat
  const [isChatOpen, setIsChatOpen] = useState(false)
  const toggleChatWindow = () => {
    setIsChatOpen(!isChatOpen)
  }
  const [sendToMe, setSendToMe] = useState()
  useEffect(() => {
    const listenerID = 'UNIQUE_LISTENER_ID'

    const handleTextMessageReceived = (message) => {
      setSendToMe(message)
      if (!window.location.pathname.includes('messages')) {
        setIsChatOpen(true)
      }
      console.log('Text message received:', JSON.stringify(message))
    }

    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: handleTextMessageReceived,
      })
    )

    return () => {
      CometChat.removeMessageListener(listenerID)
    }
  }, [])

  if (data !== null) {
    if (data.data.role === 'ADMIN' || data.data.role === 'INTERVIEWER' || data.data.role === 'RECRUITER')
      return (
        <BrowserRouter>
          <Provider store={store}>
            <div className='flex relative dark:bg-main-dark-bg'>
              <div className='fixed right-4 bottom-4' style={{ zIndex: '1000' }}>
                <TooltipComponent content='Settings' position='Top'>
                  {/* <button type='button' onClick={() => setThemeSettings(true)} style={{ background: currentColor, borderRadius: '50%' }} className='text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray'>
                    <FiSettings />
                  </button> */}
                </TooltipComponent>

                {isChatOpen ? <ChatWindow onClose={toggleChatWindow} email={sendToMe.sender.uid} /> : <></>}
              </div>
              {activeMenu ? (
                <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white '>
                  <Sidebar />
                </div>
              ) : (
                <div className='w-0 dark:bg-secondary-dark-bg'>
                  <Sidebar />
                </div>
              )}
              <div className={activeMenu ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  ' : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '}>
                <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg w-full '>
                  <Navbar />
                </div>
                <div>
                  {/* {themeSettings && <ThemeSettings />} */}
                  <AllRoutesAd />
                </div>
                <FooterAdmin />
              </div>
            </div>
          </Provider>
        </BrowserRouter>
      )
  }

  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className='App'>
          {isChatOpen ? <ChatWindow onClose={toggleChatWindow} email={sendToMe.sender.uid} /> : <></>}
          <ConditionalNavbar />
          <AllRoutes />
          <ConditionalFooter />
        </div>
      </Provider>
    </BrowserRouter>
  )
}

const ConditionalNavbar = () => {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/resetPassword'
  return !isLoginPage && <Navbar1 />
}

const ConditionalFooter = () => {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/resetPassword'
  return !isLoginPage && <Footer />
}

export default App
