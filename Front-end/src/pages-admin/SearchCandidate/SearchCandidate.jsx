import { SearchIcon } from '@chakra-ui/icons'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardBody, Checkbox, Divider, HStack, Heading, Icon, Input, List, ListIcon, ListItem, Radio, RadioGroup, Select, Skeleton, SkeletonText, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { locationService } from '../../Service/location.service'
import { AiOutlineEnvironment, AiOutlineEye, AiOutlineMail } from 'react-icons/ai'
import { fakeData } from './fakedata'
import { MdCheckCircle } from 'react-icons/md'
import { BsBriefcase } from 'react-icons/bs'
import { CiTimer } from 'react-icons/ci'
import { IoTimerOutline } from 'react-icons/io5'
import { resumeService } from '../../Service/resume.service'
import { FaGraduationCap } from 'react-icons/fa'
import { BiBrain, BiBriefcase, BiFolder, BiTrophy } from 'react-icons/bi'

export const SearchCandidate = () => {
  const [query, setQuery] = useState({
    applicationPosition: '',
    city: '',
    address: '',
    workingExperiences: '',
    mainSkill: '',
    skills: '',
    school: '',
    major: '',
    workingProjects: '',
    gender: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value,
    }))
  }
  const handleChangeGender = (value) => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      gender: value,
    }))
  }

  const [loading, setLoading] = useState(false)
  const [searchResume, setSearchResume] = useState([])

  const handleSearch = async () => {
    setLoading(true)
    const form = {
      query: query,
      resumes: fakeData,
    }
    await resumeService
      .findRelatedResume(form)
      .then((response) => setSearchResume(response))
      .catch((er) => console.log(er))
      .finally(() => setLoading(false))
  }

  // location
  const [province, setProvince] = useState([])
  useEffect(() => {
    locationService
      .getAllProvince()
      .then((response) => {
        setProvince(response)
      })
      .catch((er) => console.log(er))
  }, [])
  return (
    <Box fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'} overflow='hidden'>
      <Breadcrumb pt={30}>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Tìm kiếm ứng viên</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack mb={30} w={'100%'} minH={800} pl={30} pr={30} spacing={10}>
        <HStack alignItems={'flex-start'} w={'100%'} spacing={4}>
          <Card w={['100%', '30%']} flexShrink={0}>
            <CardBody>
              <HStack alignItems='center' spacing={4}>
                <Icon as={SearchIcon} boxSize={5} p={1} bgColor='#ddeff0' borderRadius='full' />
                <Text fontWeight={'bold'} m={0} fontSize='xl'>
                  Tìm kiếm
                </Text>
              </HStack>
              <Text fontWeight={'bold'} mt={3} fontSize='lg'>
                Từ khóa
              </Text>
              <Input placeholder='vị trí ứng tuyển' name='applicationPosition' value={query.applicationPosition} onChange={handleChange} />
              <Input mt={2} placeholder='kinh nghiệm' name='workingExperiences' value={query.workingExperiences} onChange={handleChange} />
              <Input mt={2} placeholder='kĩ năng' name='mainSkill' value={query.mainSkill} onChange={handleChange} />
              <Input mt={2} placeholder='chuyên ngành học vấn' name='major' value={query.major} onChange={handleChange} />

              <Text fontWeight={'bold'} mt={3} fontSize='lg'>
                Địa điểm
              </Text>
              <Select value={query.city} name='city' onChange={handleChange} w={'100%'} defaultValue='all'>
                <option value=''>Địa điểm</option>
                {province.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </Select>
              <Text fontWeight={'bold'} mt={3} fontSize='lg'>
                Giới tính
              </Text>
              <RadioGroup onChange={handleChangeGender} value={query.gender} name='gender'>
                <Stack direction='row'>
                  <Radio value=''>Tất cả</Radio>
                  <Radio value='MALE'>Nam</Radio>
                  <Radio value='FEMALE'>Nữ</Radio>
                </Stack>
              </RadioGroup>
              <Text fontWeight={'bold'} mt={3} fontSize='lg'>
                Năm sinh
              </Text>
              <HStack>
                <Input type='number' />
                <Input type='number' />
              </HStack>
              <Text fontWeight={'bold'} mt={3} fontSize='lg'>
                Trình độ học vấn
              </Text>
              <VStack alignItems={'flex-start'}>
                <Checkbox>Đại học</Checkbox>
                <Checkbox>Cao đẳng</Checkbox>
                <Checkbox>Trung cấp</Checkbox>
                <Checkbox>Sau đại học(thạc sĩ, tiến sĩ)</Checkbox>
                <Checkbox>Trung tâm đào tạo</Checkbox>
                <Checkbox>Du học</Checkbox>
              </VStack>
              <Text fontWeight={'bold'} mt={3} fontSize='lg'>
                Trường học
              </Text>
              <Input name='school' value={query.school} onChange={handleChange} type='text' />
              <Button onClick={handleSearch} w={'100%'} mt={4} bgColor={'#2cccc7'} color={'white'} size='md'>
                Tìm
              </Button>
            </CardBody>
          </Card>
          {loading ? (
            <SkeletonLoading />
          ) : (
            <Card minH={960} w={['100%', '70%']}>
              <CardBody>
                <HStack mb={5} alignItems='center' spacing={4}>
                  <Icon as={AiOutlineEye} boxSize={5} p={1} bgColor='#ddeff0' borderRadius='full' />
                  <Text fontWeight={'bold'} m={0} fontSize='xl'>
                    Tìm thấy {searchResume.length} ứng viên
                  </Text>
                </HStack>
                {searchResume.map((data) => (
                  <>
                    <Experience data={data} />
                    <Divider />
                  </>
                ))}
              </CardBody>
            </Card>
          )}
        </HStack>
      </VStack>
    </Box>
  )
}

