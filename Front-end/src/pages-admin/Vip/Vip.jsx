import { CheckIcon } from '@chakra-ui/icons'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardBody, Divider, Grid, GridItem, HStack, List, ListIcon, ListItem, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { vipService } from '../../Service/vip.service'
import { useNavigate } from 'react-router-dom'
import { RepeatOneSharp } from '@mui/icons-material'

export const Vip = () => {
  const [vipPack, setVipPack] = useState([])
  const acceccToken = JSON.parse(localStorage.getItem('data')).access_token

  useEffect(() => {
    vipService
      .getAllService(acceccToken)
      .then((response) => setVipPack(response))
      .catch((er) => console.log(er))
  }, [])

  return (
    <Box minHeight={2000} overflow='auto' fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'}>
      <HStack justifyContent={'space-between'} w={'100%'}>
        <Breadcrumb pt={30}>
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Nâng cấp tài khoản</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </HStack>
      <HStack pl={30} pr={30} justifyContent={'space-around'} w={'100%'}>
        <Grid templateColumns='repeat(3, 1fr)' gap={6}>
          {vipPack.map((item) => (
            <VipItem item={item} />
          ))}
        </Grid>
      </HStack>
    </Box>
  )
}

const VipItem = ({ item }) => {
  const navigate = useNavigate()
  return (
    <Card>
      <CardBody>
        <Text fontWeight='bold'> {item.name}</Text>
        <Text fontSize={30} fontWeight='bold'>
          {item.price}/tuần
        </Text>
        <Divider color={'blue'} />
        <List spacing={3}>
          <ListItem>
            <CheckIcon />
            {item.benefit}
          </ListItem>
        </List>
        <Button color={'white'} onClick={() => navigate(`/vip/cart/${item.id}`)} bgColor={'#2cccc7'} w={'100%'}>
          Mua
        </Button>
      </CardBody>
    </Card>
  )
}
