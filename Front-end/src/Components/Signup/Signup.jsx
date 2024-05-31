import React, { useState } from 'react'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Both.css'
import { hostName, webHost } from '../../global'
import { Box, Button } from '@chakra-ui/react'
import { IoEyeOutline } from 'react-icons/io5'
import { IoEyeOffOutline } from 'react-icons/io5'
const Signup = () => {
  const [passShow, setPassShow] = useState(false)
  const [cpassShow, setCPassShow] = useState(false)
  const navigate = useNavigate()

  // =============================================================================================================

  const [email, setEmail] = useState('')
  const [username, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [picMessage, setPicMessage] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (username === '') {
      toast.warning('name is required!', {
        position: 'top-center',
      })
    } else if (email === '') {
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
    } else if (password.length < 6) {
      toast.error('password must be 6 char!', {
        position: 'top-center',
      })
      alert('add password more than 6')
    } else if (confirmpassword === '') {
      toast.error('confirmPassword is required!', {
        position: 'top-center',
      })
    } else if (confirmpassword.length < 6) {
      toast.error('confirm password must be 6 char!', {
        position: 'top-center',
      })
    } else if (password !== confirmpassword) {
      toast.error('pass and conformPass are not matching!', {
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

        const { data } = await axios.post(`${hostName}/auth/register`, { username, email, password }, config)
        console.log(data)
        setTimeout(() => {
          navigate(`/verify/${email}`)
        }, 2000)
      } catch (error) {
        setError(error.response.data.message)
        const FError = error.response.data.message
        console.log(FError)
        toast.error('something went wrong', {
          position: 'top-center',
        })
        setLoading(false)
      }
    }
  }

  return (
    <>
      <session>
        <Box h={1000} bgColor={'#f0f4f5'} fontFamily={'Montserrat'} className='main'>
          <Box
            mt={10}
            h={700}
            style={{
              backgroundImage: `url('https://i.pinimg.com/736x/34/e7/eb/34e7eb9d5803c1e4ec087637c4d15076.jpg')`,
            }}
            className='form_data3'>
            <Box mt={10} fontSize={25} className='form_heading'>
              Đăng kí và tìm việc ngay trên JobPanda
            </Box>
            <form>
              <div className='form_input_name'>
                <label htmlFor='name'>Tên đầy đủ </label>
                <input type='name' value={username} onChange={(e) => setName(e.target.value)} name='name' id='name' placeholder='Enter Your Name ' />
              </div>

              <div className='form_input'>
                <label htmlFor='email'>Tài khoản email</label>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} name='email' id='Email' placeholder='Enter Your email here ' />
              </div>

              <div className='form_input'>
                <label htmlFor='password'>Mật khẩu</label>
                <div className='two'>
                  <input value={password} onChange={(e) => setPassword(e.target.value)} type={!passShow ? 'password' : 'text'} name='password' id='password1' placeholder='Enter Your password' />
                  <div className='showpass1' onClick={() => setPassShow(!passShow)}>
                    {!passShow ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </div>
                </div>
              </div>
              <div className='form_input'>
                <label htmlFor='password1'>Nhập lại mật khẩu</label>
                <div className='two'>
                  <input value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} type={!cpassShow ? 'password' : 'text'} name='cpassword' id='password' placeholder='Enter Your password' />
                  <Box className='showpass1' onClick={() => setCPassShow(!cpassShow)}>
                    {!cpassShow ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </Box>
                </div>
              </div>

              <Button color={'white'} mb={10} backgroundColor={'#87b2c4'} onClick={handleSubmit}>
                Đăng kí
              </Button>
            </form>
            <ToastContainer />
          </Box>
        </Box>
      </session>
    </>
  )
}

export default Signup
