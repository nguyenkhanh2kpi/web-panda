import { Box, Button, FormLabel, HStack, Input, Text, VStack, useDisclosure } from '@chakra-ui/react'
import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { AddQuestionInterview } from './AddQuestionInterview'
export const QuestionMarkItem = ({ field, question, onAddClick, onDeleteClick }) => {
  useEffect(() => {}, [field])
  return (
    <HStack w={'100%'}>
      <FormLabel w={'20%'}>{field}</FormLabel>
      <Box w={'100%'}>
        <HStack w={'100%'}>
          <Box w={'84%'}>
            <VStack w={'100%'}>
              {question.map((question) => (
                <HStack w={'100%'} justifyContent={'space-between'}>
                  <Text borderRadius={5} borderWidth={1} w={'100%'} fontSize='lg' p={1}>
                    {question.question}
                    <HStack>
                      <Text fontWeight={'bold'}> Điểm: {question.mark}</Text>
                      <Button ml={2} onClick={() => onDeleteClick(question.id, field === 'SoftSkill' ? 'softSkill' : field === 'TechSkill' ? 'technical' : 'english')}>
                        x
                      </Button>
                    </HStack>
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Box>
          <AddQuestionInterview field={field} onAddClick={onAddClick} />
        </HStack>
      </Box>
    </HStack>
  )
}
