import { Button, Center, Heading, Input, InputGroup, InputRightElement, SimpleGrid, SlideFade, Spinner, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import CompaniesCard from './CompaniesCard'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { companyService } from '../../Service/company.service'
import { Search2Icon } from '@chakra-ui/icons'
import { SearchCompany } from './SearchCompany'

const CompaniesContainer = () => {
  const [companies, setCompanies] = useState([])
  const [keyWord, setKeword] = useState('')
  useEffect(() => {
    companyService.getAllCompany().then((res) => setCompanies(res))
  }, [])
  const handleType = (e) => {
    setKeword(e.target.value)
  }

  return (
    <VStack width={'90vw'} align={'flex-start'} m={2} p={2}>
      <SlideFade in={true} offsetY={20}>
        <Heading size={'sm'} opacity={0.9} fontWeight={'medium'} mb={4}>
          <InputGroup size='md' w={'60vw'}>
            <Input value={keyWord} name='keyword' onChange={handleType} backgroundColor={'#FFFFFF'} pr='4.5rem' type='text' placeholder='Search' borderRadius={30} p={6} />
            <InputRightElement width='4.5rem'>
              <SearchCompany companies={companies} onChange={handleType} keyword={keyWord} />
            </InputRightElement>
          </InputGroup>
        </Heading>
      </SlideFade>
      {!companies ? (
        <Center direction='row' spacing={4} w={'80vw'} h={'20vw'}>
          <Spinner color='blue.500' size='xl' />
        </Center>
      ) : (
        <SimpleGrid columns={3} spacing={5}>
          {companies.map((company) => (
            <CompaniesCard key={company._id} {...company} />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  )
}

export default CompaniesContainer
