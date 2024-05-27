import React, { useState } from 'react'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Both.css'
import { hostName } from '../../global'
import { Box, Button } from '@chakra-ui/react'
const ResetPassword = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  // =============================================================================================================

  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (email === '') {
      toast.warning('Email is required!', {
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

        const { data } = await axios.post(`${hostName}/recover/send-otp`, { email }, config)
        if (data.message === 'Success !') {
          console.log(data)
          toast.success(data.message, {
            position: 'top-center',
          })
          navigate(`/verifyResetPW/${email}`)
        } else {
          toast.error(data.message, {
            position: 'top-center',
          })
        }
      } catch (error) {
        setError(error.response.data.message)
        const FError = error.response.data.message
        toast.error("something went wrong", {
          position: 'top-center',
        })
        setLoading(false)
      }
    }
  }

  return (
    <>
      <session>
        <Box fontFamily={'Montserrat'} className='main'>
          <Box mt={40} className='form_data1'>
            <div className='form_heading'>
              <h2
                style={{
                  color: '#000000',
                  fontSize: '30px',
                }}>
                Nhập Email của bạn
              </h2>
            </div>
            <form>
              <div className='form_input_name'>
                <label htmlFor='name'>Please Enter your Email</label>
                <input type='verify' onChange={(e) => setEmail(e.target.value)} name='verify' id='verify' placeholder='Enter Your Email ' />
              </div>

              <Button color={'white'} mb={10} onClick={handleSubmit} backgroundColor={'#87b2c4'}>
                Xác thực
              </Button>
            </form>
            <ToastContainer />
          </Box>
        </Box>
      </session>
    </>
  )
}

export default ResetPassword
