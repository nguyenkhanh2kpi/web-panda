import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Image,
  Text,
  useDisclosure,
  SimpleGrid,
  Badge,
  Link,
  Input,
  Stack,
  Radio,
  RadioGroup,
  VStack,
} from '@chakra-ui/react'
import React, { Fragment, useRef, useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BsBag, BsFillStarFill } from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'
import { loadJobDetail } from '../../redux/JobDetail/Action'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import { hostName, webHost } from '../../global'
import { IoBriefcaseOutline } from 'react-icons/io5'
import { HiOutlineCurrencyDollar } from 'react-icons/hi'
import { MdOutlineLocationOn } from 'react-icons/md'
import { MdOutlineTimelapse } from 'react-icons/md'
import { IoHourglassOutline } from 'react-icons/io5'
import { IoMedalOutline } from 'react-icons/io5'
import { AiOutlineUser, AiOutlineUsergroupAdd } from 'react-icons/ai'
import { companyService } from '../../Service/company.service'
import { loadUserInfo } from '../../redux/UserInfo/Action'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react'
import FileInput from '../FileInput'
import { storage } from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { cvService } from '../../Service/cv.service'

function JobDetail() {
  const [companies, setCompanies] = useState([])
  useEffect(() => {
    companyService.getAllCompany().then((res) => setCompanies(res))
  }, [])

  const accessToken =
    JSON.parse(localStorage.getItem('data')) !== null ? JSON.parse(localStorage.getItem('data')).access_token : null
  //  hàm submit cv
  const submitHandler = async (e) => {
    // if (user.cv_pdf === null) {
    //   toast.info('Hãy tạo CV trong profile trước', {
    //     position: 'top-center',
    //   })
    // } else {
    //   const jobId = e.target.value
    //   try {
    //     const { Data } = await axios.post(`${hostName}/apply-job`, jobId, {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //         'Content-Type': 'application/json',
    //       },
    //     })
    //     toast.success('Apply Job Successfully', {
    //       position: 'top-center',
    //     })
    //   } catch (error) {
    //     toast.error('something went wrong', {
    //       position: 'top-center',
    //     })
    //   }
    // }
  }
  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    window.scroll(0,0)
    dispatch(loadJobDetail(params.id))
    if (accessToken != null) {
      dispatch(loadUserInfo())
    }
  }, [params.id])
  const data = useSelector((store) => store.jobDetail.data)
  const company = companies.filter((item) => item.userId === data.user_id)
  const user = useSelector((store) => store.userInfo.data)

  if (data != null) {
    return (
      <Box mt='100px' fontFamily={'Montserrat'}>
        <Box display='flex' justifyContent='space-evenly'>
          <Box w='850px'>
            <Box
              borderRadius={7}
              ml='50px'
              p='20px'
              boxShadow='rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em'
              color='RGBA(0, 0, 0, 0.76)'>
              <Text fontSize='20px' fontWeight='bold'>
                {data.name}
              </Text>

              <SimpleGrid w='100%' h='80px' mt='50px' mr='10' columns={3} spacing={'10'}>
                <Box>
                  <Image pl='25%' borderRadius='3px' h='80px' src={`${data.image}`} />
                </Box>

                <Box fontSize='15px' justifyItems='center'>
                  <Text display='flex' alignContent='center'>
                    <Box mt='4px' mr='15px' color='RGBA(0, 0, 0, 0.36)'>
                      <IoBriefcaseOutline />
                    </Box>
                    Vị trí :
                    <Text ml={2} fontWeight={'bold'}>
                      {data.position}
                    </Text>
                  </Text>

                  <Text display='flex' alignContent='center'>
                    <Box mt='4px' mr='15px' color='RGBA(0, 0, 0, 0.36)'>
                      <HiOutlineCurrencyDollar />
                    </Box>
                    Mức lương :
                    <Text ml={2} fontWeight={'bold'}>
                      {data.salary}
                    </Text>
                  </Text>
                </Box>

                <Box>
                  <Text display='flex' alignContent='center'>
                    <Box mt='4px' mr='15px' color='RGBA(0, 0, 0, 0.36)'>
                      <IoHourglassOutline />
                    </Box>
                    Kinh Nghiệm :
                    <Text ml={2} fontWeight={'bold'}>
                      {data.experience}
                    </Text>
                  </Text>

                  <Text display='flex' alignContent='center'>
                    <Box mt='4px' mr='15px' color='RGBA(0, 0, 0, 0.36)'>
                      <MdOutlineLocationOn />
                    </Box>
                    Địa điểm:
                    <Text ml={2} fontWeight={'bold'}>
                      {data.location}
                    </Text>
                  </Text>
                </Box>
              </SimpleGrid>

              <Box w='100%' mt='30px' mb='20px'>
                {/* <Button w='100%' value={data.id} onClick={submitHandler}>
                  Apply
                </Button>  */}
                <AlertDialogExample data={data} user={user} jobId={params.id} />
              </Box>
            </Box>

            <Box
              borderRadius={7}
              mb={20}
              mt='30px'
              ml='50px'
              p='20px'
              boxShadow='rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em'
              color='RGBA(0, 0, 0, 0.76)'>
              <Text fontSize='20px' fontWeight='bold'>
                Job description
              </Text>
              <Text width='60%' lineHeight='30px'>
                {data.dis}
              </Text>

              <Box>
                <Text mt='30px' fontSize='18px' fontWeight='bold'>
                  Vị trí
                </Text>
                <Text mb='30px'> {data.position} </Text>
                {data.requirements && (
                  <Fragment>
                    <Text fontSize='18px' fontWeight='bold'>
                      Kỹ năng
                    </Text>
                    <Text mb='30px'>
                      {data.requirements.split('\n').map((item, index) => (
                        <Fragment key={index}>
                          {item}
                          <br />
                        </Fragment>
                      ))}
                    </Text>
                  </Fragment>
                )}

                <Text fontSize='18px' fontWeight='bold'>
                  Địa chỉ Doanh nghiệp
                </Text>
                <Text mb='30px'> {data.detailLocation} </Text>
                {data.interest && (
                  <Fragment>
                    <Text fontSize='18px' fontWeight='bold'>
                      Quyền lợi
                    </Text>
                    <Text mb='30px'>
                      {data.interest.split('\n').map((item, index) => (
                        <Fragment key={index}>
                          {item}
                          <br />
                        </Fragment>
                      ))}
                    </Text>
                  </Fragment>
                )}
                {data.detailJob && (
                  <Fragment>
                    <Text fontWeight='bold' fontSize='18px'>
                      Mô tả công việc
                    </Text>
                    <Text mb='10px'> {data.workingForm} </Text>
                    <Text mb='30px'>
                      {data.detailJob.split('\n').map((item, index) => (
                        <Fragment key={index}>
                          {item}
                          <br />
                        </Fragment>
                      ))}
                    </Text>
                  </Fragment>
                )}
              </Box>
            </Box>
          </Box>
          <Box width='400px' height='400px'>
            <Box
              borderRadius={7}
              p='20px'
              boxShadow='rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em'>
              <Text fontSize='18px' mb='20px' fontWeight='bold'>
                Genaral information
              </Text>
              <Box mb={2}>
                <Text fontSize='15px' fontWeight='bold'>
                  Cấp bậc
                </Text>
                <Text display='flex' alignContent='center'>
                  <Box mt='4px' mr='15px' color='RGBA(0, 0, 0, 0.36)'>
                    <IoMedalOutline />
                  </Box>
                  <Text>{data.position}</Text>
                </Text>
              </Box>

              <Box mb={2}>
                <Text fontSize='15px' fontWeight='bold'>
                  Kinh nghiệm
                </Text>
                <Text display='flex' alignContent='center'>
                  <Box mt='4px' mr='15px' color='RGBA(0, 0, 0, 0.36)'>
                    <IoHourglassOutline />
                  </Box>
                  <Text>{data.experience}</Text>
                </Text>
              </Box>

              <Box mb={2}>
                <Text fontSize='15px' fontWeight='bold'>
                  Số lượng tuyển
                </Text>
                <Text display='flex' alignContent='center'>
                  <Box mt='4px' mr='15px' color='RGBA(0, 0, 0, 0.36)'>
                    <AiOutlineUsergroupAdd />
                  </Box>
                  <Text>{data.number}</Text>
                </Text>
              </Box>

              <Box mb={2}>
                <Text fontSize='15px' fontWeight='bold'>
                  Hình thức làm việc
                </Text>
                <Text display='flex' alignContent='center'>
                  <Box mt='4px' mr='15px' color='RGBA(0, 0, 0, 0.36)'>
                    <IoBriefcaseOutline />
                  </Box>
                  <Text>{data.workingForm}</Text>
                </Text>
              </Box>
              <Box mb={2}>
                <Text fontSize='15px' fontWeight='bold'>
                  Giới tính
                </Text>
                <Text display='flex' alignContent='center'>
                  <Box mt='4px' mr='15px' color='RGBA(0, 0, 0, 0.36)'>
                    <AiOutlineUser />
                  </Box>
                  <Text>{data.sex}</Text>
                </Text>
              </Box>
            </Box>

            <Box
              borderRadius={7}
              p='20px'
              mt='20px'
              boxShadow='rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em'>
              <Text fontSize='18px' mb='20px' fontWeight='bold'>
                Company
              </Text>
              {company[0] && (
                <Fragment>
                  <Image mb={2} src={company[0].avatar} />
                  <Text fontSize='15px' fontWeight='bold'>
                    {company[0].name}
                  </Text>

                  <Text display='flex' textAlign='center'>
                    <Text fontSize='13px' mt='1px' mr='10px'>
                      {company[0].address}
                    </Text>
                    <Text mt='2.5px' color='orange' ml='2px' mr='10px'></Text>
                  </Text>
                  <Text mt='5px' fontWeight='bold' color='blue.500'>
                    <Link href='/ss'>View</Link>
                  </Text>
                </Fragment>
              )}
            </Box>
          </Box>
        </Box>
        <ToastContainer />
      </Box>
    )
  }
}

