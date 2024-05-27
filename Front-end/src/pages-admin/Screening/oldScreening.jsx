// import React, { useEffect, useState } from 'react'
// import {
//   Box,
//   Button,
//   Image,
//   Skeleton,
//   Spinner,
//   Text,
//   VStack,
//   HStack,
//   IconButton,
//   Accordion,
//   AccordionItem,
//   AccordionButton,
//   AccordionIcon,
//   AccordionPanel,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalCloseButton,
//   ModalBody,
//   FormControl,
//   Input,
//   FormLabel,
//   useDisclosure,
//   Checkbox,
//   ModalFooter,
// } from '@chakra-ui/react'
// import { loadJob } from '../../redux/Job-posting/Action'
// import { useNavigate, useParams } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { AiFillPlusCircle, AiOutlineProfile } from 'react-icons/ai'
// import { AiOutlineQuestionCircle } from 'react-icons/ai'
// import { Tooltip } from '@chakra-ui/react'
// import { testService } from '../../Service/test.service'
// import { AiOutlineEdit } from 'react-icons/ai'
// import { ToastContainer, toast } from 'react-toastify'

// const Screening = () => {
//   const params = useParams()
//   const navigate = useNavigate()
//   const accessToken = JSON.parse(localStorage.getItem('data')).access_token
//   const [load, setLoad] = useState(false)
//   const jobData = useSelector((store) => store.job.data)
//   const userId = JSON.parse(localStorage.getItem('data')).data.userInfo.id
//   const dispatch = useDispatch()
//   useEffect(() => {
//     dispatch(loadJob())
//   }, [])
//   useEffect(() => {
//     window.scrollTo(0, 0)
//   }, [load])
//   return (
//     <Box minHeight={2000} overflow='auto' fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'} p={30}>
//       <VStack spacing={3}>
//         <Box
//           boxShadow={'lg'}
//           minHeight={1000}
//           overflow='auto'
//           p={'3%'}
//           borderRadius={20}
//           backgroundColor={'#FFFFFF'}
//           w={'100%'}
//           mb={10}>
//           <Accordion allowToggle>
//             {jobData.map((job) => {
//               return job.status === true && job.user_id === userId ? (
//                 <>
//                   <AccordionItem>
//                     <h2>
//                       <AccordionButton>
//                         <AccordionIcon />
//                         <JobItem job={job} />
//                       </AccordionButton>
//                     </h2>
//                     <AccordionPanel pb={4}>
//                       <TestItemByJob jobId={job.id} load={load} setLoad={setLoad} />
//                       <AddTestForm jobId={job.id} load={load} setLoad={setLoad} />
//                     </AccordionPanel>
//                   </AccordionItem>
//                 </>
//               ) : (
//                 <></>
//               )
//             })}
//           </Accordion>
//         </Box>
//       </VStack>
//       <ToastContainer
//         position='bottom-right'
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme='light'
//       />
//     </Box>
//   )
// }
// export default Screening

// const JobItem = ({ job }) => {
//   const navigate = useNavigate()
//   return (
//     <Box p={5} w={'100%'} m={5}>
//       <HStack>
//         <Box pl={30} w={'100%'}>
//           <Text>{job.name}</Text>
//           <Text>Create Date: {job.createDate}</Text>
//           <Text>No: {job.number}</Text>
//         </Box>
//       </HStack>
//     </Box>
//   )
// }

// const TestItemByJob = ({ jobId, load, setLoad }) => {
//   const accessToken = JSON.parse(localStorage.getItem('data')).access_token
//   const [tests, SetTests] = useState({})
//   useEffect(() => {
//     testService
//       .getTestByjd(accessToken, jobId)
//       .then((response) => SetTests(response))
//       .catch((er) => console.log(er))
//   }, [load])
//   return (
//     <>
//       {tests.length > 0 ? (
//         tests.map((test) => <TestItem test={test} jobId={jobId} load={load} setLoad={setLoad} />)
//       ) : (
//         <></>
//       )}
//     </>
//   )
// }

// const TestItem = ({ test, jobId, load, setLoad }) => {
//   const navigate = useNavigate()
//   return (
//     <Box boxShadow={'md'} borderRadius={10} borderWidth={1} p={5} w={'100%'}>
//       <HStack>
//         <VStack>
//           <Tooltip label='edit' aria-label='A tooltip'>
//             {/* <AddTestForm jobId={jobId} load={load} setLoad={setLoad} /> */}
//             <IconButton
//               onClick={() => navigate(`/screening-test/${test.id}`)}
//               aria-label='Search database'
//               icon={<AiOutlineEdit />}
//             />
//           </Tooltip>
//         </VStack>
//         <Box pl={30} w={'100%'}>
//           <Text>{test.summary}</Text>
//           <Text>Startime: {test.startTime}</Text>
//           <Text>Endtime: {test.endTime}</Text>
//         </Box>
//       </HStack>
//     </Box>
//   )
// }

// const AddTestForm = ({ jobId, load, setLoad }) => {
//   const accessToken = JSON.parse(localStorage.getItem('data')).access_token
//   const { isOpen, onOpen, onClose } = useDisclosure()

//   const [form, setForm] = useState({
//     jdId: jobId,
//     summary: '',
//     startTime: '',
//     endTime: '',
//   })

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setForm({
//       ...form,
//       [name]: value,
//     })
//   }
//   const isValidTimeFormat = (time) => {
//     const timeRegex = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]$/
//     return timeRegex.test(time)
//   }

//   const validateForm = () => {
//     if (!form.summary) {
//       toast.error('Summary is required')
//       return false
//     }

//     if (!form.startTime) {
//       toast.error('Start time is required')
//       return false
//     }

//     if (!form.endTime) {
//       toast.error('End time is required')
//       return false
//     }

//     return true
//   }
//   const handleSubmit = () => {
//     if (validateForm()) {
//       testService
//         .addTest(accessToken, form)
//         .then((response) => {
//           toast.info(response.message)
//           onClose()
//           setLoad(!load)
//         })
//         .catch((er) => console.log(er))
//     }
//   }

//   return (
//     <>
//       <Button onClick={onOpen} ml={30} borderRadius={10} mt={10} color='white' backgroundColor='rgb(3, 201, 215)'>
//         Add a test with this job
//       </Button>

//       <Modal size={'2xl'} isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Add Test</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <FormControl>
//               <FormLabel>JD ID</FormLabel>
//               <Input type='number' name='jdId' value={form.jdId} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Summary</FormLabel>
//               <Input type='text' name='summary' value={form.summary} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>Start Time</FormLabel>
//               <Input type='datetime-local' name='startTime' value={form.startTime} onChange={handleChange} />
//             </FormControl>
//             <FormControl>
//               <FormLabel>End Time</FormLabel>
//               <Input type='datetime-local' name='endTime' value={form.endTime} onChange={handleChange} />
//             </FormControl>
//           </ModalBody>

//           <ModalFooter>
//             <Button onClick={handleSubmit} colorScheme='blue' mr={3}>
//               Save
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   )
// }
