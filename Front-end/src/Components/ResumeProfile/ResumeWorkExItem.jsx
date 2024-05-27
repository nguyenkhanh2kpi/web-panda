import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react'
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
    <Box p={5} w={'100%'} backgroundColor={'white'} display='flex' alignItems='baseline'>
      <FormControl isRequired>
        <FormLabel>Company Name</FormLabel>
        <Input
          name='companyName'
          onChange={handleOnChange}
          placeholder=''
          value={worksExp.companyName}
        />

        <FormLabel>Working time </FormLabel>
        <HStack>
          <Text>From</Text>
          <Input
            name='startWorkingTime'
            onChange={handleOnChange}
            type='date'
            placeholder=''
            value={worksExp.startWorkingTime}
          />

          <Text>To</Text>
          <Input
            name='endWorkingTime'
            onChange={handleOnChange}
            type='date'
            placeholder=''
            value={worksExp.endWorkingTime}
          />

          <Button>Now</Button>
        </HStack>

        <FormLabel>Position</FormLabel>
        <Input name='position' onChange={handleOnChange} placeholder='' value={worksExp.position} />

        <FormLabel>Job details and roles at this position</FormLabel>
        <Textarea
          name='jobDetail'
          onChange={handleOnChange}
          placeholder=''
          value={worksExp.jobDetail}
        />

        <FormLabel>Technology/tools used for this position</FormLabel>
        <Input
          name='technology'
          onChange={handleOnChange}
          placeholder=''
          value={worksExp.technology}
        />

        <Button onClick={() => deleteClick(item)} backgroundColor={'#94a6a6'} mt={2}>
          -
        </Button>
        <Button onClick={addClick} backgroundColor={'#8ebfb4'} ml={2} mt={2}>
          +
        </Button>
        <Button onClick={() => saveClick(worksExp)} backgroundColor={'#92e0cf'} ml={2} mt={2}>
          save
        </Button>
      </FormControl>
    </Box>
  )
}
