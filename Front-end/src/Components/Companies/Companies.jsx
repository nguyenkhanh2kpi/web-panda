import { Heading, HStack, SlideFade, VStack } from '@chakra-ui/react'
import React from 'react'
import CompaniesContainer from './CompaniesContainer'

const Companies = () => (
  <VStack bgColor={'#f0f4f5'} fontFamily={'Montserrat'}>
    <SlideFade offsetY={20}>
      <Heading size={'lg'} m={'6'} mt={24}></Heading>
    </SlideFade>

    <HStack h={1000} align={'flex-start'} w={'80vw'}>
      <CompaniesContainer />
    </HStack>
  </VStack>
)

export default Companies
