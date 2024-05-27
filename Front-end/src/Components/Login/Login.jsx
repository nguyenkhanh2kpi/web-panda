import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Box } from '@mui/material'
import axios from 'axios'
import './styleLogin.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { hostName, webHost } from '../../global'
import { Button, Spinner, Text, VStack } from '@chakra-ui/react'
import { IoEyeOutline } from 'react-icons/io5'
import { IoEyeOffOutline } from 'react-icons/io5'
import { Stack } from 'react-bootstrap'
import { authService } from '../../Service/authenticate.service'
import { useGoogleLogin } from '@react-oauth/google'

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
      toast.error('email is required!', {
        position: 'top-center',
      })
    } else if (!email.includes('@')) {
      toast.warning('includes @ in your email!', {
        position: 'top-center',
      })
    } else if (password === '') {
      toast.error('password is required!', {
        position: 'top-center',
      })
    } else if (password.length < 3) {
      toast.error('password must be 4 char!', {
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
          toast.success('User Login Successfuly', {
            position: 'top-center',
          })
          localStorage.setItem('data', JSON.stringify(data))
          localStorage.setItem('avatar', JSON.stringify(data.data.userInfo.avatar))
          console.log('user login succesfully done')
          setLoading(true)
          window.location.replace(`${webHost}`)
        } else {
          if (data.message === 'Your account is not activate!!!') {
            toast.error(data.message, {
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
            toast.error(data.message, {
              position: 'top-center',
            })
          }
        }
        setLoading(false)
      } catch (error) {
        const FError = error.response.data.message
        console.log(FError)
        toast.error('something went wrong', {
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
        toast.success('User Login Successfuly', {
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
    <section className='login_section'>
      <Box mb={40} fontFamily={'Montserrat'} fontSize={'20px'} display={'flex'} mt={5}>
        <Box
          style={{
            backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/007/559/359/non_2x/panda-an-illustration-of-a-panda-logo-climbing-a-bamboo-tree-free-vector.jpg')`,
          }}
          w='100%'
          alignItems={'center'}
          className='left_section'
          elevation={4}>
          <Link to='/signup' style={{ textDecoration: 'none' }}>
            <button
              variant='outlined'
              style={{ marginLeft: '10%', marginTop: '10%', fontSize: '20px' }}>
              Register For Free
            </button>
          </Link>
        </Box>
        <Box
          style={{
            backgroundImage: `url('https://cdn.dribbble.com/users/11310665/screenshots/19568845/panda_logo.png')`,
          }}
          className='form_data'>
          <div className='form_heading'>
            <p>Welcome Back, Log In</p>
          </div>

          <form>
            <div className='form_input'>
              <label htmlFor='email'>Email</label>
              <input
                style={{ borderRadius: '10px' }}
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name='email'
                id='email'
                placeholder='Enter Your email here '
              />
            </div>
            <div className='form_input'>
              <label htmlFor='password'>Password</label>
              <div className='two'>
                <input
                  style={{ borderRadius: '10px' }}
                  type={!passShow ? 'password' : 'text'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name='password'
                  id='password'
                  placeholder='Enter Your password'
                />
                <div className='showpass' onClick={() => setPassShow(!passShow)}>
                  {!passShow ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </div>
              </div>
            </div>
            <Button
              backgroundColor={'#87b2c4'}
              p={8}
              fontFamily={'Montserrat'}
              __hover={{ backgroundColor: '#ffffff' }}
              w={'100%'}
              borderRadius={10}
              onClick={submitHandler}>
              {loading ? (
                <>
                  <Spinner />
                </>
              ) : (
                <>Login</>
              )}
            </Button>
            <VStack>
              <Link fontFamily={'Montserrat'} to={`/resetPassword`}>
                <Text style={{ marginTop: '20px', fontSize: '15px' }}>Quên tài khoản </Text>
              </Link>
              <Text style={{ marginTop: '20px', fontSize: '15px' }}>Hoặc đăng nhập bằng </Text>
            </VStack>

            <Stack w={'100%'}>
              <Box mt={3} m='auto' textAlign='center'></Box>
            </Stack>
          </form>
          <button onClick={() => loginss()}>
            <img
              src='https://i.pinimg.com/736x/74/65/f3/7465f30319191e2729668875e7a557f2.jpg'
              alt='Google Logo'
              style={{ width: '40px', height: '40px', borderRadius: '50%' }}
            />
          </button>
          <ToastContainer />
        </Box>
      </Box>
    </section>
  )
}

export default Login
