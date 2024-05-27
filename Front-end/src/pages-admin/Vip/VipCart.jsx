import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardBody, HStack, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { vipService } from '../../Service/vip.service'

export const VipCart = () => {
  const params = useParams()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const email = JSON.parse(localStorage.getItem('data')).data.email
  const [pack, setPack] = useState({})
  const navigate = useNavigate()
  useEffect(() => {
    vipService
      .getPackById(accessToken, params.packId)
      .then((response) => setPack(response))
      .catch((er) => console.log(er))
  })

  const handlePay = () => {
    let form = {
      price: pack.price,
      packVipType: 'TOP_VIP',
      userEmail: email,
    }
    vipService
      .payBill(form)
      .then((response) => {
        const paymentUrl = response.data
        window.location.href = paymentUrl
      })
      .catch((error) => {
        console.error('Payment failed: ', error)
      })
  }

  return (
    <Box minHeight={2000} overflow='auto' fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'}>
      <HStack justifyContent={'space-between'} w={'100%'}>
        <Breadcrumb pt={30}>
          <BreadcrumbItem>
            <BreadcrumbLink href='/vip'>Nâng cấp tài khoản</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Giỏ hàng</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </HStack>

      <Card w={"70%"} ml={30}>
        <CardBody>
          <Table variant='simple' width='100%'>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Tên dịch vụ</Th>
                <Th>Mô tả</Th>
                <Th>Số tiền</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{pack.id}</Td>
                <Td>{pack.name}</Td>
                <Td>{pack.des}</Td>
                <Td>{pack.price}</Td>
              </Tr>
            </Tbody>
          </Table>
        </CardBody>
      </Card>

      <Button color={'white'} ml={30} onClick={handlePay} mt={10} bgColor={'#2cccc7'} w={'70%'}>
        Thanh toán
      </Button>
    </Box>
  )
}
