import { Box, HStack, Icon, Text, VStack, Wrap, WrapItem, Button, Image, Center, Card, Stack, CardBody, Heading, CardFooter } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineAlert } from 'react-icons/ai'
import { companyService } from '../../Service/company.service'
import { useNavigate } from 'react-router-dom'

export default function ListCompany() {
  const navigate = useNavigate()
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    companyService
      .getAllCompany()
      .then((res) => setCompanies(res))
      .catch((er) => console.log(er.message))
  }, [])

  return (
    <VStack fontFamily={'Montserrat'} w={'80hv'}>
      <Box borderRadius={10} overflow={'hidden'} position='relative' w='80%' bgColor={'white'}>
        <HStack alignItems='center' spacing={4} p={4}>
          <Icon as={AiOutlineAlert} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
          <Text fontWeight={'bold'} m={0} fontSize='2xl'>
            Công ty
          </Text>
        </HStack>
        <Wrap>
          {companies.map((company) => (
            <WrapItem>
              <Card h={300} w={300} overflow='hidden' variant='outline'>
                <Image w={'100%'} h={100} objectFit='cover' src={company.avatar} alt='Company' />

                <Stack>
                  <CardBody>
                    <Heading size='md'>{company.name}</Heading>

                    <Text py='2'>{company.website}</Text>
                    <Text py='2'>{company.address}</Text>
                    <Text py='2'>{company.phone}</Text>
                  </CardBody>

                  <CardFooter>
                    <Button variant='solid' colorScheme='blue'>
                      Xem
                    </Button>
                  </CardFooter>
                </Stack>
              </Card>
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </VStack>
  )
}
