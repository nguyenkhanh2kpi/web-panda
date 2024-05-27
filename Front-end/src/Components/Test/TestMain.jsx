import { Box, CardHeader, Heading, Container, FormControl, VStack, FormErrorMessage, FormLabel, SlideFade, Stack, Input, HStack, CardBody, Card, Text, Radio, RadioGroup, StackDivider, Button } from '@chakra-ui/react'
import { useField } from 'formik'
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import './test.css'
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton, useDisclosure } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { testService } from '../../Service/test.service'
import { toast } from 'react-toastify'

export const TestMain = () => {
  const { id } = useParams()
  const [test, setTest] = useState(null)
  const [start, setStart] = useState(false)
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token

  useEffect(() => {
    testService
      .getATest(accessToken, id)
      .then((response) => {
        setTest(response)
      })
      .catch((error) => console.error(error))
  }, [])

  const isTestStarted = () => {
    if (test && test.startTime) {
      const startTime = new Date(test.startTime).getTime()
      const currentTime = new Date().getTime()
      return currentTime >= startTime
    }
    return false
  }

  const isNotEnded = () => {
    if (test && test.endTime) {
      const endTime = new Date(test.endTime).getTime()
      const currentTime = new Date().getTime()
      return currentTime <= endTime
    }
  }

  return (
    <>
      <VStack h={1300} fontFamily={'Montserrat'} fontWeight={400} mb={20}>
        <SlideFade in={true} offsetY={20}>
          <Heading size={'lg'} m={'6'} mt={24} ml={2} textAlign={'left'} marginRight='auto'></Heading>
          <Stack direction='row' spacing={4}></Stack>
        </SlideFade>
        <HStack align={'flex-start'} w={'60vw'} m={5} p={5}>
          {test != null ? (
            test.record === false ? (
              isTestStarted() && isNotEnded() ? (
                start === true ? (
                  <></>
                ) : (
                  <Button w={'100%'} size='lg' colorScheme='teal' onClick={() => setStart(true)}>
                    Start taking the test
                  </Button>
                )
              ) : (
                <Button w={'100%'}>You are not in available time</Button>
              )
            ) : (
              <Button w={'100%'}>The test cannot be retaken</Button>
            )
          ) : (
            <Button w={'100%'}>Loading...</Button>
          )}

          {start ? <DoTest test={test} /> : <></>}
        </HStack>
      </VStack>
    </>
  )
}

function AlertDialogExample({ onConfirm }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  return (
    <>
      <Button onClick={onOpen}>Sunmit</Button>
      <AlertDialog motionPreset='slideInBottom' leastDestructiveRef={cancelRef} onClose={onClose} isOpen={isOpen} isCentered>
        <AlertDialogOverlay />

        <AlertDialogContent h={'50px'}>
          <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              onClick={() => {
                onConfirm()
                onClose()
              }}
              colorScheme='red'
              ml={3}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

const DoTest = ({ test }) => {
  const [selectedOptions, setSelectedOptions] = useState({})
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const navigate = useNavigate()
  const handleOptionChange = (questionId, optionId) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionId]: optionId,
    }))
  }
  const isOptionChecked = (questionId, optionId) => {
    return selectedOptions[questionId] === optionId
  }
  //// panigate

  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 3

  const pageCount = Math.ceil(test.questions.length / itemsPerPage)
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected)
  }

  const displayQuestion = test.questions.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  ///
  const calculateTimeLeft = () => {
    const endTime = new Date(test.endTime).getTime()
    const now = new Date().getTime()
    const timeDifference = endTime - now
    const secondsLeft = Math.floor(timeDifference / 1000)
    return secondsLeft
  }

  const initialSeconds = calculateTimeLeft()
  const [minutes, setMinutes] = useState(Math.floor(initialSeconds / 60))
  const [seconds, setSeconds] = useState(initialSeconds % 60)

  useEffect(() => {
    const timer = setInterval(() => {
      const secondsLeft = calculateTimeLeft()
      setSeconds(secondsLeft % 60)
      setMinutes(Math.floor(secondsLeft / 60))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  ///submit
  const handleConfirm = () => {
    const form = {
      id: 1,
      testId: test.id,
      score: calculateScore(),
      record: JSON.stringify(selectedOptions),
    }
    testService
      .record(accessToken, form)
      .then((reponse) => navigate('/test'))
      .catch((error) => console.log(error))
  }

  const calculateScore = () => {
    let score = 0
    const selectedOptionsArray = convertObjectToArray(selectedOptions)
    selectedOptionsArray.forEach((selected) => {
      const question = test.questions.find((question) => question.id.toString() === selected.questionId)
      question.options.map((o) => {
        if (o.answer && o.optionText === selected.selectedOptionText) {
          score++
        }
      })
    })
    return score
  }

  function convertObjectToArray(selectedOptions) {
    return Object.entries(selectedOptions).map(([questionId, selectedOptionText]) => ({
      questionId,
      selectedOptionText,
    }))
  }

  //

  ///

  return (
    <div className='cv' style={{ width: '1000px' }}>
      <HStack alignItems='flex-start'>
        <div className='page' style={{ fontFamily: 'Montserrat', padding: '20px' }}>
          <div>
            <HStack w={'100%'} justifyContent='space-between'>
              <Text>Test: {test.summary}</Text>
              <Text>
                Page: {currentPage + 1}/{pageCount}
              </Text>
            </HStack>
          </div>
          <div>
            {displayQuestion.map((question, index) => (
              <Card key={question.id} fontFamily='Montserrat' mt={2}>
                <CardHeader>
                  <Heading fontSize={16} size='m'>
                    Question: {question.questionText}
                  </Heading>
                </CardHeader>
                <CardBody>
                  <ul>
                    <RadioGroup value={selectedOptions[question.id]} onChange={(value) => handleOptionChange(question.id, value)}>
                      <Stack>
                        {question.options.map((option) => (
                          <Radio fontSize={15} key={option.id} value={option.optionText} isChecked={isOptionChecked(question.id, option.id)}>
                            {option.optionText}
                          </Radio>
                        ))}
                      </Stack>
                    </RadioGroup>
                  </ul>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
        <VStack>
          <Box h={'100%'} p={2} borderWidth={1}>
            <VStack>
              <ReactPaginate
                className='question-panigate1'
                pageCount={pageCount}
                onPageChange={handlePageChange}
                previousLabel='prev'
                nextLabel='next'
                breakLabel='...'
                breakClassName='page-item1'
                breakLinkClassName='page-link1'
                containerClassName='pagination'
                pageClassName='page-item1'
                pageLinkClassName='page-link'
                previousClassName='before'
                nextClassName='next'
                previousLinkClassName='page-link'
                nextLinkClassName='page-link'
                activeClassName='active'
              />
              <VStack>
                <div
                  style={{
                    fontFamily: 'Arial',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: 'black',
                  }}>
                  {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>
              </VStack>
            </VStack>
          </Box>
          <AlertDialogExample onConfirm={handleConfirm} />
        </VStack>
      </HStack>
    </div>
  )
}
