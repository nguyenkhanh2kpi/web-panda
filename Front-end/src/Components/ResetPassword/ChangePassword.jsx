import React, { useState } from 'react'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Both.css'
import { hostName } from '../../global'
import { useParams } from 'react-router-dom'
import { Box, Button } from '@chakra-ui/react'
const ChangePassword = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  // =============================================================================================================

  const [password, setPassword] = useState('')
  const [confirmPassword, SetConfirmPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password === '') {
      toast.warning('Password is required!', {
        position: 'top-center',
      })
    } else if (password.length < 8) {
      toast.warning('password must be 8 char!', {
        position: 'top-center',
      })
    } else if (confirmPassword === '') {
      toast.warning('Comfirm Password is required!', {
        position: 'top-center',
      })
    } else if (confirmPassword !== password) {
      toast.warning('Comfirm Password must be same with Password', {
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

        console.log('password', password)
        console.log('comfirm password', confirmPassword)
        const { data } = await axios.put(`${hostName}/recover/password?uid=${params.id}&o=${params.otp}`, { password, confirmPassword }, config)

        if (data.message === 'Success !') {
          toast.success('Đổi mật khẩu mới thành công', {
            position: 'top-center',
          })
          console.log(data.data)
          setTimeout(() => {
            navigate('/login')
          }, 2000)
        } else {
          toast.error(data.message, {
            position: 'top-center',
          })
          console.log(data)
        }
      } catch (error) {
        setError(error.response.data.message)
        const FError = error.response.data.message
        console.log(FError)
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
                  marginLeft: '-40%',
                }}>
                Nhập mã xác nhận từ mail
              </h2>
            </div>
            <form>
              <div className='form_input_name'>
                <label htmlFor='name'>Please Enter new Password</label>
                <input type='verify' onChange={(e) => setPassword(e.target.value)} name='verify' id='verify' placeholder='Enter Your new Password ' />
              </div>

              <div className='form_input_name'>
                <label htmlFor='name'>Please comfirm new Password</label>
                <input type='verify' onChange={(e) => SetConfirmPassword(e.target.value)} name='verify' id='verify' placeholder='Enter Your new Password again ' />
              </div>

              <Button mb={10} color={'white'} backgroundColor={'#87b2c4'} onClick={handleSubmit}>
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

export default ChangePassword
