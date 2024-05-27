import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { interviewerService } from '../../Service/interviewer.service'
import { companyService } from '../../Service/company.service'

export const AddCompany = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [isLoad, setIsLoad] = useState(false)

  const [input, setInput] = useState({
    email: '',
    password: '',
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setInput((preform) => ({ ...preform, [name]: value }))
  }

  const handleAddClick = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!input.email || !input.password) {
      toast.error('Please provide email and password')
      return
    }

    if (!emailRegex.test(input.email)) {
      toast.error('Please provide a valid email address')
      return
    }

    if (input.password.length < 8) {
      toast.error('Password should be at least 8 characters long')
      return
    }
    
    setIsLoad(true)
    companyService
      .registerReccer(accessToken, input)
      .then((res) => {
        if (res.message === 'Success') {
          toast.success('Success')
        } else {
          toast.error(res.message)
        }
        setIsLoad(false)
      })
      .catch((err) => console.log(err))
  }
  return (
    <>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <Button
        fontFamily={'Montserrat'}
        fontWeight={400}
        ml={'8%'}
        color='white'
        backgroundColor='rgb(3, 201, 215)'
        onClick={onOpen}>
        + Thêm thành viên
      </Button>

      <AlertDialog
        fontFamily={'Montserrat'}
        fontWeight={400}
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Add Reccer Account
            </AlertDialogHeader>

            <AlertDialogBody>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name='email'
                  placeholder='email'
                  value={input.email}
                  onChange={handleInputChange}
                />
                <FormLabel>Password</FormLabel>
                <Input
                  name='password'
                  placeholder='password'
                  value={input.password}
                  onChange={handleInputChange}
                />
              </FormControl>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>

              {isLoad ? (
                <Spinner m={4} />
              ) : (
                <>
                  <Button
                    color='white'
                    backgroundColor='rgb(3, 201, 215)'
                    ml={3}
                    onClick={handleAddClick}>
                    Add
                  </Button>
                </>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
