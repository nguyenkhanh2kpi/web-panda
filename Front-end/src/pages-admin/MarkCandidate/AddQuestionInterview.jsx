import React, { useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Button,
  Input,
  Text,
  Box,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,
  VStack,
} from '@chakra-ui/react'
import { questionService } from '../../Service/question.service'
import { skillPositionService } from '../../Service/skillPosition.service'

export const AddQuestionInterview = ({ field, onAddClick }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [questions, setQuestion] = useState([])
  const [skills, setSkill] = useState([])
  const [selectedSkill, setSelectSkill] = useState(0)
  const [isFilter, setISFilter] = useState(false)
  const [filterQuestions, setFilterQuestion] = useState([])
  const [keyword, setKeword] = useState('')
  const handleType = (e) => {
    setKeword(e.target.value)
    setISFilter(false)
  }

  useEffect(() => {
    if (keyword === '') {
      questionService
        .getQuestionByField(accessToken, field)
        .then((res) => setQuestion(res))
        .catch((er) => console.log(er.message))
    } else {
      setQuestion(searchQuestionsByKeyword(keyword))
    }
  }, [keyword])

  useEffect(() => {
    questionService
      .getQuestionByField(accessToken, field)
      .then((res) => setQuestion(res))
      .catch((er) => console.log(er.message))
    skillPositionService.getSkill(accessToken).then((res) => setSkill(res))
  }, [])

  useEffect(() => {
    questionService.getQuestionBySkill(accessToken, selectedSkill).then((res) => {
      if (field === 'SoftSkill') {
        setFilterQuestion(res[0].questions)
      }
      if (field === 'TechSkill') {
        setFilterQuestion(res[1].questions)
      }
      if (field === 'Language') {
        setFilterQuestion(res[2].questions)
      }
      if (selectedSkill != 0) {
        setISFilter(true)
      } else {
        setISFilter(false)
      }
    })
  }, [selectedSkill])

  const handleSelectChange = (event) => {
    const value = event.target.value
    setSelectSkill(value)
  }

  const searchQuestionsByKeyword = (keyword) => {
    const lowerCaseKeyword = keyword.toLowerCase()
    const filteredQuestions = questions.filter((question) => {
      return question.question.toLowerCase().includes(lowerCaseKeyword)
    })
    return filteredQuestions
  }

  const [marks, setMarks] = useState({})

  const handleMarkChange = (valueString, questionId) => {
    const value = parseInt(valueString, 10)
    setMarks((prevMarks) => ({
      ...prevMarks,
      [questionId]: value,
    }))
  }

  const onAddClickWithMark = (question) => {
    const mark = marks[question.id] || 0
    onAddClick(question.id, question.question, mark, field === 'SoftSkill' ? 'softSkill' : field === 'TechSkill' ? 'technical' : 'english')
  }

  return (
    <>
      <Button color={'#ffffff'} backgroundColor={'rgb(3, 201, 215)'} w={'16%'} colorScheme='teal' onClick={onOpen}>
        + {field}
      </Button>

      <AlertDialog size={'4xl'} isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontFamily={'Montserrat'} fontSize='lg' fontWeight='bold'>
              Tìm câu hỏi
            </AlertDialogHeader>

            <AlertDialogBody style={{ maxHeight: '500px', overflowY: 'auto', fontFamily: 'Montserrat' }}>
              <HStack>
                <Input onChange={handleType} value={keyword} placeholder='Search' size='md' />
                <Select defaultValue={0} onChange={handleSelectChange} w={'100%'}>
                  <option value={0}>---</option>
                  {skills.map((skill) => (
                    <option value={skill.id}>{skill.skillName}</option>
                  ))}
                </Select>
              </HStack>

              {isFilter
                ? filterQuestions.map((question) => (
                    <Box p={1} borderRadius={4} mt={1} borderWidth={1}>
                      <HStack w={'100%'}>
                        <Text w={'70%'} m={3}>
                          {question.question}
                        </Text>
                        <HStack w={'30%'}>
                          <NumberInput defaultValue={0} min={0} max={10} name={`mark-${question.id}`} onChange={(valueString) => handleMarkChange(valueString, question.id)}>
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                          <Button onClick={() => onAddClickWithMark(question)} w={'100%'}>
                            +
                          </Button>
                        </HStack>
                      </HStack>
                    </Box>
                  ))
                : questions.map((question) => (
                    <Box p={1} borderRadius={4} mt={1} borderWidth={1}>
                      <HStack w={'100%'} justifyContent={'space-between'}>
                        <Text m={3}>{question.question}</Text>
                        <HStack>
                          <NumberInput defaultValue={0} min={0} max={10} name={`mark-${question.id}`} onChange={(valueString) => handleMarkChange(valueString, question.id)}>
                            <NumberInputField />
                            <NumberInputStepper>
                              <NumberIncrementStepper />
                              <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                          <Button w={'100%'} onClick={() => onAddClickWithMark(question)}>
                            +
                          </Button>
                        </HStack>
                      </HStack>
                    </Box>
                  ))}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
