import React from 'react'
import { Avatar, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, CircularProgress, Flex, HStack, Image, Skeleton, SkeletonCircle, Spinner, Stack, Text } from '@chakra-ui/react'

export const LoadingComponent = () => {
  return (
    <Box minHeight={2000} overflow='auto' fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'}>
      <HStack w={'100%'}>
        <Box p={30} w={'50%'} justifyContent={'space-between'}>
          <Stack w={'50%'}>
            <Skeleton height='20px' />
          </Stack>
        </Box>
        <Box p={30} w={'50%'} marginRight='auto'>
          <Stack w={'100%'}>
            <Skeleton height='20px' />
          </Stack>
        </Box>
      </HStack>

      <Stack pl={30} pr={30}>
        <Skeleton height='1000px' />
      </Stack>
    </Box>
  )
}
