import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, FormLabel, HStack, Input, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { skillPositionService } from '../../Service/skillPosition.service'

export const AddSkillOverplay = ({ load, setLoad }) => {
  const toast = useToast()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setSkill({
      id: 0,
      skillName: '',
    })
    setIsOpen(false)
  }

  const [skill, setSkill] = useState({
    id: 0,
    skillName: '',
  })
  const handleOnChange = (event) => {
    const { name, value } = event.target
    setSkill({ ...skill, [name]: value })
  }

  const handleOnAdd = async () => {
    await skillPositionService
      .addSkill(accessToken, skill)
      .then((response) =>
        toast({
          title: 'Skill',
          description: response.message,
          status: 'info',
          duration: 1000,
          isClosable: true,
        })
      )
      .catch((error) =>
        toast({
          title: 'Skill',
          description: 'something went wrong!',
          status: 'error',
          duration: 1000,
          isClosable: true,
        })
      )
      .finally(() => {
        setLoad(!load)
        handleClose()
      })
  }

  return (
    <>
      <Button w={'25%'} onClick={handleOpen} leftIcon={<AddIcon />} bgColor={'#2cccc7'} color={'white'} variant='solid'>
        Thêm
      </Button>
      <Overlay isOpen={isOpen} onClose={handleClose}>
        <Box p={10} w={500} h={200} bgColor={'white'} borderRadius={10}>
          <VStack w={'100%'}>
            <FormLabel>Tên kĩ năng</FormLabel>
            <Input name='skillName' variant='outline' value={skill.skillName} placeholder='Kĩ năng' onChange={handleOnChange} />
            <HStack w={'100%'}>
              <Button w={'50%'} colorScheme='gray' onClick={handleClose}>
                Đóng
              </Button>
              <Button w={'50%'} color='white' bgColor='#03C9D7' onClick={handleOnAdd}>
                Save
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Overlay>
    </>
  )
}

const Overlay = ({ isOpen, onClose, children }) => {
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: isOpen ? 'flex' : 'none',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  }

  return <div style={overlayStyle}>{children}</div>
}
