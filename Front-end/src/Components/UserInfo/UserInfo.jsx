import React, { useState, useEffect } from 'react'
import { Badge, Box, Button, Center, Image, Spinner, Text } from '@chakra-ui/react'
import axios from 'axios'
import './Both.css'
import { ToastContainer, toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
// import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from 'react-redux'
import { loadUserInfo } from '../../redux/UserInfo/Action'
import { hostName, webHost } from '../../global'
import { IoEyeOutline } from 'react-icons/io5'
import { IoEyeOffOutline } from 'react-icons/io5'
const UserInfo = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUserInfo())
  }, [])
  const user = useSelector((store) => store.userInfo.data)
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [passShow, setPassShow] = useState(false)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword1, setNewPassword1] = useState('')
  const [newPassword2, setNewPassword2] = useState('')

  const [email, setEmail] = useState(user.email)
  const [fullName, setFullName] = useState(user.fullName)
  const [address, setAddress] = useState(user.address)
  const [phone, setPhone] = useState(user.phone)
  const [gender, setGender] = useState(user.gender)
  const [language, setLanguage] = useState(user.language)
  const [skill, setSkill] = useState(user.skill)
  const [experience, setExperience] = useState(user.experience)
  const [description, setDescription] = useState(user.description)
  const [testAva, setTestAva] = useState()
  const [testCV, setTestCV] = useState()

  let ImageAva = []
  let CV = []

  const submitHandlerPassword = async (e) => {
    e.preventDefault()
    if (oldPassword === '') {
      toast.error('Old password is required!', {
        position: 'top-center',
      })
    } else if (oldPassword.length < 8) {
      toast.error('password must be 8 char!', {
        position: 'top-center',
      })
    } else if (newPassword1 === '') {
      toast.error('New password is required!', {
        position: 'top-center',
      })
    } else if (newPassword1.length < 8) {
      toast.error('password must be 8 char!', {
        position: 'top-center',
      })
    } else if (newPassword2 === '') {
      toast.error('New password is required!', {
        position: 'top-center',
      })
    } else if (newPassword2.length < 8) {
      toast.error('password must be 8 char!', {
        position: 'top-center',
      })
    } else {
    }

    let data = JSON.stringify({
      password: oldPassword,
      newPassword: newPassword1,
      confirmPassword: newPassword2,
    })

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${hostName}/user/password`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      data: data,
    }

    axios
      .request(config)
      .then((response) => {
        console.log('haha')
      })
      .catch((error) => {
        console.log(error)
        toast.error('Update Info Failed', {
          position: 'top-center',
        })
      })

    toast.success('Update Password Successfuly', {
      position: 'top-center',
    })
    setTimeout(() => {
      navigate('/logOut')
    }, 2000)
  }





  const SubmitHandler = async (e) => {
    try {
      if (testCV != null && !window.testCV) {
        console.log('vao dc r')
        const formDataCV = new FormData()
        formDataCV.append('file', testCV)

        const imageResponseCV = await axios.post(`${hostName}/file/upload`, formDataCV, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        CV.push(imageResponseCV.data.data)
        console.log('CV goi ve ', CV.at(0))
      } else {
        console.log('cv bi null r ')
      }

      console.log('test ava null', ImageAva.length == 0 ? 'bi null' : 'ko null')
      if (testAva != null && !window.testAva) {
        console.log('vao dc r')
        const formDataAva = new FormData()
        formDataAva.append('file', testAva)

        const imageResponseAva = await axios.post(`${hostName}/file/upload`, formDataAva, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        ImageAva.push(imageResponseAva.data.data)
        console.log('Ava goi ve ', ImageAva.at(0))
      } else {
        console.log('ava bi null r ')
      }

      let data = JSON.stringify({
        fullName: fullName,
        email: email,
        phone: phone,
        gender: gender,
        address: address,
        dob: '',
        cv_pdf: CV.length == 0 ? user.cv_pdf : CV.at(0),
        avatar: ImageAva.length == 0 ? user.avatar : ImageAva.at(0),
        language: language,
        skill: skill,
        experience: experience,
        description: description,
      })

      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${hostName}/profile`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        data: data,
      }

      axios
        .request(config)
        .then((response) => {
          console.log('haha')
        })
        .catch((error) => {
          console.log(error)
          toast.error('Update Info Failed', {
            position: 'top-center',
          })
        })

      localStorage.setItem(
        'avatar',
        JSON.stringify(ImageAva.length == 0 ? user.avatar : ImageAva.at(0))
      )
      toast.success('Update Info Successfuly', {
        position: 'top-center',
      })
      navigate('/userInfo')
    } catch (error) {}
  }

  if (!user.email)
    return (
      <Center direction='row' spacing={4} w={'80vw'} h={'20vw'}>
        <Spinner color='blue.500' size='xl' />
      </Center>
    )
  else {
    return (
      <Box fontFamily={'Montserrat'} display='flex' justifyContent='center' alignItems='center'>
        <Box w={'60%'} mt={20}>
          <Box h={'auto'} p={10} justifyContent={'center'} className='form_data3'>
            <Box mt={10} fontSize={25} className='form_heading'>
              Thông tin cá nhân
            </Box>
            <form>
              <Image
                borderRadius='full'
                mr={'8px'}
                w={'100px'}
                h={'100px'}
                style={{ marginBottom: '10px', marginTop: '20px' }}
                src={user.avatar}
              />
              <div className='form_input'>
                <label htmlFor='email'>
                  <p style={{ marginRight: '5px', width: '130px' }}>
                    <Badge borderRadius='full' fontSize='14px' px='2'>
                      Email
                    </Badge>
                  </p>
                </label>
                <input
                  type='text'
                  value={email != null ? email : user.email}
                  onChange={(e) => setEmail(e.target.value)}
                  name='email'
                  id='email'
                />
              </div>

              <div className='form_input'>
                <label htmlFor='fullName'>
                  <p style={{ marginRight: '5px', width: '130px' }}></p>
                  <Badge borderRadius='full' fontSize='14px' px='2'>
                    Họ tên
                  </Badge>
                </label>

                <input
                  type='text'
                  value={fullName != null ? fullName : user.fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  name='fullName'
                  id='fullName'
                />
              </div>
              <div className='form_input'>
                <label htmlFor='address'>
                  <p style={{ marginRight: '5px', width: '130px' }}></p>
                  <Badge borderRadius='full' fontSize='14px' px='2'>
                    Địa chỉ
                  </Badge>
                </label>

                <input
                  type='text'
                  value={address != null ? address : user.address}
                  onChange={(e) => setAddress(e.target.value)}
                  name='address'
                  id='address'
                />
              </div>
              <div className='form_input'>
                <label htmlFor='phone'>
                  <p style={{ marginRight: '5px', width: '130px' }}></p>
                  <Badge borderRadius='full' fontSize='14px' px='2'>
                    Số điện thoại
                  </Badge>
                </label>

                <input
                  type='text'
                  value={phone != null ? phone : user.phone}
                  onChange={(e) => setPhone(e.target.value)}
                  name='phone'
                  id='phone'
                />
              </div>

              <div className='form_input'>
                <label htmlFor='phone'>
                  <p style={{ marginRight: '5px', width: '130px' }}></p>
                  <Badge borderRadius='full' fontSize='14px' px='2'>
                    Giới tính
                  </Badge>
                </label>

                <select
                style={{padding:3, borderRadius: "10px"}}
                  value={gender != null ? gender : user.gender}
                  onChange={(e) => setGender(e.target.value)}
                  name='sex'
                  id='sex'>
                  <option value='male'>MALE</option>
                  <option value='female'>FEMALE</option>
                  <option value='other'>NON_BINARY</option>
                </select>

              </div>

              <div className='form_input'>
                <label htmlFor='phone'>
                  <p style={{ marginRight: '5px', width: '130px' }}></p>
                  <Badge borderRadius='full' fontSize='14px' px='2'>
                    Ngôn ngữ
                  </Badge>
                </label>

                <input
                  type='text'
                  value={language != null ? language : user.language}
                  onChange={(e) => setLanguage(e.target.value)}
                  name='language'
                  id='language'
                />
              </div>

              <div className='form_input'>
                <label htmlFor='phone'>
                  <p style={{ marginRight: '5px', width: '130px' }}></p>
                  <Badge borderRadius='full' fontSize='14px' px='2'>
                    Kỹ năng
                  </Badge>
                </label>

                <input
                  type='text'
                  value={skill != null ? skill : user.skill}
                  onChange={(e) => setSkill(e.target.value)}
                  name='skill'
                  id='skill'
                />
              </div>

              <div className='form_input'>
                <label htmlFor='phone'>
                  <p style={{ marginRight: '5px', width: '130px' }}></p>
                  <Badge borderRadius='full' fontSize='14px' px='2'>
                    Kinh nghiệm
                  </Badge>
                </label>

                <input
                  type='text'
                  value={experience != null ? experience : user.experience}
                  onChange={(e) => setExperience(e.target.value)}
                  name='experience'
                  id='experience'
                />
              </div>

              <div className='form_input'>
                <label htmlFor='phone'>
                  <p style={{ marginRight: '5px', width: '130px' }}></p>
                  <Badge borderRadius='full' fontSize='14px' px='2'>
                    Mô tả
                  </Badge>
                </label>

                <input
                  type='text'
                  value={description != null ? description : user.description}
                  onChange={(e) => setDescription(e.target.value)}
                  name='description'
                  id='description'
                />
              </div>

              <div className='form_input'>
                <label htmlFor='phone'>
                  <p style={{ marginRight: '5px', width: '130px' }}></p>
                  <Badge borderRadius='full' fontSize='14px' px='2'>
                    CV
                  </Badge>
                  <Box p={2}>
                    CV link: <Text>{user.cv_pdf ? user.cv_pdf : 'Chưa có'}</Text>
                  </Box>
                </label>

                <input
                  type='file'
                  onChange={(e) => setTestCV(e.target.files[0])}
                  name='cv_pdf'
                  id='cv_pdf'
                />
              </div>

              <div className='form_input'>
                <label htmlFor='phone'>
                  <p style={{ marginRight: '5px', width: '130px' }}></p>
                  <Badge borderRadius='full' fontSize='14px' px='2'>
                    Avatar
                  </Badge>
                </label>

                <input
                  type='file'
                  onChange={(e) => setTestAva(e.target.files[0])}
                  name='avatar'
                  id='avatar'
                />
              </div>
              <Button color={'white'} mb={10} backgroundColor={'#87b2c4'} onClick={SubmitHandler}>
                Cập nhật thông tin
              </Button>
            </form>
          </Box>

          <Box mb={40} p={10} h={'auto'} className='form_data3'>
            <Box mt={10} fontSize={25} className='form_heading'>
              Thay đổi mật khẩu
            </Box>
            <form>
              <div className='form_input'>
                <label htmlFor='password'>Mật khẩu cũ</label>
                <div className='two'>
                  <input
                    type={!passShow ? 'password' : 'text'}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    name='oldPassword'
                    id='oldPassword'
                    placeholder='Enter Your Old password'
                  />
                  <div className='showpass' onClick={() => setPassShow(!passShow)}>
                    {!passShow ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </div>
                </div>
              </div>

              <div className='form_input'>
                <label htmlFor='password'>Nhập mật khẩu mới</label>
                <div className='two'>
                  <input
                    type={!passShow ? 'password' : 'text'}
                    value={newPassword1}
                    onChange={(e) => setNewPassword1(e.target.value)}
                    name='newPassword1'
                    id='newPassword1'
                    placeholder='Enter Your New password'
                  />
                  <div className='showpass' onClick={() => setPassShow(!passShow)}>
                    {!passShow ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </div>
                </div>
              </div>
              <div className='form_input'>
                <label htmlFor='password'>Nhập lại mật khẩu mới</label>
                <div className='two'>
                  <input
                    type={!passShow ? 'password' : 'text'}
                    value={newPassword2}
                    onChange={(e) => setNewPassword2(e.target.value)}
                    name='newPassword2'
                    id='newPassword2'
                    placeholder='Enter Your New password'
                  />
                  <div className='showpass' onClick={() => setPassShow(!passShow)}>
                    {!passShow ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </div>
                </div>
              </div>
              <Button
                color={'white'}
                mb={10}
                backgroundColor={'#87b2c4'}
                onClick={submitHandlerPassword}>
                Cập nhật
              </Button>
            </form>
            <ToastContainer />
          </Box>
        </Box>
      </Box>
    )
  }
}

export default UserInfo
