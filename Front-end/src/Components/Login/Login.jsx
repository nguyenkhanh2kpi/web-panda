import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Box } from '@mui/material'
import axios from 'axios'
import './styleLogin.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { hostName, webHost } from '../../global'
import { Button, Card, CardBody, Center, FormControl, FormLabel, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Spinner, Text, VStack } from '@chakra-ui/react'
import { IoEyeOutline } from 'react-icons/io5'
import { IoEyeOffOutline } from 'react-icons/io5'
import { Stack } from 'react-bootstrap'
import { authService } from '../../Service/authenticate.service'
import { useGoogleLogin } from '@react-oauth/google'
import { FaGoogle } from 'react-icons/fa'
import { PhoneIcon } from '@chakra-ui/icons'

function Login() {
  const [passShow, setPassShow] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const submitHandler = async (e) => {
    setLoading(true)
    e.preventDefault()
    if (email === '') {
      setLoading(false)
      toast.error('Yêu cầu nhập email!', {
        position: 'top-center',
      })
    } else if (!email.includes('@')) {
      setLoading(false)
      toast.warning('includes @ in your email!', {
        position: 'top-center',
      })
    } else if (password === '') {
      setLoading(false)
      toast.error('Hãy nhập mật khẩu!', {
        position: 'top-center',
      })
    } else {
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
          },
        }
        setLoading(true)

        const { data } = await axios.post(
          `${hostName}/auth/login`,
          {
            email,
            password,
          },
          config
        )

        console.log('data', data)

        if (data.data !== null) {
          toast.success('Đăng nhập thành công', {
            position: 'top-center',
          })
          localStorage.setItem('data', JSON.stringify(data))
          localStorage.setItem('avatar', JSON.stringify(data.data.userInfo.avatar))
          setLoading(true)
          window.location.replace(`${webHost}`)
        } else {
          if (data.message === 'Your account is not activate!!!') {
            toast.error('Tài khoản của bạn chưa được xác thực', {
              position: 'top-center',
            })

            const { data1 } = await axios.post(
              `${hostName}/auth/send-otp`,
              {
                email,
              },
              config
            )
            setTimeout(() => {
              navigate(`/verify/${email}`)
            }, 2000)
          } else {
            toast.error('Email hoặc mật khẩu của bạn không đúng', {
              position: 'top-center',
            })
          }
        }
        setLoading(false)
      } catch (error) {
        const FError = error.response.data.message
        console.log(FError)
        toast.error('Đã có lỗi xảy ra', {
          position: 'top-center',
        })
        setLoading(false)
      }
    }
  }

  const googleLogin = (accessToken) => {
    const form = {
      googleToken: accessToken,
    }
    authService
      .googleLogin(form)
      .then((response) => {
        toast.success('Đăng nhập thành công', {
          position: 'top-center',
        })
        localStorage.setItem('data', JSON.stringify(response))
        localStorage.setItem('avatar', JSON.stringify(response.data.userInfo.avatar))
        setLoading(true)
        window.location.replace(`${webHost}`)
      })
      .catch((error) => console.error('Error during Google login:', error))
  }

  const loginss = useGoogleLogin({
    onSuccess: (tokenResponse) => googleLogin(tokenResponse.access_token),
  })

  return (
    <VStack
      style={{
        backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/007/559/359/non_2x/panda-an-illustration-of-a-panda-logo-climbing-a-bamboo-tree-free-vector.jpg')`,
      }}
      minH={1000}
      bgColor={'#f0f4f5'}
      w={'100%'}>
      <Box w={'500px'} mt={15} fontFamily={'Montserrat'} fontSize={'20px'} display={'flex'}>
        <Card w={'100%'}>
          <CardBody w={'500px'}>
            <Heading fontFamily={'Montserrat'} size={'lg'}>
              Đăng nhập JobPanda
            </Heading>

            <FormControl mt={8}>
              <FormLabel>Email</FormLabel>
              <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Mật khẩu</FormLabel>
              <InputGroup mb={10} size='md'>
                <Input value={password} onChange={(e) => setPassword(e.target.value)} name='password' id='password' pr='4.5rem' type={passShow ? 'text' : 'password'} placeholder='Enter password' />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={() => setPassShow(!passShow)}>
                    {!passShow ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <VStack w={'100%'}>
              <Button w={'100%'} colorScheme='blue' onClick={submitHandler}>
                {loading ? (
                  <>
                    <Spinner />
                  </>
                ) : (
                  <>Đăng nhập</>
                )}
              </Button>
              <Text style={{ fontSize: '15px' }}>Hoặc đăng nhập bằng </Text>
              <Button w={'100%'} leftIcon={<FaGoogle />} colorScheme='red' onClick={() => loginss()}>
                Đăng nhập với Google
              </Button>
            </VStack>

            <VStack>
              <Link fontFamily={'Montserrat'} to={`/resetPassword`}>
                <Text style={{ marginTop: '20px', fontSize: '15px' }}>Quên tài khoản </Text>
              </Link>
            </VStack>

            <Stack w={'100%'}>
              <Box mt={3} m='auto' textAlign='center'></Box>
            </Stack>

            <ToastContainer />
          </CardBody>
        </Card>
      </Box>
    </VStack>
  )
}

export default Login
