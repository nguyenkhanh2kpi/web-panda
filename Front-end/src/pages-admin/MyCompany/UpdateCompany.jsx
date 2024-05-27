import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Button, useDisclosure, Img, Textarea, Spinner } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { storage } from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { companyService } from '../../Service/company.service'

export const UpdateCompany = ({ data }) => {
  const [company, setCompany] = useState(data)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

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

  return (
    <>
      <Button fontFamily={'Montserrat'} fontWeight={400} onClick={onOpen} mt={4} w='200px' size='lg' color='#ffffff' backgroundColor='rgb(3, 201, 215)' variant='solid'>
        Edit
      </Button>
      <ToastContainer position='bottom-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />

      <Modal size={'2xl'} initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent fontFamily={'Montserrat'} fontWeight={400}>
          <ModalHeader>Update your company</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Company name</FormLabel>
              <Input onChange={handleOnChangeForm} name='name' value={company.name} placeholder='company name' />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Website</FormLabel>
              <Input onChange={handleOnChangeForm} name='website' value={company.website} placeholder='website' />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Address</FormLabel>
              <Textarea onChange={handleOnChangeForm} name='address' value={company.address} placeholder='address' />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Phone</FormLabel>
              <Input onChange={handleOnChangeForm} name='phone' value={company.phone} placeholder='phone' />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Info</FormLabel>
              <Textarea onChange={handleOnChangeForm} name='info' value={company.info} placeholder='info' />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Avatar</FormLabel>
              {loading ? <Spinner size='xl' /> : <Img alt='Choose img' borderRadius={20} src={company.avatar} onClick={openFileUpload} />}
              <input id='file-upload' type='file' accept='image/*' onChange={handleFileChange} style={{ display: 'none' }} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handeUpdateCompany} color={'#ffffff'} backgroundColor='rgb(3, 201, 215)' mr={3}>
              {uploading ? <Spinner /> : 'Save'}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
