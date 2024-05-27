import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardBody, FormControl, FormLabel, HStack, Image, Img, Input, Link, Skeleton, Spinner, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text, Textarea, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { companyService } from '../../Service/company.service'
import { UpdateCompany } from './UpdateCompany'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { ToastContainer, toast } from 'react-toastify'
import { storage } from '../../firebase'
import { ManageInterviewer } from '../ManageInterviewer/ManageInterviewer'
import { UserInfo1 } from '../../Components/UserInfo/UserInfo1'
import { UserInfoAdmin } from '../UserAccount/UserInfoAdmin'
import { TransactionHistory } from './TransactionHistory'
import { useParams } from 'react-router-dom'

export const MyCompany = () => {
  const [company, setCompany] = useState()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const params = useParams();

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  useEffect(() => {
    companyService
      .getMyCompany(accessToken)
      .then((res) => setCompany(res))
      .catch((error) => console.log(error.message))
  }, [])

  const handleOnChangeForm = (event) => {
    const { name, value } = event.target
    setCompany((prevForm) => ({ ...prevForm, [name]: value }))
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    if (!file) {
      toast.error('Please choose a file first')
      return
    } else {
      const storageRef = ref(storage, `/files/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)
      await uploadTask.on(
        'state_changed',
        (snapshot) => {
          setLoading(true)
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setLoading(false)
            setCompany((prevCompany) => {
              return { ...prevCompany, avatar: url }
            })
            toast.success('image to fire base')
          })
        }
      )
    }
  }

  const openFileUpload = () => {
    const fileUpload = document.getElementById('file-upload')
    fileUpload.click()
  }

  const handeUpdateCompany = async () => {
    if (!company.name || !company.website || !company.address || !company.phone || !company.info) {
      toast.error('Please fill in all required fields')
      return
    }
    setUploading(true)
    await companyService
      .updateCompany(accessToken, company)
      .then((response) => {
        toast.info(response.message)
        setUploading(false)
      })
      .catch((er) => console.log(er.message))
  }

  if (company === undefined) {
    return (
      <>
        <Box fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'} p={30} overflow='hidden'>
          <VStack spacing={3}>
            <Box p={'20%'} borderRadius={20} backgroundColor={'#FFFFFF'} w={'100%'} mb={10}>
              <Skeleton>
                <div>contents wrapped</div>
                <div>won't be visible</div>
              </Skeleton>
            </Box>
          </VStack>
        </Box>
      </>
    )
  } else
    return (
      <>
        <Box minHeight={1000} fontFamily={'Montserrat'} backgroundColor={'#e9f3f5'} overflow='hidden'>
          <ToastContainer position='bottom-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />

          <Breadcrumb pt={30}>
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Công ty của tôi</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <VStack mb={10} pl={30} pr={30} spacing={3}>
            <Box w={'100%'}>
              <Card>
                <CardBody>
                  <Tabs defaultIndex={params.tab ? params.tab : 0} position='relative' variant='unstyled'>
                    <TabList fontWeight={'bold'}>
                      <Tab>Thông tin cơ bản</Tab>
                      <Tab>Thông tin cá nhân</Tab>
                      <Tab>Đội ngủ tuyển dụng</Tab>
                      <Tab>Lịch sử giao dịch</Tab>
                      <Tab>Lịch sử hoạt động</Tab>
                    </TabList>
                    <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />
                    <TabPanels>
                      <TabPanel>
                        <Box>
                          <FormControl>
                            <FormLabel>Ảnh đại diện</FormLabel>
                            {loading ? <Spinner size='xl' /> : <Img w={200} alt='Choose img' borderRadius={20} src={company.avatar} onClick={openFileUpload} />}
                            <input id='file-upload' type='file' accept='image/*' onChange={handleFileChange} style={{ display: 'none' }} />
                          </FormControl>
                          <HStack mt={3}>
                            <FormControl>
                              <FormLabel>Tên công ty</FormLabel>
                              <Input onChange={handleOnChangeForm} name='name' value={company.name} placeholder='company name' />
                            </FormControl>
                            <FormControl>
                              <FormLabel>Website</FormLabel>
                              <Input onChange={handleOnChangeForm} name='website' value={company.website} placeholder='website' />
                            </FormControl>
                          </HStack>
                          <FormControl>
                            <FormLabel>Địa chỉ</FormLabel>
                            <Textarea onChange={handleOnChangeForm} name='address' value={company.address} placeholder='address' />
                          </FormControl>
                          <FormControl>
                            <FormLabel>Số điện thoại</FormLabel>
                            <Input onChange={handleOnChangeForm} name='phone' value={company.phone} placeholder='phone' />
                          </FormControl>
                          <FormControl>
                            <FormLabel>Thông tin chi tiết</FormLabel>
                            <Textarea onChange={handleOnChangeForm} name='info' value={company.info} placeholder='info' />
                          </FormControl>

                          <Button mt={5} w={'20%'} onClick={handeUpdateCompany} color={'#ffffff'} backgroundColor='rgb(3, 201, 215)'>
                            {uploading ? <Spinner /> : 'Save'}
                          </Button>
                        </Box>
                      </TabPanel>
                      <TabPanel>
                        <UserInfoAdmin />
                      </TabPanel>

                      <TabPanel>
                        <ManageInterviewer />
                      </TabPanel>
                      <TabPanel>
                        {/* ls giao dich */}
                        <TransactionHistory/>
                      </TabPanel>
                      <TabPanel>
                        <p>threqqe!</p>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </CardBody>
              </Card>
            </Box>
          </VStack>
        </Box>
      </>
    )
}