function Experience({ data }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }
  function truncateString(str, maxLength) {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...'
    } else {
      return str
    }
  }
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }
  const [isCopied, setIsCopied] = useState(false)

  const handleClick = () => {
    copyToClipboard(data.email)
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  return (
    <HStack alignItems={'flex-start'} w={'100%'}>
      <VStack alignItems={'flex-start'} w={'30%'}>
        <Text w={'100%'} fontWeight={'bold'} fontSize='lg'>
          {data.fullName}
        </Text>
        <List spacing={3}>
          <ListItem>
            <ListIcon as={BsBriefcase} />
            {data.applicationPosition}
          </ListItem>
          <ListItem>
            <ListIcon as={AiOutlineEnvironment} />
            {data.city}
          </ListItem>
          <ListItem color={isCopied ? '#2cccc7' : ''} onClick={handleClick} style={{ cursor: 'pointer' }}>
            <ListIcon as={AiOutlineMail} />
            {isCopied ? 'Đã sao chép' : truncateString(data.email, 14)}
          </ListItem>
          <ListItem>
            <ListIcon as={IoTimerOutline} />
            {data.dateOB}
          </ListItem>
        </List>
      </VStack>
      <VStack alignItems={'flex-start'} w={'70%'}>
        <Box w={'100%'} overflow='hidden' maxHeight={isExpanded ? 'none' : '235px'}>
          <HStack w={'100%'} alignItems='flex-start'>
            <Icon mt={1.5} as={BiBriefcase} />
            <Text fontWeight='bold' fontSize='lg'>
              Kinh nghiệm:
            </Text>
          </HStack>
          {data.workingExperiences.map((ex, index) => (
            <HStack key={index} w={'100%'} alignItems={'flex-start'}>
              <Text>
                {ex.position} tại {ex.companyName} ( {ex.startWorkingTime} đến {ex.endWorkingTime})
              </Text>
            </HStack>
          ))}

          <HStack w={'100%'} alignItems='flex-start'>
            <Icon mt={1.5} as={FaGraduationCap} />
            <Text fontWeight='bold' fontSize='lg'>
              Học vấn:
            </Text>
          </HStack>
          <HStack w={'100%'} alignItems={'flex-start'}>
            <Text>
              Học {data.major} tại trường: {data.school} (từ {data.startEdudatiomTime} đến {data.endEducationTime})
            </Text>
          </HStack>

          <HStack w={'100%'} alignItems='flex-start'>
            <Icon mt={1.5} as={BiBrain} />
            <Text fontWeight='bold' fontSize='lg'>
              Kĩ năng:
            </Text>
          </HStack>
          <VStack w={'100%'} alignItems={'flex-start'}>
            <Text>Kĩ năng chính: {data.mainSkill}</Text>
            <Text>Kĩ năng khác: {data.skills}</Text>
          </VStack>

          <HStack w={'100%'} alignItems='flex-start'>
            <Icon mt={1.5} as={BiTrophy} />
            <Text fontWeight='bold' fontSize='lg'>
              Giải thưởng - Hoạt động khác:
            </Text>
          </HStack>
          <VStack w={'100%'} alignItems={'flex-start'}>
            <Text>Giải thưởng: {data.others}</Text>
          </VStack>

          <HStack w={'100%'} alignItems='flex-start'>
            <Icon mt={1.5} as={BiFolder} />
            <Text fontWeight='bold' fontSize='lg'>
              Dự án:
            </Text>
          </HStack>
          {data.workingProjects.map((pj, index) => (
            <HStack key={index} w={'100%'} alignItems={'flex-start'}>
              <Text>
                {pj.nameProject}( {pj.startTime} đến {pj.endTime})
              </Text>
            </HStack>
          ))}
        </Box>

        <Button size='xs' color={'#2cccc7'} bgColor={'white'} onClick={toggleExpand} mt={4}>
          {isExpanded ? 'Ẩn bớt' : 'Xem thêm'}
        </Button>
      </VStack>
    </HStack>
  )
}

const SkeletonLoading = () => {
  return (
    <Card w={'70%'}>
      <CardBody>
        <HStack mb={5} alignItems='center' spacing={6}>
          <Skeleton boxSize={8} p={1} bgColor='#ddeff0' borderRadius='full'>
            <Icon as={AiOutlineEye} />
          </Skeleton>
          <Skeleton height='24px' width='200px'>
            <Text fontWeight={'bold'} m={0} fontSize='2xl'>
              Tìm thấy {0} ứng viên
            </Text>
          </Skeleton>
        </HStack>
        {[...Array(3)].map((_, index) => (
          <Box key={index} w={'100%'} mb={5}>
            <SkeletonText noOfLines={6} spacing='4' skeletonHeight={5} />
            <Divider color={'#cccccc'} />
          </Box>
        ))}
      </CardBody>
    </Card>
  )
}
