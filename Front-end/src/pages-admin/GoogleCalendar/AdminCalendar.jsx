import React from 'react'
import { Header } from '../../Components-admin'
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop, ResourcesDirective, ResourceDirective } from '@syncfusion/ej2-react-schedule'
import { useState } from 'react'
import { useEffect } from 'react'
import { calendarService } from '../../Service/calendar.service'
import { calendarConver } from './CalendarConvert'
import './calendar.css'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, CircularProgress, Skeleton, Spinner, Stack, Text, VStack } from '@chakra-ui/react'

const PropertyPane = (props) => <div className='mt-5'>{props.children}</div>

export const AdminCalendar = () => {
  const [scheduleObj, setScheduleObj] = useState()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [displayCalendar, setDisplayCalendar] = useState()

  const change = (args) => {
    scheduleObj.selectedDate = args.value
    scheduleObj.dataBind()
  }
  const onDragStart = (arg) => {
    arg.navigation.enable = true
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [myCalendarRes, localCalendarRes] = await Promise.all([calendarService.getMyCalendar(accessToken), calendarService.getLocalCalendar(accessToken)])

        const myCalendarData = calendarConver.convertCalendar(myCalendarRes)
        const localCalendarData = calendarConver.convertCalendarLocal(localCalendarRes)

        const mergedCalendarData = [...myCalendarData, ...localCalendarData]
        setDisplayCalendar(mergedCalendarData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const onActionBegin = (args) => {
    switch (args.requestType) {
      case 'eventCreate':
        if (args.data && args.data.length > 0) {
          const eventData = args.data[0]
          const createForm = {
            id: 0,
            subject: eventData.Subject,
            location: eventData.Location,
            startTime: eventData.StartTime,
            endTime: eventData.EndTime,
            isAllDay: eventData.IsAllDay,
            resourceId: eventData.ResourceId,
            description: eventData.Description,
          }
          calendarService
            .postLocalCalendar(accessToken, createForm)
            .then((response) => console.log('oj', response))
            .catch((err) => console.log(err))
        } else {
          console.log('No event data found')
        }
        break
      case 'eventChange':
        const createForm = {
          id: args.data.Id,
          subject: args.data.Subject,
          location: args.data.Location,
          startTime: args.data.StartTime,
          endTime: args.data.EndTime,
          isAllDay: args.data.IsAllDay,
          resourceId: args.data.ResourceId,
          description: args.data.Description,
        }
        calendarService
          .postLocalCalendar(accessToken, createForm, createForm.id)
          .then()
          .catch((err) => console.log(err))
        break
      case 'eventRemove':
        if (args.data && args.data.length > 0) {
          const selected = args.data[0]
          calendarService
            .deleteLocalCalender(accessToken, selected.Id)
            .then()
            .catch((er) => console.log(er))
        }
        break
      default:
        break
    }
  }

  if (displayCalendar === undefined) {
    return (
      <Box minHeight={2000} overflow='auto' fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'}>
        <Breadcrumb pt={30}>
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Calendar</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Box spacing={3} ml={30} mr={30}>
          <Skeleton height='650px'/>
        </Box>
      </Box>
    )
  } else if (displayCalendar.length === 0) {
    return (
      <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
        <Header category='pages' title='Calendar' />
        <Text>Your calendar is null</Text>
      </div>
    )
  } else
    return (
      <>
        <Box minHeight={2000} overflow='auto' fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'}>
          <Breadcrumb pt={30}>
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Calendar</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <VStack spacing={3} ml={30} mr={30}>
            {/* <Box minHeight={1000} overflow='auto' p={'3%'} borderRadius={20} backgroundColor={'#FFFFFF'} w={'100%'} mb={10}> */}
            <ScheduleComponent actionBegin={onActionBegin} height='650px' ref={(schedule) => setScheduleObj(schedule)} eventSettings={{ dataSource: displayCalendar }} selectedDate={new Date()} dragStart={onDragStart}>
              <ResourcesDirective>
                <ResourceDirective field='ResourceId' title='Resource' name='Resources' allowMultiple={true} dataSource={calendarConver.generateResourceData()} textField='Text' idField='Id' colorField='Color'></ResourceDirective>
              </ResourcesDirective>
              <ViewsDirective>
                {['Month', 'Agenda'].map((item) => (
                  <ViewDirective key={item} option={item} />
                ))}
              </ViewsDirective>
              <Inject services={[Month, Agenda, Resize, DragAndDrop]} />
            </ScheduleComponent>
            {/* </Box> */}
          </VStack>
        </Box>
      </>
    )
}
