import { ChatIcon, DragHandleIcon, EmailIcon, PhoneIcon, SearchIcon, ViewIcon } from '@chakra-ui/icons'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  HStack,
  Box,
  VStack,
  Avatar,
  Text,
  Select,
  Link,
  Card,
  CardHeader,
  Flex,
  CardFooter,
  Heading,
  CardBody,
  CheckboxGroup,
  Stack,
  Checkbox,
  useToast,
  Tr,
  Td,
  List,
  ListItem,
  ListIcon,
  Badge,
} from '@chakra-ui/react'
import { cvService } from '../../Service/cv.service'
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns'
import { useEffect, useState } from 'react'
import { labelService } from '../../Service/label.service'
import ChatWindow from '../MessageAdmin/ChatWindow'

const State = {
  RECEIVE_CV: 'Tiếp nhận CV',
  SUITABLE: 'Phù hợp yêu cầu',
  SCHEDULE_INTERVIEW: 'Lên lịch phỏng vấn',
  SEND_PROPOSAL: 'Gửi đề nghị',
  ACCEPT: 'Nhận việc',
  REJECT: 'Từ chối',
}
const State1 = {
  RECEIVE_CV: { displayName: 'Tiếp nhận CV', colorScheme: 'blue' },
  SUITABLE: { displayName: 'Phù hợp yêu cầu', colorScheme: 'green' },
  SCHEDULE_INTERVIEW: { displayName: 'Lên lịch phỏng vấn', colorScheme: 'orange' },
  SEND_PROPOSAL: { displayName: 'Gửi đề nghị', colorScheme: 'purple' },
  ACCEPT: { displayName: 'Nhận việc', colorScheme: 'teal' },
  REJECT: { displayName: 'Từ chối', colorScheme: 'red' },
}

export const CandidateDetailInProces = ({ candidate, load, setLoad }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [labels, setLabels] = useState([])
  const toast = useToast()
  const [cv, setCV] = useState({})
  const [checkedLabels, setCheckedLabels] = useState({})

  useEffect(() => {
    labelService
      .getMyLabel(accessToken)
      .then((response) => setLabels(response))
      .catch((er) => console.log(er))
  }, [])

  const onChangeStatus = (event) => {
    const status = event.target.value
    handleOnChangeStatus({ cvId: candidate.cvId, status })
  }
  const handleOnChangeStatus = ({ cvId, status }) => {
    cvService
      .updateStatus(accessToken, cvId, status)
      .then((response) => {
        toast({ description: response.message })
        // setLoad(!load)
      })
      .catch((er) => console.log(er))
  }
  useEffect(() => {
    cvService
      .getCVById(accessToken, candidate.cvId)
      .then((response) => {
        setCV(response.data[0])
        setCheckedLabels(JSON.parse(response.data[0].labels))
      })
      .catch((er) => console.log(er))
  }, [load])

  // label

  const handleCheckboxChange = (labelId) => {
    setCheckedLabels((prevCheckedLabels) => ({
      ...prevCheckedLabels,
      [labelId]: !prevCheckedLabels[labelId],
    }))
  }
  useEffect(() => {
    const checkedLabelIds = Object.keys(checkedLabels).filter((labelId) => checkedLabels[labelId])
    if (checkedLabelIds.length > 0 && labels.length > 0) {
      console.log('checked lanle', JSON.stringify(checkedLabels))
      cvService
        .updateLabel(accessToken, candidate.cvId, JSON.stringify(checkedLabels))
        .then((response) => console.log('chel', response))
        .catch((er) => console.log(er))
    }
  }, [checkedLabels])

  // view
  const handleChangeView = () => {
    cvService
      .updateView(accessToken, candidate.cvId, !candidate.view)
      .then((response) => console.log(response))
      .catch((er) => console.log(er))
      .finally()
  }
  const handleClose = () => {
    setLoad(!load)
    onClose()
  }

  // chat
  const [isChatOpen, setIsChatOpen] = useState(false)
  const toggleChatWindow = () => {
    setIsChatOpen(!isChatOpen)
  }

  return (
    <>
      <Tr>
        <Td>
          <Flex spacing='4'>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
              <Avatar src={candidate.avatar} />
              <Box>
                <Heading size='sm'>{candidate.fullName}</Heading>
                <Text>{candidate.view ? <Badge colorScheme='green'>Đã xem</Badge> : <Badge>Chưa xem</Badge>}</Text>
              </Box>
            </Flex>
          </Flex>
        </Td>
        <Td>
          <IconButton onClick={onOpen} icon={<SearchIcon />} />
        </Td>
        <Td>
          <List p={0} m={0}>
            <ListItem>
              <ListIcon as={EmailIcon} color='green.500' />
              {candidate.email}
            </ListItem>
            <ListItem>
              <ListIcon as={PhoneIcon} color='green.500' />
              {candidate.phone}
            </ListItem>
            <ListItem>
              <ListIcon as={ChatIcon} color='green.500' />
              <Button size='xs' onClick={toggleChatWindow}>
                Chat với ứng viên
              </Button>
              {isChatOpen && <ChatWindow onClose={toggleChatWindow} email={candidate.email} />}
            </ListItem>
          </List>
        </Td>
        <Td>{candidate.applyDate}</Td>
        <Td>
          <Badge colorScheme={State1[candidate.cvStatus].colorScheme}>{State1[candidate.cvStatus].displayName}</Badge>
        </Td>
      </Tr>

      <Modal size={'6xl'} isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent fontFamily={'Montserrat'} fontWeight={400}>
          <ModalHeader>Chi tiết ứng viên: {candidate.fullName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack align={'flex-start'} w={'100%'}>
              <Box h={700} w='60%'>
                <iframe src={candidate.cv} width='100%' height='100%' style={{ border: 'none' }} title='Candidate CV' />
              </Box>
              <VStack w={'40%'}>
                <Card w={'100%'} maxW='md'>
                  <CardHeader>
                    <Flex spacing='4'>
                      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar src={candidate.avatar} />
                        <Box>
                          <Heading size='sm'>{candidate.fullName}</Heading>
                          <Text>{candidate.email}</Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <Heading size='sm'>Trạng thái</Heading>
                    <HStack alignItems='center' justifyContent='space-between'>
                      <Select onChange={onChangeStatus} w={'50%'} defaultValue={cv.state}>
                        {Object.keys(State).map((key) => (
                          <option key={key} value={key}>
                            {State[key].replace(/_/g, ' ')}
                          </option>
                        ))}
                      </Select>
                    </HStack>
                    <Heading mt={5} size='sm'>
                      Nhãn
                    </Heading>

                    <VStack w={'100%'} alignItems={'flex-start'} spacing={[1, 5]} direction={['column', 'row']}>
                      <CheckboxGroup colorScheme='green'>
                        {labels?.map((label) => (
                          <Checkbox key={label.id} onChange={() => handleCheckboxChange(label.id)} isChecked={checkedLabels[label.id]}>
                            <Text m={0}>{label.name}</Text>
                          </Checkbox>
                        ))}
                      </CheckboxGroup>
                    </VStack>

                    <Heading mt={5} size='sm'>
                      Đã xem
                    </Heading>
                    <Checkbox onChange={handleChangeView} defaultChecked={candidate.view} colorScheme='green'>
                      Đã xem
                    </Checkbox>
                    <Button mt={5} w={'100%'} color={'white'} bgColor={'#2cccc7'}>
                      Báo cáo
                    </Button>
                  </CardBody>
                </Card>
              </VStack>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
