import React, { useEffect, useState } from 'react'
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  ColumnSeries,
  Category,
  Tooltip,
  Legend,
  RangeColorSettingsDirective,
  RangeColorSettingDirective,
} from '@syncfusion/ej2-react-charts'

import {
  colorMappingData,
  ColorMappingPrimaryXAxis,
  ColorMappingPrimaryYAxis,
  rangeColorMapping,
} from '../../data/dummy'
import { ChartsHeader, LineChart } from '../../Components-admin'
import { userService } from '../../Service/user.servie'

const userData = [
  [
    { x: 'Jan', y: 10 },
    { x: 'Feb', y: 20 },
    { x: 'Mar', y: 12 },
    { x: 'Apr', y: 17 },
    { x: 'May', y: 22 },
    { x: 'June', y: 25 },
    { x: 'July', y: 29 },
    { x: 'Aug', y: 29 },
    { x: 'Sep', y: 25 },
    { x: 'Oct', y: 21 },
    { x: 'Nov', y: 15 },
    { x: 'Dec', y: 9 },
  ],
  ['#FFFF99'],
  ['#FFA500'],
  ['#FF4040'],
]

export const UserPrimaryXAxis = {
  valueType: 'Category',
  majorGridLines: { width: 0 },
  title: 'Months',
}

export const UserMappingPrimaryYAxis = {
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  labelFormat: '{value} Người dùng',
  title: 'Số người mới đăng kí',
}

export const rangeUserMapping = [
  { label: '1 to 10', start: '1', end: '10', colors: userData[1] },

  { label: '11 to 20', start: '11', end: '20', colors: userData[2] },

  { label: '21 to 100', start: '21', end: '100', colors: userData[3] },
]

const Line = () => {
  const [newData, setNewData] = useState([])
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  useEffect(() => {
    userService
      .getAllUser(accessToken)
      .then((res) => {
        const m = [
          { x: 'Jan', y: 0 },
          { x: 'Feb', y: 0 },
          { x: 'Mar', y: 0 },
          { x: 'Apr', y: 0 },
          { x: 'May', y: 0 },
          { x: 'Jun', y: 0 },
          { x: 'Jul', y: 0 },
          { x: 'Aug', y: 0 },
          { x: 'Sep', y: 0 },
          { x: 'Oct', y: 0 },
          { x: 'Nov', y: 0 },
          { x: 'Dec', y: 0 },
        ]
        res.data.forEach((item) => {
          const month = new Date(item.dateRegister).getMonth()
          m[month].y += 1
        })
        setNewData(m)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }, [])

  return (
    <div
      style={{ fontFamily: 'Montserrat' }}
      className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
      {/* <ChartsHeader category='Line' title='Inflation Rate' />
      <div className='w-full'>
        <LineChart />
      </div> */}

      <ChartsHeader fontFamily={'Montserrat'} category='Users' title='Người dùng mới hàng tháng' />
      <div className='w-full'>
        <ChartComponent
          id='charts'
          primaryXAxis={UserPrimaryXAxis}
          primaryYAxis={UserMappingPrimaryYAxis}
          chartArea={{ border: { width: 0 } }}
          legendSettings={{ mode: 'Range', background: 'white' }}
          tooltip={{ enable: true }}
          fontFamily={'Montserrat'}
          background={'#fff'}>
          <Inject services={[ColumnSeries, Tooltip, Category, Legend]} />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={newData}
              name='User'
              xName='x'
              yName='y'
              type='Column'
              cornerRadius={{
                topLeft: 10,
                topRight: 10,
              }}
            />
          </SeriesCollectionDirective>
          <RangeColorSettingsDirective>
            {rangeUserMapping.map((item, index) => (
              <RangeColorSettingDirective key={index} {...item} />
            ))}
          </RangeColorSettingsDirective>
        </ChartComponent>
      </div>
    </div>
  )
}

export default Line
