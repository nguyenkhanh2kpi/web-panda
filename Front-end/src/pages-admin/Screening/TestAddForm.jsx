import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Image,
  Skeleton,
  Spinner,
  Text,
  VStack,
  HStack,
  IconButton,
  Divider,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Checkbox,
  Textarea,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { AiFillDelete, AiFillPlusCircle, AiOutlineEdit, AiOutlineFileExcel, AiOutlineProfile, AiOutlineUpload, AiTwotonePlusSquare } from 'react-icons/ai'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { Tooltip } from '@chakra-ui/react'
import { testService } from '../../Service/test.service'
import { ToastContainer, toast } from 'react-toastify'
import { load } from '@syncfusion/ej2-react-charts'
import { ImportExcel } from './ImportExcel'

const TestAddForm = () => {
  const [load, setLoad] = useState(false)
  const { id } = useParams()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [test, setTest] = useState(null)
  useEffect(() => {
    testService
      .getATest(accessToken, id)
      .then((response) => setTest(response))
      .catch((er) => console.log(er))
  }, [load])

  return (
    <>
      {test ? (
        <>
          <Box spacing={3} h={1100} fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'} overflow='hidden'>
            <HStack justifyContent={'space-between'} w={'100%'}>
              <Breadcrumb pt={30}>
                <BreadcrumbItem>
                  <BreadcrumbLink href='/process'>Chiến dịch tuyển dụng</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`#`}>Job</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href='#'>Kiểm tra</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </HStack>
            <VStack pl={30} pr={30}>
              <Box h={1000} borderRadius={20} backgroundColor={'#e9f3f5'} w={'100%'} mb={10}>
                <HStack alignItems={'flex-start'} w={'100%'}>
                  <VStack w={'20%'}>
                    <Box backgroundColor={'#ffffff'} borderRadius={5} pl={4} alignContent={'center'} h={50} overflow={'hidden'} fontWeight={'bold'} fontSize={14} boxShadow={'lg'} w={'100%'}>
                      Số câu hỏi: {test.questions.length}
                    </Box>
                    <Box backgroundColor={'#ffffff'} borderRadius={5} pl={4} alignContent={'center'} h={50} overflow={'hidden'} fontWeight={'bold'} fontSize={14} boxShadow={'lg'} w={'100%'}>
                      Thời gian làm bài:{test.time}
                    </Box>
                    <ImportExcel testID={test.id} load={load} setLoad={setLoad} />
                  </VStack>

                  <Box backgroundColor={'#ffffff'} borderRadius={5} borderWidth={1} boxShadow={'lg'} w={'80%'}>
                    <Box h={840} overflowY='auto' mt={30} mb={30} w={'100%'}>
                      {test.questions.length > 0 ? test.questions.map((question) => <QuestionItem setLoad={setLoad} load={load} key={question.id} question={question} testId={test.id} />) : <QuestionItem setLoad={setLoad} load={load} question={null} testId={test.id} />}
                    </Box>
                  </Box>
                </HStack>
              </Box>
            </VStack>
          </Box>
          <ToastContainer position='bottom-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />
        </>
      ) : (
        <></>
      )}
    </>
  )
}
export default TestAddForm

const QuestionItem = ({ question, testId, load, setLoad }) => {
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token

  const handleDelete = (questionId) => {
    testService
      .deleteQuestion(accessToken, questionId)
      .then((response) => {
        // toast.info(response.message)
        setLoad(!load)
      })
      .catch((er) => {
        console.log(er)
        toast.error('Something went wrong')
      })
  }
  return (
    <>
      {question ? (
        <>
          <HStack>
            <Box fontSize={14} w={'80%'} m={2} borderRadius={10} ml={50}>
              <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Question: {question.questionText}</Text>
              {question.options.map((option, index) => (
                <Text
                  key={option.optionText}
                  style={{
                    marginLeft: 20,
                    marginVertical: 5,
                    fontWeight: option.answer ? 'bold' : 'normal',
                  }}>
                  {option.optionText}
                </Text>
              ))}
            </Box>
            <VStack>
              <AddQuestionModel load={load} setLoad={setLoad} testId={testId} />
              <IconButton ml={10} onClick={() => handleDelete(question.id)} icon={<AiFillDelete />} />
            </VStack>
          </HStack>
        </>
      ) : (
        <>
          <AddQuestionModel load={load} setLoad={setLoad} testId={testId} />
        </>
      )}
    </>
  )
}

const AddQuestionModel = ({ testId, setLoad, load }) => {
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [text, setText] = useState('')
  const [options, setOptions] = useState([])
  const [correctIndex, setCorrectIndex] = useState(null)
  const [form, setForm] = useState({
    questionText: '',
    testId: testId,
    options: [
      {
        optionText: '',
        answer: true,
      },
      {
        optionText: '',
        answer: false,
      },
      {
        optionText: '',
        answer: false,
      },
    ],
  })

  const handleAddOption = () => {
    setOptions([...options, { text: '' }])
  }

  const handleSelectCorrect = (index) => {
    setCorrectIndex(index)
  }
  const handleRemove = (indexToRemove) => {
    setOptions(options.filter((_, index) => index !== indexToRemove))
  }

  const handleSave = () => {
    const updatedOptions = options.map((option, index) => ({
      optionText: document.querySelector(`input[name="option-${index}"]`).value,
      answer: index === correctIndex,
    }))
    const updatedForm = {
      ...form,
      questionText: text,
      options: updatedOptions,
    }

    testService
      .addQuestion(accessToken, updatedForm)
      .then((response) => {
        toast.success(response.message)
        setLoad(!load)
        onClose()
      })
      .catch((er) => {
        console.log(er)
        toast.error('Something went wrong')
      })
  }
  const handleTextChange = (event) => {
    setText(event.target.value)
    setForm({
      ...form,
      questionText: event.target.value,
    })
  }

  return (
    <>
      <IconButton ml={10} onClick={onOpen} aria-label='Search database' icon={<AiFillPlusCircle />} />

      <Modal size={'2xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent fontFamily={'Montserrat'}>
          <ModalHeader>Add Question</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Text</FormLabel>
              <Textarea value={text} type='text' name='text' onChange={handleTextChange} />
              <FormLabel>Options</FormLabel>
              {options.map((option, index) => (
                <HStack key={index}>
                  <Input m={2} type='title' name={`option-${index}`} />
                  <Checkbox isChecked={correctIndex === index} onChange={() => handleSelectCorrect(index)}></Checkbox>
                  <Button onClick={() => handleRemove(index)}>x</Button>
                </HStack>
              ))}

              <Button onClick={handleAddOption}>+</Button>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSave} colorScheme='blue' mr={3}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
