import React from 'react'
import { Link } from 'react-router-dom'
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from '@syncfusion/ej2-react-grids'
import { loadUserManage } from '../redux/UserManage/Action'
import { customersData, customersGrid } from '../data/dummy'
import { Header } from '../Components-admin'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
const Customers = () => {
  const selectionsettings = { persistSelection: true }
  const editing = { allowDeleting: false, allowEditing: false }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadUserManage())
  }, [])

  const allUser = useSelector((store) => store.allUser.data)
  console.log(allUser)
  let value = []

  allUser.map((x) => {
    value.push(x)
  })

  if (value.length === 0) {
    return (
      <>
        <Box padding='6' boxShadow='lg' bg='white'>
          <SkeletonCircle size='10' />
          <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
        </Box>
      </>
    )
  } else
    return (
      <div
        style={{ fontFamily: 'Montserrat' }}
        className='m-2 md:m-10 mt-24 p-10 md:p-10 bg-white rounded-3xl'>
        <Header title='Quản lý user' />
        <GridComponent
          dataSource={value}
          enableHover={false}
          allowPaging
          pageSettings={{ pageCount: 5 }}
          selectionSettings={selectionsettings}
          allowSorting>
          <ColumnsDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {customersGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
        </GridComponent>
      </div>
    )
}

export default Customers
