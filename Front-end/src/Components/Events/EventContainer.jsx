import React, { useEffect, useState } from 'react'
import { eventService } from '../../Service/event.service'
import { ToastContainer, toast } from 'react-toastify'

import { Center, Heading, SimpleGrid, SlideFade, Spinner, VStack } from '@chakra-ui/react'
import { EventCard } from './EventCard'

export const EventContainer = () => {
  const [events, setEvent] = useState()
  useEffect(() => {
    eventService
      .getEvent()
      .then((res) => setEvent(res))
      .catch((er) => console.log(er))
  })
  return (
    <VStack width={'100vw'} align={'flex-start'} m={2} p={2}>
      {!events ? (
        <Center direction='row' spacing={4} w={'80vw'} h={'20vw'}>
          <Spinner color='blue.500' size='xl' />
        </Center>
      ) : (
        <SimpleGrid columns={3} spacing={5}>
          {events
            .filter((event) => event.status === true)
            .map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
        </SimpleGrid>
      )}

      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </VStack>
  )
}
