import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, FormLabel, HStack, Input, Text, Textarea, VStack } from '@chakra-ui/react'
export const ResumeWorkExItem = ({ item, addClick, deleteClick, saveClick }) => {
  const [worksExp, setWorkExp] = useState([])
  useEffect(() => {
    setWorkExp(item)
  }, [item])

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setWorkExp((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }


  return (
    <>
      <HStack spacing={10} w={'100%'}>
        <FormControl w={'50%'}>
          <FormLabel>Tên công ty</FormLabel>
          <Input name='companyName' onChange={handleOnChange} value={worksExp.companyName} />
        </FormControl>
        <FormControl w={'50%'}>
          <FormLabel>Vị trí/ Chức vụ</FormLabel>
          <Input name='position' onChange={handleOnChange} value={worksExp.position} />
        </FormControl>
      </HStack>

      <HStack spacing={10} w={'100%'}>
        <FormControl w={'50%'}>
          <Text>Thời gian bắt đầu</Text>
          <Input name='startWorkingTime' onChange={handleOnChange} type='date' value={worksExp.startWorkingTime} />
        </FormControl>
        <FormControl w={'50%'}>
          <Text>Thời gian kết thúc</Text>
          <Input name='endWorkingTime' onChange={handleOnChange} type='date' value={worksExp.endWorkingTime} />
        </FormControl>
      </HStack>

      <HStack spacing={10} w={'100%'}>
        <FormControl w={'100%'}>
          <FormLabel>Mô tả công việc</FormLabel>
          <Textarea name='jobDetail' onChange={handleOnChange} value={worksExp.jobDetail} />
        </FormControl>
      </HStack>

      <HStack spacing={10} w={'100%'}>
        <FormControl w={'100%'}>
          <FormLabel>Công cụ/công nghệ( nếu có)</FormLabel>
          <Input name='technology' onChange={handleOnChange} placeholder='' value={worksExp.technology} />
        </FormControl>
      </HStack>

      <HStack w={'40%'}>
        <Button color={'white'} onClick={() => deleteClick(item)} backgroundColor={'#94a6a6'} mt={2}>
          -
        </Button>
        <Button color={'white'} onClick={addClick} backgroundColor={'#8ebfb4'} ml={2} mt={2}>
          +
        </Button>
        <Button color={'white'} onClick={() => saveClick(worksExp)} backgroundColor={'#92e0cf'} ml={2} mt={2}>
          Lưu
        </Button>
      </HStack>
    </>
  )
}
