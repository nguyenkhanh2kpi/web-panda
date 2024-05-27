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

  return (
    <Box
      borderWidth={1}
      p={5}
      w={'100%'}
      backgroundColor={'white'}
      display='flex'
      alignItems='baseline'>
      <FormControl isRequired>
        <FormLabel>Name Project</FormLabel>
        <Input
          name='nameProject'
          onChange={handleOnChange}
          placeholder=''
          value={worksProject.nameProject}
        />

        <FormLabel>Time</FormLabel>
        <HStack>
          <Text>From</Text>
          <Input
            name='startTime'
            onChange={handleOnChange}
            type='date'
            placeholder=''
            value={worksProject.startTime}
          />
          <Text>To</Text>
          <Input
            name='endTime'
            onChange={handleOnChange}
            type='date'
            placeholder=''
            value={worksProject.endTime}
          />
        </HStack>

        <FormLabel>Client</FormLabel>
        <Input name='client' onChange={handleOnChange} placeholder='' value={worksProject.client} />

        <FormLabel>Descriptions</FormLabel>
        <Textarea
          name='description'
          onChange={handleOnChange}
          placeholder=''
          value={worksProject.description}
        />

        <FormLabel>Number of members</FormLabel>
        <Input
          name='members'
          onChange={handleOnChange}
          placeholder=''
          value={worksProject.members}
        />

        <FormLabel>Position</FormLabel>
        <Input
          name='position'
          onChange={handleOnChange}
          placeholder=''
          value={worksProject.position}
        />

        <FormLabel>Responsibilities</FormLabel>
        <Textarea
          name='responsibilities'
          onChange={handleOnChange}
          placeholder=''
          value={worksProject.responsibilities}
        />

        <FormLabel>Technology/tools in use</FormLabel>
        <Textarea
          name='technology'
          onChange={handleOnChange}
          placeholder=''
          value={worksProject.technology}
        />

        <Button onClick={() => deleteClick(item)} backgroundColor={'#94a6a6'} mt={2}>
          -
        </Button>
        <Button onClick={addClick} backgroundColor={'#8ebfb4'} ml={2} mt={2}>
          +
        </Button>
        <Button onClick={() => saveClick(worksProject)} backgroundColor={'#92e0cf'} ml={2} mt={2}>
          save
        </Button>
      </FormControl>
    </Box>
  )
}
