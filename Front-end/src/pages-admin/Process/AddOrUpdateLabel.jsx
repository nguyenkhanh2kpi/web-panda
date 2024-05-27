import { Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Select } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ColorPicker from '../../Components-admin/ColorPicker'
import { labelService } from '../../Service/label.service'

const AddLabel = ({ reload, setReload }) => {
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token

  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setName('') 
    setColor('#00D084') 
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
    setName('')
    setColor('#00D084') 
  }

  const [name, setName] = useState('')
  const [color, setColor] = useState('#00D084')

  const handleColorChange = (color) => {
    setColor(color.hex)
  }

  const handleSubmit = () => {
    let form = {
      name: name,
      color: color,
    }
    labelService
      .addLabel(accessToken, form)
      .then((reponse) => setReload(!reload))
      .catch((er) => console.log(er))
      .finally(() => handleClose())
  }
  useEffect(() => {}, [isOpen, reload])

  return (
    <>
      <Button color={'white'} bgColor={'#2cccc7'} onClick={handleOpen}>
        + Thêm nhãn
      </Button>
      <Overlay isOpen={isOpen} onClose={handleClose}>
        <Box p={10} w={500} h={300} bgColor={'white'} borderRadius={10}>
          <FormControl>
            <FormLabel htmlFor='name'>Tên nhãn</FormLabel>
            <Input id='name' value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='color'>Màu sắc</FormLabel>
            <ColorPicker onChangeComplete={handleColorChange} initialColor='#00D084' />
          </FormControl>
          <HStack mt={5} w={'100%'}>
            <Button w={'50%'} colorScheme='gray' onClick={handleClose}>
              Đóng
            </Button>
            <Button w={'50%'} bgColor={'#2cccc7'} color={'white'} onClick={handleSubmit}>
              Lưu
            </Button>
          </HStack>
        </Box>
      </Overlay>
    </>
  )
}

export default AddLabel

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
