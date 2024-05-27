import { Avatar, Box, Button, Center, FormControl, FormHelperText, FormLabel, HStack, Heading, Input, InputGroup, InputRightAddon, Select, SlideFade, Spinner, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUserInfo } from '../../redux/UserInfo/Action'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { hostName } from '../../global'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'

export const UserInfoAdmin = () => {
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
  const [testAva, setTestAva] = useState(user.avatar)
  const [testCV, setTestCV] = useState()

  let ImageAva = []
  let CV = []

  const [selectedAvatar, setSelectedAvatar] = useState(null)
  const handleFileChange = (e) => {
    setSelectedAvatar(e.target.files[0])
    setTestAva(e.target.files[0])
  }

  const uploadAvatar = async () => {
    if (selectedAvatar) {
      const formData = new FormData()
      formData.append('file', selectedAvatar)

      try {
        const response = await axios.post(`${hostName}/file/upload`, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        console.log('Uploaded avatar:', response.data.data)
        ImageAva[0] = response.data.data
      } catch (error) {
        console.error('Error uploading avatar:', error)
      }
    } else {
      console.log('No file selected')
    }
  }

  const submitHandlerPassword = async (e) => {
    e.preventDefault()
    if (oldPassword === '') {
      toast.error('Old password is required!', {
        position: 'top-center',
      })
    } else if (oldPassword.length < 0) {
      toast.error('password is required!', {
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
          if (response.data.status === '200 OK') {
            toast.success(response.data.message)
          } else {
            toast.error(response.data.message)
          }
        })
        .catch((error) => {
          console.log(error)
          toast.error('Something went wrong!!', {
            position: 'top-center',
          })
        })
    }
  }

  const SubmitHandler = async (e) => {
    try {
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

      localStorage.setItem('avatar', JSON.stringify(ImageAva.length == 0 ? user.avatar : ImageAva.at(0)))
      toast.success('Update Info Successfuly', {
        position: 'top-center',
      })
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
      <HStack align={'flex-start'}>
        <VStack w={'60%'} spacing={12}>
          <Box w={'100%'} overflow='hidden' align={'flex-start'}>
            <HStack>
              <Box w={'30%'}>
                <label htmlFor='avatarInput'>
                  <Avatar size='2xl' name={user.usename} src={ImageAva.length == 0 ? user.avatar : ImageAva.at(0)} />
                </label>
                <input id='avatarInput' type='file' accept='image/*' onChange={handleFileChange} style={{ display: 'none' }} />
                <button onClick={uploadAvatar}>Upload Avatar</button>
              </Box>
              <Box w={'100%'}>
                <FormControl>
                  <FormLabel>Email address</FormLabel>
                  <Input disabled value={email != null ? email : user.email} onChange={(e) => setEmail(e.target.value)} type='email' />
                  <FormLabel>Full name</FormLabel>
                  <Input value={fullName != null ? fullName : user.fullName} onChange={(e) => setFullName(e.target.value)} type='text' />
                  <FormLabel>Address</FormLabel>
                  <Input value={address != null ? address : user.address} onChange={(e) => setAddress(e.target.value)} type='text' />
                  <FormLabel>Phone</FormLabel>
                  <Input value={phone != null ? phone : user.phone} onChange={(e) => setPhone(e.target.value)} type='number' />
                  <FormLabel>Gender</FormLabel>
                  <Select value={gender != null ? gender : user.gender} onChange={(e) => setGender(e.target.value)}>
                    <option value='MALE'>MALE</option>
                    <option value='FEMALE'>FEMALE</option>
                    <option value='NON_BINARY'>NON_BINARY</option>
                  </Select>
                </FormControl>
              </Box>
            </HStack>
            <FormControl p={2}>
              <FormLabel>Language</FormLabel>
              <Input value={language != null ? language : user.language} onChange={(e) => setLanguage(e.target.value)} type='text' />
              <FormLabel>Skill</FormLabel>
              <Input value={skill != null ? skill : user.skill} onChange={(e) => setSkill(e.target.value)} type='text' />
              <FormLabel>Experience</FormLabel>
              <Input value={experience != null ? experience : user.experience} onChange={(e) => setExperience(e.target.value)} type='text' />
              <FormLabel>Description</FormLabel>
              <Input type='text' value={description != null ? description : user.description} onChange={(e) => setDescription(e.target.value)} />
            </FormControl>

            <Button onClick={SubmitHandler} m={2} colorScheme='teal'>
              Save
            </Button>
          </Box>
        </VStack>

        <VStack w={'40%'}>
          <Box w={'100%'} overflow='hidden' align={'flex-start'}>
            <FormLabel fontWeight={'bold'} fontSize={18} w={'100%'} p={4}>
              Change password
            </FormLabel>
            <FormControl p={4} isRequired>
              <FormLabel mt={2}>Old password</FormLabel>
              <InputGroup>
                <Input type={!passShow ? 'password' : 'text'} value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder='Old password' />
                <InputRightAddon onClick={() => setPassShow(!passShow)}>
                  <div className='showpass'>{!passShow ? <IoEyeOutline /> : <IoEyeOffOutline />}</div>
                </InputRightAddon>
              </InputGroup>

              <FormLabel mt={2}>new password</FormLabel>
              <InputGroup>
                <Input type={!passShow ? 'password' : 'text'} value={newPassword1} onChange={(e) => setNewPassword1(e.target.value)} placeholder='New password' />
                <InputRightAddon onClick={() => setPassShow(!passShow)}>
                  <div className='showpass'>{!passShow ? <IoEyeOutline /> : <IoEyeOffOutline />}</div>
                </InputRightAddon>
              </InputGroup>

              <FormLabel mt={2}>renew password</FormLabel>
              <InputGroup>
                <Input type={!passShow ? 'password' : 'text'} value={newPassword2} onChange={(e) => setNewPassword2(e.target.value)} placeholder='Re-new password' />
                <InputRightAddon onClick={() => setPassShow(!passShow)}>
                  <div className='showpass'>{!passShow ? <IoEyeOutline /> : <IoEyeOffOutline />}</div>
                </InputRightAddon>
              </InputGroup>

              <Button onClick={submitHandlerPassword} mt={2} colorScheme='teal'>
                Reset password
              </Button>
            </FormControl>
          </Box>
        </VStack>
      </HStack>
    )
  }
}
