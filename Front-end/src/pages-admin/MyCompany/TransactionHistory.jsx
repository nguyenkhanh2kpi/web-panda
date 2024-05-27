import { Box, Divider, HStack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { vipService } from '../../Service/vip.service'

export const TransactionHistory = () => {
  const [listTransaction, setListTransaction] = useState([])
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token

  useEffect(() => {
    vipService
      .getMyBill(accessToken)
      .then((response) => setListTransaction(response))
      .catch((er) => console.log(er))
  }, [])
  return (
    <Box w={'100%'}>
      <TableContainer borderWidth={1}>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>email</Th>
              <Th>Dịch vụ</Th>
              <Th>Ngày</Th>
              <Th>Ngày hết hạn</Th>
              <Th>Trạng thái</Th>
            </Tr>
          </Thead>
          <Tbody>
            {listTransaction.map((trans) => (
              <Tr>
                <Td>{trans.id}</Td>
                <Td>{trans.email}</Td>
                <Td>{trans.type}</Td>
                <Td>{trans.pay_date}</Td>
                <Td>{trans.expired_at}</Td>
                <Td>{trans.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}
