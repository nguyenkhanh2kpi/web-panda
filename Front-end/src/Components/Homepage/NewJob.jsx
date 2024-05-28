import { Badge, Box, Button, Card, CardBody, CardFooter, Grid, GridItem, HStack, Heading, Icon, Image, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineAlert, AiOutlineFolderOpen } from 'react-icons/ai'
import { jobService } from '../../Service/job.service'
import ReactPaginate from 'react-paginate'
import { dataService } from '../../Service/data.service'
import { useNavigate } from 'react-router-dom'

export default function NewJob() {
  const navigate = useNavigate()
  const [jobs, setjobs] = useState([])
  useEffect(() => {
    jobService
      .getAllJob()
      .then((response) => {
        setjobs(response)
        dataService
          .postRelationJob(keyWords, response)
          .then((res) => setFilterJob(res))
          .catch((er) => console.log(er))
      })
      .then()
  }, [])

  let storedData = localStorage.getItem('keyw')
  const keyWords = JSON.parse(storedData).keyw

  const [filterJob, setFilterJob] = useState([])

  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 12
  const pageCount = Math.ceil(filterJob.length / itemsPerPage)
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected)
  }

  const displayItems = filterJob.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  return (
    <VStack fontFamily={'Montserrat'} mt={10} w={'80hv'}>
      <Box bgColor={'white'} w={['100%', '80%']}>
        <HStack alignItems='center' spacing={4}>
          <Icon as={AiOutlineAlert} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
          <Text fontWeight={'bold'} m={0} fontSize={['xl', '2xl']}>
            Công việc gợi ý
          </Text>
          <ReactPaginate
            className='question-panigate'
            pageCount={pageCount}
            onPageChange={handlePageChange}
            previousLabel='<'
            nextLabel='>'
            breakLabel='...'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName='pagination'
            pageClassName='page-item'
            pageLinkClassName='page-link'
            previousClassName='page-item'
            previousLinkClassName='page-link'
            nextClassName='page-item'
            nextLinkClassName='page-link'
            activeClassName='active'
          />
        </HStack>

        <Grid mt={5} templateColumns={['repeat(1, 1fr)', 'repeat(3, 1fr)']} gap={6}>
          {displayItems.map((job) => (
            <Card key={job.id} onClick={() => navigate(`/jobDetail/${job.id}`)} p={2} h={[150, 100]} direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
              <Image borderRadius={10} objectFit='cover' w={[120, 90]} src={job.image} alt='Caffe Latte' />
              <Stack>
                <CardBody>
                  <Text isTruncated>{job.name}</Text>
                  <HStack>
                    <Badge>{job.salary}</Badge>
                    <Badge>{job.location}</Badge>
                  </HStack>
                </CardBody>
              </Stack>
            </Card>
          ))}
        </Grid>
        <Stack w={'100%'} mt={10}></Stack>
      </Box>
    </VStack>
  )
}
