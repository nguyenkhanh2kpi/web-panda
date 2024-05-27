import { Box, Image } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CompaniesCard = ({ id, name, avatar, info }) => {
  const navigate = useNavigate()
  return (
    <Box fontFamily={'Montserrat'} backgroundColor={'#ffffff'} maxW='700px' borderWidth='1px' borderRadius='lg' overflow='hidden' transition='transform 0.3s ease-in-out' _hover={{ transform: 'scale(1.05)' }} onClick={() => navigate('/companies/' + id)}>
      <Image width={384} src={avatar} alt='' height={'180px'} />

      <Box p='6'>
        <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1}>
          {name}
        </Box>

        <Box mt={2}>
          <Box as='span' color='gray.600' fontSize='sm'>
            <Box noOfLines={4}>{info}</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default CompaniesCard
