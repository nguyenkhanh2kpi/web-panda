import React, { useEffect, useState } from 'react'
import { Header } from '../../Components-admin'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Breadcrumb,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  List,
  ListIcon,
  ListItem,
  Select,
  Skeleton,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableCaption,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useEditableControls,
  useToast,
} from '@chakra-ui/react'
import { MdBuild, MdCheckCircle, MdSettings } from 'react-icons/md'
import { questionService } from '../../Service/question.service'
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'
import { Exposure } from '@mui/icons-material'
import { skillPositionService } from '../../Service/skillPosition.service'
import { BreadcrumbItem, Pagination } from 'react-bootstrap'
import { PaginationItem } from '@mui/material'
import { AddIcon, ArrowBackIcon, ArrowForwardIcon, CheckIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import './question.css'
import { AiOutlineEdit } from 'react-icons/ai'
import { AddSkillOverplay } from '../PositionSkill/AddSkillOverplay'

export const dropdownField = [
  {
    id: 0,
    field: '--Chọn phạm vi--',
  },
  {
    id: 1,
    field: 'SoftSkill',
  },
  {
    id: 2,
    field: 'TechSkill',
  },
  {
    id: 3,
    field: 'Language',
  },
]

export const dropdownSkill = (skills) => {
  const dropdownItems = skills?.map((item) => ({ id: item.id, field: item.skillName })) || []
  dropdownItems.unshift({ id: 0, field: '--Chọn kĩ năng--' })
  return dropdownItems
}

export const dropdownPosition = (positions) => {
  const dropdownItems = positions?.map((item) => ({ id: item.id, field: item.positionName })) || []
  dropdownItems.unshift({ id: 0, field: '--Chọn vị trí--' })
  return dropdownItems
}

export const Question = () => {
  const [load, setLoad] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()
  const [allQuestions, setAllQuestions] = useState([])
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [skills, setSkill] = useState([])
  const [positions, setPositions] = useState([])
  const [filter, setFilter] = useState({
    fieldId: 0,
    skillId: 0,
    positionId: 0,
  })

  const getAllquestion = (data) => {
    let allQuestions = []
    data.forEach((field) => {
      if (field.questions && field.questions.length > 0) {
        allQuestions = allQuestions.concat(field.questions)
      }
    })
    return allQuestions
  }

  useEffect(() => {
    questionService.getAllquestion(accessToken).then((res) => setAllQuestions(getAllquestion(res)))
    skillPositionService
      .getSkill(accessToken)
      .then((res) => setSkill(res))
      .catch((er) => console.log(er))
    skillPositionService
      .getPosition(accessToken)
      .then((res) => setPositions(res))
      .catch((er) => console.log(er))
  }, [load])

  const [filteredQuestions, setFilteredQuestions] = useState([])

  useEffect(() => {
    const filteredData = allQuestions.filter((question) => {
      const fieldMatch = filter.fieldId === 0 || question.fieldEnum === dropdownField.find((item) => item.id === filter.fieldId)?.field
      const skillMatch = filter.skillId === 0 || question.skillIds.includes(filter.skillId)
      const positionMatch = filter.positionId === 0 || question.positionIds.includes(filter.positionId)
      return fieldMatch && skillMatch && positionMatch
    })
    setFilteredQuestions(filteredData)
  }, [filter, allQuestions])

  const DropDown = ({ list, onChange, name, value }) => {
    const handleSelectChange = (event) => {
      const selectedValue = event.target.value
      onChange(selectedValue)
    }
    return (
      <div className='w-28 border-1 border-color px-2 py-1 rounded-md'>
        <DropDownListComponent id='field' name={`${name}`} fields={{ text: 'field', value: 'id' }} style={{ border: 'none' }} value={value} dataSource={list} popupHeight='220px' popupWidth='120px' onChange={handleSelectChange} />
      </div>
    )
  }

  // panigate
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 6
  const pageCount = Math.ceil(filteredQuestions.length / itemsPerPage)
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected)
  }
  const displayItems = filteredQuestions.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  // skill position
  const handleOnDeleteSkill = (id) => {
    skillPositionService
      .deleteSkill(accessToken, id)
      .then((res) => toast({ description: 'OK', duration: 1000 }))
      .catch((er) => toast({ description: 'something went wrong' }))
      .finally(() => setLoad(!load))
  }
  const [skillState, setSkillState] = useState({})
  const handleOnChange = (event) => {
    const { value } = event.target
    setSkillState({ ...skillState, skillName: value })
  }
  const handleOnUpdate = (id) => {
    skillPositionService
      .updateSkill(accessToken, skillState, id)
      .then((res) => toast({ description: res.message, duration: 1000 }))
      .catch((err) => toast({ description: 'Something went wrong', status: 'error', duration: 1000 }))
      .finally(() => setLoad(!load))
  }
  function EditableControls({ id, name, onUpdate }) {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls()
    const [skill, setSkill] = useState({
      id: 0,
      skillName: name,
    })
    const handleOnUpdate = () => {
      onUpdate()
    }

    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps({ onClick: handleOnUpdate })} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='center'>
        <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    )
  }

  if (allQuestions.length === 0) {
    return (
      <Box fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'} p={30} overflow='hidden'>
        <VStack spacing={10}>
          <Skeleton w={'100%'} h='60px'>
            <div>contents wrapped</div>
          </Skeleton>
          <Skeleton w={'100%'} h='400px'>
            <div>contents wrapped</div>
          </Skeleton>
          <Skeleton w={'100%'} h='400px'>
            <div>contents wrapped</div>
          </Skeleton>
        </VStack>
      </Box>
    )
  } else
    return (
      <>
        <Box minHeight={1000} fontFamily={'Montserrat'} backgroundColor={'#e9f3f5'} overflow='hidden'>
          <Breadcrumb pt={30}>
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Bộ câu hỏi</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <VStack mb={10} pl={30} pr={30} spacing={3}>
            <Card w={'100%'}>
              <CardBody>
                <HStack mb={3} alignItems='center' spacing={4}>
                  <Icon as={AiOutlineEdit} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
                  <Text m={0} fontSize='2xl'>
                    Kĩ năng, vị trí
                  </Text>
                </HStack>
                <Tabs position='relative' variant='unstyled'>
                  <TabList>
                    <Tab>Kĩ năng</Tab>
                    <Tab>Vị trí</Tab>
                  </TabList>
                  <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />
                  <TabPanels>
                    <TabPanel>
                      <TableContainer>
                        <Table variant='simple'>
                          <Thead>
                            <Tr>
                              <Th>id</Th>
                              <Th>Skill name</Th>
                              <Th>
                                <AddSkillOverplay load={load} setLoad={setLoad} />
                              </Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {skills.filter((s) => !s.isDelete).length > 0 ? (
                              skills
                                .filter((s) => !s.isDelete)
                                .map((skill) => (
                                  <Tr key={skill.id}>
                                    <Td>{skill.id}</Td>
                                    <Editable mt={5} textAlign='center' defaultValue={skill.skillName} isPreviewFocusable={false}>
                                      <HStack>
                                        <EditablePreview />
                                        <Input as={EditableInput} name='skillName' value={skillState.skillName} onChange={handleOnChange} />
                                        <EditableControls id={skill.id} name={skill.skillName} onUpdate={() => handleOnUpdate(skill.id)} />
                                      </HStack>
                                    </Editable>
                                    <Td>
                                      <IconButton color='#f768b0' backgroundColor='#f7f7f7' aria-label='Search database' icon={<DeleteIcon />} onClick={() => handleOnDeleteSkill(skill.id)} />
                                    </Td>
                                  </Tr>
                                ))
                            ) : (
                              <Tr>
                                <Td colSpan={3} textAlign='center'>
                                  No skills available
                                </Td>
                              </Tr>
                            )}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </TabPanel>
                    <TabPanel>
                      <TableContainer>
                        <Table variant='simple'>
                          <Thead>
                            <Tr>
                              <Th>id</Th>
                              <Th>Position name</Th>
                              <Th>
                                <Button w={'25%'} leftIcon={<AddIcon />} bgColor={'#2cccc7'} color={'white'} variant='solid'>
                                  Thêm
                                </Button>
                              </Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {positions.map((position) => (
                              <Tr key={position.id}>
                                <Td>{position.id}</Td>
                                <Editable mt={5} textAlign='center' defaultValue={position.positionName} isPreviewFocusable={false}>
                                  <HStack>
                                    <EditablePreview />
                                    <Input as={EditableInput} />
                                    <EditableControls />
                                  </HStack>
                                </Editable>
                                <Td>
                                  <IconButton color='#f768b0' backgroundColor='#f7f7f7' aria-label='Search database' icon={<DeleteIcon />} />
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </CardBody>
            </Card>
            <Card w={'100%'}>
              <CardBody>
                <HStack mb={3} alignItems='center' spacing={4}>
                  <Icon as={AiOutlineEdit} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
                  <Text m={0} fontSize='2xl'>
                    Câu hỏi
                  </Text>
                </HStack>
                <VStack w={'100%'} alignItems={'flex-start'}>
                  <HStack w={'100%'} spacing={5}>
                    <Select
                      w={'25%'}
                      onChange={(event) => {
                        const selectedValue = parseInt(event.target.value, 10)
                        setFilter((filter) => ({
                          ...filter,
                          fieldId: selectedValue,
                        }))
                      }}
                      value={filter.fieldId}>
                      {dropdownField.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.field}
                        </option>
                      ))}
                    </Select>

                    <Select
                      w={'25%'}
                      onChange={(event) => {
                        const selectedValue = parseInt(event.target.value, 10)
                        setFilter((filter) => ({
                          ...filter,
                          skillId: selectedValue,
                        }))
                      }}
                      value={filter.skillId}>
                      {dropdownSkill(skills).map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.field}
                        </option>
                      ))}
                    </Select>

                    <Select
                      w={'25%'}
                      onChange={(event) => {
                        const selectedValue = parseInt(event.target.value, 10)
                        setFilter((filter) => ({
                          ...filter,
                          positionId: selectedValue,
                        }))
                      }}
                      value={filter.positionId}>
                      {dropdownPosition(positions).map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.field}
                        </option>
                      ))}
                    </Select>

                    <Button w={'25%'} onClick={() => navigate('/question/add')} leftIcon={<AddIcon />} bgColor={'#2cccc7'} color={'white'} variant='solid'>
                      Thêm câu hỏi
                    </Button>
                  </HStack>
                  <Accordion minHeight={450} w={'100%'} allowToggle>
                    {displayItems.map((item) => (
                      <AccordionItem key={item.id}>
                        <h2>
                          <AccordionButton>
                            <Box as='span' flex='1' textAlign='left'>
                              <HStack>
                                <Text fontWeight={'bold'}>{item.question}</Text>
                                <IconButton color='#e06cae' backgroundColor='#f7f7f7' aria-label='Search database' icon={<EditIcon />} onClick={() => navigate(`/question/edit/${item.id}`)} />
                              </HStack>
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                          <List spacing={3}>
                            <ListItem>
                              <ListIcon as={MdCheckCircle} color='green.500' />
                              Creator: {item.creatorName}
                            </ListItem>
                            <ListItem>
                              <ListIcon as={MdCheckCircle} color='green.500' />
                              Answer: {item.answer}
                            </ListItem>
                            <ListItem>
                              <ListIcon as={MdCheckCircle} color='green.500' />
                              Field: {item.fieldEnum}
                            </ListItem>
                            {/* <ListItem>
                              <ListIcon as={MdCheckCircle} color='green.500' />
                              Skill:{' '}
                              {item.skillIds.map((id) => {
                                return `${skills.find((s) => s.id === id).skillName}, `
                              })}
                            </ListItem>
                            <ListItem>
                              <ListIcon as={MdCheckCircle} color='green.500' />
                              Position:{' '}
                              {item.positionIds.map((id) => {
                                return `${positions.find((s) => s.id === id).positionName}, `
                              })}
                            </ListItem> */}
                            // Đoạn mã trong phần hiển thị các kỹ năng và vị trí:
                            <ListItem>
                              <ListIcon as={MdCheckCircle} color='green.500' />
                              Skill:{' '}
                              {item.skillIds.map((id) => {
                                const skill = skills.find((s) => s.id === id)
                                return skill ? `${skill.skillName}, ` : ''
                              })}
                            </ListItem>
                            <ListItem>
                              <ListIcon as={MdCheckCircle} color='green.500' />
                              Position:{' '}
                              {item.positionIds.map((id) => {
                                const position = positions.find((p) => p.id === id)
                                return position ? `${position.positionName}, ` : ''
                              })}
                            </ListItem>
                          </List>
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  <ReactPaginate
                    className='question-panigate'
                    pageCount={pageCount}
                    onPageChange={handlePageChange}
                    previousLabel='<'
                    nextLabel='>'
                    breakLabel='...'
                    breakClassName='page-item'
                    breakLinkClassName='page-link'
                    containerClassName='pagination'
                    pageClassName='page-item'
                    pageLinkClassName='page-link'
                    previousClassName='page-item'
                    previousLinkClassName='page-link'
                    nextClassName='page-item'
                    nextLinkClassName='page-link'
                    activeClassName='active'
                  />
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </Box>

        {/* <div style={{ fontFamily: 'Montserrat' }} className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
          <Header title='Question' />
          <IconButton color='#03C9D7' backgroundColor='#f7f7f7' aria-label='Search database' icon={<AddIcon />} onClick={() => navigate('/question/add')} />

          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <div className='flex items-center gap-2'>
              <p className='text-xl font-semibold'>Filter</p>
            </div>
            <div className='flex items-center gap-2'>
              <p>Field:</p>
              <DropDown
                value={filter.fieldId}
                name='field'
                list={dropdownField}
                onChange={(selectedValue) =>
                  setFilter((filter) => ({
                    ...filter,
                    fieldId: selectedValue,
                  }))
                }
              />
            </div>
            <div className='flex items-center gap-2'>
              <p>Skill:</p>
              <DropDown
                value={filter.skillId}
                name='skill'
                list={dropdownSkill(skills)}
                onChange={(selectedValue) =>
                  setFilter((filter) => ({
                    ...filter,
                    skillId: selectedValue,
                  }))
                }
              />
            </div>
            <div className='flex items-center gap-2'>
              <p>Position:</p>
              <DropDown
                value={filter.positionId}
                name='position'
                list={dropdownPosition(positions)}
                onChange={(selectedValue) =>
                  setFilter((filter) => ({
                    ...filter,
                    positionId: selectedValue,
                  }))
                }
              />
            </div>
          </div>

          <Stack w={'100%'}>
            <ReactPaginate
              className='question-panigate'
              pageCount={pageCount}
              onPageChange={handlePageChange}
              previousLabel='<'
              nextLabel='>'
              breakLabel='...'
              breakClassName='page-item'
              breakLinkClassName='page-link'
              containerClassName='pagination'
              pageClassName='page-item'
              pageLinkClassName='page-link'
              previousClassName='page-item'
              previousLinkClassName='page-link'
              nextClassName='page-item'
              nextLinkClassName='page-link'
              activeClassName='active'
            />
          </Stack>

          <List spacing={3}>
            {displayItems.map((item) => (
              <ListItem key={item.id}>
                <ListIcon as={MdCheckCircle} color='green.500' />
                <Box>
                  <Text fontSize='lg' fontWeight='bold'>
                    {item.question}
                  </Text>
                  <Text>Creator: {item.creatorName}</Text>
                  <Text>Field: {item.fieldEnum}</Text>
                  <Text>Answer: {item.answer}</Text>
                  <Text>
                    Skill:{' '}
                    {item.skillIds.map((id) => {
                      return `${skills.find((s) => s.id === id).skillName}, `
                    })}
                  </Text>
                  <Text>
                    Position:{' '}
                    {item.positionIds.map((id) => {
                      return `${positions.find((s) => s.id === id).positionName}, `
                    })}
                  </Text>
                  <IconButton color='#e06cae' backgroundColor='#f7f7f7' aria-label='Search database' icon={<EditIcon />} onClick={() => navigate(`/question/edit/${item.id}`)} />
                </Box>
              </ListItem>
            ))}
          </List>
        </div> */}
      </>
    )
}
