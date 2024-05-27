import React from 'react'
import { Header } from '../../Components-admin'
import { Box, Button, IconButton } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadInterviewer } from '../../redux/Interviewer/Action'
import { loadRoom } from '../../redux/Room/Action'
import { Link } from 'react-router-dom'

export const Interview = () => {
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadRoom())
    dispatch(loadInterviewer())
  }, [])

  const roomList = useSelector((store) => store.room.data)
  const interviewerList = useSelector((store) => store.interviewer.data)
  return (
    <>
      <Button height='50px' color='white' text='Xem chi tiết' borderRadius='10px'>
        <Link to='/roomList'>Xem chi tiết</Link>
      </Button>
      <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
        <Header category='App' title='Interview' />
        <Box>
            

        </Box>
      </div>
    </>
  )
}
