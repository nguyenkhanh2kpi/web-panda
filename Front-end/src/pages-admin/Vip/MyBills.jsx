import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, HStack, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { vipService } from '../../Service/vip.service'

export const MyBills = () => {
  const acceccToken = JSON.parse(localStorage.getItem('data')).access_token
  const [bills, setBill] = useState([])

  useEffect(() => {
    vipService
      .getMyBill(acceccToken)
      .then((response) => setBill(response))
      .catch((er) => console.log(er))
  }, [])
  return (
    <Box minHeight={2000} overflow='auto' fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'}>
      <HStack justifyContent={'space-between'} w={'100%'}>
        <Breadcrumb  pt={30}>
          <BreadcrumbItem>
            <BreadcrumbLink href='/vip'>Nâng cấp tài khoản</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Đơn hàng của tôi</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </HStack>

      <TableContainer ml={30} mr={30} borderRadius={5} bgColor={'white'}>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Status</Th>
              <Th>Paydate</Th>
              <Th>Expired at</Th>
              <Th>Code</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bills.map((bill) => (
              <Tr>
                <Td>{bill.id}</Td>
                <Td>{bill.status}</Td>
                <Td>{bill.pay_date}</Td>
                <Td>{bill.expired_at}</Td>
                <Td>{bill.type}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}
