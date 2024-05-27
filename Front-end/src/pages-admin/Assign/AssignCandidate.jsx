import React, { useState, useEffect } from 'react'
import { Box, Text, Button, HStack, VStack, Checkbox, Avatar, Link, Spacer, WrapItem, useDisclosure, InputGroup, Input, InputRightAddon, Icon, Select, Menu, MenuButton, IconButton, MenuList, MenuItem, Flex, Heading, Card, useToast } from '@chakra-ui/react'
import { AtSignIcon, CloseIcon, ExternalLinkIcon, SearchIcon, StarIcon } from '@chakra-ui/icons'
import { interviewService } from '../../Service/interview.service'
import { labelService } from '../../Service/label.service'
import { BsThreeDotsVertical } from 'react-icons/bs'

let states = {
  RECEIVE_CV: 'Tiếp nhận CV',
  SUITABLE: 'Phù hợp yêu cầu',
  SCHEDULE_INTERVIEW: 'Lên lịch phỏng vấn',
  SEND_PROPOSAL: 'Gửi đề nghị',
  ACCEPT: 'Nhận việc',
  REJECT: 'Từ chối',
}

export const AssignCandidate = ({ jobId, roomId, startDate, endDate , load, setLoad}) => {
  const toast = useToast()
  const [candidates, setCandidates] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token

  // close
  const handleClose = () => {
    onClose()
    setLoad(!load)
  }

  // filter
  const [filteredCandidates, setFilteredCandidates] = useState([])
  const [labelFilter, setLabelFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')
  useEffect(() => {
    const applyFilters = () => {
      let filtered = candidates
      if (labelFilter) {
        filtered = filtered.filter((candidate) => {
          const candidateLabels = JSON.parse(candidate.labels)
          return candidateLabels[labelFilter] === true
        })
      }
      if (statusFilter) {
        filtered = filtered.filter((candidate) => candidate.cvStatus === statusFilter)
      }
      if (search) {
        if (search != '') {
          filtered = filtered.filter((candidate) => candidate.fullName.toLowerCase().includes(search.toLowerCase()))
        }
        else{

        }
      }
      setFilteredCandidates(filtered)
    }

    applyFilters()
  }, [candidates, labelFilter, statusFilter, search])
  const handleFilterStatusChange = (event) => {
    setStatusFilter(event.target.value)
    setListSelected([])
  }
  const handleLabelFilterChange = (event) => {
    setLabelFilter(event.target.value)
    setListSelected([])
  }
  const handleChangS =(event) => {
    setSearch(event.target.value)
    setListSelected([])
  }



  const convertDates = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const formattedDate = start.toISOString().split('T')[0]
    const startTime = `${start.getHours().toString().padStart(2, '0')}h${start.getMinutes().toString().padStart(2, '0')}`
    const endTime = `${end.getHours().toString().padStart(2, '0')}h${end.getMinutes().toString().padStart(2, '0')}`
    const result = {
      date: formattedDate,
      time: `${startTime} to ${endTime}`,
    }
    return result
  }

  useEffect(() => {
    interviewService
      .getCandidatesByJob(accessToken, jobId)
      .then((res) => setCandidates(res))
      .catch((error) => console.log(error))
  }, [accessToken, jobId])

  const [labels, setLabels] = useState([])
  useEffect(() => {
    labelService
      .getMyLabel(accessToken)
      .then((response) => setLabels(response))
      .catch((er) => console.log('assign candidate', er))
  }, [accessToken])

  //new way
  const [listSelected, setListSelected] = useState([])
  const handleOnCheckBoxClick = (e) => {
    const candidateId = parseInt(e.target.value, 10)
    const isChecked = e.target.checked

    setListSelected((prevSelected) => {
      if (isChecked) {
        return [...prevSelected, candidateId]
      } else {
        return prevSelected.filter((id) => id !== candidateId)
      }
    })
  }
  const handleOnSelectAll = (e) => {
    const isChecked = e.target.checked

    if (isChecked) {
      const allCandidateIds = filteredCandidates.map((candidate) => candidate.userId)
      setListSelected(allCandidateIds)
    } else {
      setListSelected([])
    }
  }

  const handleAssign = () => {
    const assignments = listSelected
      .filter((candidateId) => candidateId !== null && !isNaN(candidateId))
      .map((candidateId) => ({
        candidateId,
        interviewId: parseInt(roomId, 10),
        ...convertDates(startDate, endDate),
        description: 'no description',
      }))
    Promise.all(
      assignments.map((assignment) =>
        interviewService
          .candidateAssign(accessToken, assignment)
          .then((response) => {
            if (response.status === '200 OK') {
              return {
                status: 'success',
                message: response.message,
              }
            } else {
              return {
                status: 'info',
                message: response.message,
              }
            }
          })
          .catch((er) => ({
            status: 'error',
            message: 'something went wrong',
          }))
      )
    ).then((results) => {
      results.forEach((result) => {
        toast({
          title: 'Đăng kí ứng viên',
          description: result.message,
          status: result.status,
          duration: 1000,
          isClosable: true,
        })
      })
    })
  }

  return (
    <>
      <Button size='xs' leftIcon={<AtSignIcon />} colorScheme='teal' variant='solid' onClick={onOpen}>
        Đăng kí ứng viên
      </Button>

      {isOpen && (
        <Box position='fixed' top='0' left='0' width='100vw' height='100vh' bg='rgba(0, 0, 0, 0.6)' display='flex' alignItems='center' justifyContent='center' zIndex='2000'>
          <Box bg='white' p={6} borderRadius='md' boxShadow='lg' maxWidth='90%' width='60%' maxHeight='90%' overflow={'hidden'}>
            <HStack justifyContent={'space-between'} w={'100%'}>
              <Text fontSize='lg' fontWeight='bold' mb={4}>
                Đăng kí ứng viên
              </Text>
              <IconButton onClick={handleClose} aria-label='Search database' icon={<CloseIcon />} />
            </HStack>

            <VStack w={'100%'}>
              <HStack mt={2} w={'100%'}>
                <Select placeholder='Tất cả nhãn' onChange={handleLabelFilterChange}>
                  {labels.map((label) => (
                    <option key={label.id} value={label.id}>
                      {label.name}
                    </option>
                  ))}
                </Select>
                <Select placeholder='Tất cả trạng thái' onChange={handleFilterStatusChange}>
                  {Object.entries(states).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </Select>
                <InputGroup>
                  <Input value={search} onChange={handleChangS} placeholder='tìm' />
                  <InputRightAddon>
                    <Icon as={SearchIcon} />
                  </InputRightAddon>
                </InputGroup>
              </HStack>
              <Box h={400} w={'100%'} overflow={'auto'}>
                <VStack mt={5} w={'100%'}>
                  {filteredCandidates.map((candidate) => (
                    <Card w={'100%'} key={candidate.userId} p={1}>
                      <Flex spacing='4'>
                        <Checkbox onChange={handleOnCheckBoxClick} value={candidate.userId} mr={5} isChecked={listSelected.includes(candidate.userId)} />
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                          <Avatar name={candidate.fullName} src={candidate.avatar} />
                          <Box>
                            <Heading size='sm'>
                              {candidate.fullName}
                            </Heading>
                            <Text>{candidate.email}</Text>
                          </Box>
                        </Flex>
                        <Menu>
                          <MenuButton>
                            <IconButton variant='ghost' colorScheme='gray' aria-label='See menu' icon={<BsThreeDotsVertical />} />
                          </MenuButton>
                          <MenuList>
                            <MenuItem>
                              <Link href={candidate.cv} isExternal>
                                Xem CV
                              </Link>
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Flex>
                    </Card>
                  ))}
                </VStack>
              </Box>

              <HStack w={'100%'} justifyContent={'space-between'} mt={4}>
                <Button onClick={handleClose}>Cancel</Button>
                <HStack>
                  <Checkbox onChange={handleOnSelectAll}>Chọn tất cả</Checkbox>
                  <Button colorScheme='green' onClick={handleAssign}>
                    Đăng kí
                  </Button>
                </HStack>
              </HStack>
            </VStack>
          </Box>
        </Box>
      )}
    </>
  )
}
