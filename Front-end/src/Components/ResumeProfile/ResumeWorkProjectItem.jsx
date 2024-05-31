import { Box, Button, FormControl, FormLabel, HStack, Input, Text, Textarea } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

export const ResumeWorkProjectItem = ({ item, deleteClick, addClick, saveClick }) => {
  const [worksProject, setWorkProject] = useState([])
  useEffect(() => {
    setWorkProject(item)
  }, [item])

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setWorkProject((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  if (item === null) {
    return <></>
  } else
    return (
      <>
        <HStack spacing={10} w={'100%'}>
          <FormControl w={'50%'}>
            <FormLabel>Tên dự án</FormLabel>
            <Input name='nameProject' onChange={handleOnChange} placeholder='' value={worksProject.nameProject} />
          </FormControl>
          <FormControl w={'50%'}>
            <FormLabel>Vị trí - chức vụ</FormLabel>
            <Input name='position' onChange={handleOnChange} placeholder='' value={worksProject.position} />
          </FormControl>
        </HStack>
        <HStack spacing={10} w={'100%'}>
          <FormControl w={'50%'}>
            <FormLabel>Thời gian bắt đầu</FormLabel>
            <Input name='startTime' onChange={handleOnChange} type='date' placeholder='' value={worksProject.startTime} />
          </FormControl>
          <FormControl w={'50%'}>
            <FormLabel>Thời gian kết thúc</FormLabel>
            <Input name='endTime' onChange={handleOnChange} type='date' placeholder='' value={worksProject.endTime} />
          </FormControl>
        </HStack>
        <HStack spacing={10} w={'100%'}>
          <FormControl w={'50%'}>
            <FormLabel>Khách hàng</FormLabel>
            <Input name='client' onChange={handleOnChange} placeholder='' value={worksProject.client} />
          </FormControl>
          <FormControl w={'50%'}>
            <FormLabel>Số thành viên</FormLabel>
            <Input name='members' onChange={handleOnChange} placeholder='' value={worksProject.members} />
          </FormControl>
        </HStack>
        <HStack spacing={10} w={'100%'}>
          <FormControl w={'50%'}>
            <FormLabel>Trách nhiệm/ vai trò</FormLabel>
            <Textarea name='responsibilities' onChange={handleOnChange} placeholder='' value={worksProject.responsibilities} />
          </FormControl>
          <FormControl w={'50%'}>
            <FormLabel>Mô tả</FormLabel>
            <Textarea name='description' onChange={handleOnChange} placeholder='' value={worksProject.description} />
          </FormControl>
        </HStack>
        <HStack spacing={10} w={'100%'}>
          <FormControl w={'100%'}>
            <FormLabel>Kĩ năng, công nghệ liên quan</FormLabel>
            <Textarea name='technology' onChange={handleOnChange} placeholder='' value={worksProject.technology} />
          </FormControl>
        </HStack>

        <HStack w={'40%'}>
          <Button color={'white'} onClick={() => deleteClick(item)} backgroundColor={'#94a6a6'} mt={2}>
            -
          </Button>
          <Button color={'white'} onClick={addClick} backgroundColor={'#8ebfb4'} ml={2} mt={2}>
            +
          </Button>
          <Button color={'white'} onClick={() => saveClick(worksProject)} backgroundColor={'#92e0cf'} ml={2} mt={2}>
            Lưu
          </Button>
        </HStack>
      </>
    )
}
