import React, { useState } from 'react'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import FormHelperText from '@mui/material/FormHelperText'
import CoPresentIcon from '@mui/icons-material/CoPresent'
import BadgeIcon from '@mui/icons-material/Badge'
import { Checkbox } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import './Both.css'
import { hostName } from '../../global'
import { useParams } from 'react-router-dom'
import { Box, Button } from '@chakra-ui/react'
const Verify = () => {
  const params = useParams()
  const [passShow, setPassShow] = useState(false)
  const [cpassShow, setCPassShow] = useState(false)
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  // =============================================================================================================

  const [otp, setCodeVerify] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (otp === '') {
      toast.warning('codeVerify is required!', {
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

        const email = params.email
        const { data } = await axios.post(`${hostName}/auth/verify`, { email, otp }, config)

        if (data.data !== null) {
          toast.success(data.message, {
            position: 'top-center',
          })
          console.log(data)
          setTimeout(() => {
            navigate('/')
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
                <label htmlFor='name'>Please Enter verify code</label>
                <input type='verify' onChange={(e) => setCodeVerify(e.target.value)} name='verify' id='verify' placeholder='Enter Your Name ' />
              </div>

              <Button mb={10} onClick={handleSubmit} color={'white'} backgroundColor={'#87b2c4'}>
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

export default Verify