const AlertDialogExample = ({ data, user, jobId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const fileInputRef = useRef()
  const handleFileButtonClick = () => {
    fileInputRef.current.click()
  }
  const [newCV, setNewCv] = useState(null)
  const [value, setValue] = useState('1')

  const accessToken =
    JSON.parse(localStorage.getItem('data')) !== null ? JSON.parse(localStorage.getItem('data')).access_token : null
  const [waitingUpload, setWaitingUpload] = useState(false)

  const [quickForm, setQuickForm] = useState({
    cv: '',
    jobId: jobId,
  })

  const handleConfirm = async () => {
    onClose()
    if (value === '1') {
      if (user.cv_pdf === null) {
        toast.info('Hãy tạo CV trong profile trước', {
          position: 'top-center',
        })
      } else {
        try {
          const { Data } = await axios.post(`${hostName}/apply-job`, jobId, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          })
          toast.success('Apply Job Successfully', {
            position: 'top-center',
          })
        } catch (error) {
          toast.error('something went wrong', {
            position: 'top-center',
          })
        }
      }
    } else {
      cvService
        .postCVQuick(accessToken, quickForm)
        .then((response) =>
          toast.info(response.message, {
            position: 'top-center',
          })
        )
        .catch((er) => {
          toast.error('Something wrong', {
            position: 'top-center',
          })
          console.log(er)
        })
    }
  }

  const handleUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) {
      toast.error('Please choose a file first')
      return
    }
    const storageRef = ref(storage, `/files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    setWaitingUpload(true)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      },
      (err) => console.log(err),
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref)
          setNewCv(url)
          setQuickForm((prevForm) => ({ ...prevForm, cv: url }))
          toast.success('Uploaded')
          setWaitingUpload(false)
        } catch (error) {
          console.error('Error getting download URL:', error)
          toast.error('Error uploading file')
          setWaitingUpload(false)
        }
      }
    )
  }

  useEffect(() => {}, [jobId])

  return (
    <>
      <Button fontFamily={'Montserrat'} w='100%' onClick={onOpen} value={data.id}>
        Apply
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent fontFamily={'Montserrat'}>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Chose your cv pdf or upload
            </AlertDialogHeader>

            <AlertDialogBody>
              <RadioGroup onChange={setValue} value={value}>
                <Stack direction='column' spacing={4}>
                  <Box>
                    <Radio value='1' size='lg' name='1' disabled={user.cv_pdf === null ? true : false}>
                      recent CV
                    </Radio>
                    <Box w='100%' mt={2}>
                      {user.cv_pdf === null ? (
                        <></>
                      ) : (
                        <Box h={200}>
                          <iframe src={user.cv_pdf} width='100%' height='150px' title='PDF Viewer'></iframe>
                        </Box>
                      )}
                    </Box>
                  </Box>
                  <Box>
                    <Radio value='2' size='lg' name='1'>
                      new cv pdf{' '}
                      <Button onClick={handleFileButtonClick}>
                        {waitingUpload === false ? <>Chose file</> : <>waiting...</>}
                      </Button>
                    </Radio>
                    <Box h={200} mt={30}>
                      {newCV ? (
                        <Box h={200}>
                          <iframe src={newCV} width='100%' height='150px' title='PDF Viewer'></iframe>
                        </Box>
                      ) : (
                        <></>
                      )}
                    </Box>
                    <Input onChange={handleUpload} type='file' ref={fileInputRef} display='none' />
                  </Box>
                </Stack>
              </RadioGroup>
            </AlertDialogBody>

            <AlertDialogFooter maxH={100}>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              {waitingUpload == true ? (
                <Button isLoading colorScheme='teal' onClick={handleConfirm} ml={3}>
                  Confirm
                </Button>
              ) : (
                <Button colorScheme='teal' onClick={handleConfirm} ml={3}>
                  Confirm
                </Button>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default JobDetail
