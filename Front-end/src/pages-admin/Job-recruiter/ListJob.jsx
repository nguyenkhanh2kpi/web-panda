import { Box, Button, Checkbox, HStack, Image, Input, Link, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Header } from '../../Components-admin'

const data = [
  {
    id: 1,
    name: 'java developer',
    position: 'senior',
    language: 'English',
    location: 'Hồ Chí Minh',
    salary: '100000',
    number: '3',
    workingForm: 'Toàn thời gian',
    sex: 'nam',
    experience: 'Không yêu cầu',
    detailLocation: 'hcm',
    detailJob: 'aaa',
    requirements: 'ss',
    interest: 'sss',
    image: 'https://firebasestorage.googleapis.com/v0/b/quanlytuyendung-4fb2c.appspot.com/o/1700823708931_thong-ke-cac-vu-bat-giu-van-chuyen-buon-ban-trai-phep-te-te-tai-viet-nam-tu-nam-2015-2019-nguon-co-quan-tham-quyen-quan-ly-cites-viet-nam-cites-ma.jpg?alt=media',
    status: true,
    listCandidate: null,
    user_id: 3,
  },
  {
    id: 2,
    name: 'reactjs',
    position: 'senior',
    language: 'English',
    location: 'a',
    salary: '100000',
    number: '3',
    workingForm: 'full time',
    sex: 'nam',
    experience: 'Không yêu cầu',
    detailLocation: 'hcm',
    detailJob: 'a',
    requirements: 'a',
    interest: 's',
    image: 'https://firebasestorage.googleapis.com/v0/b/quanlytuyendung-4fb2c.appspot.com/o/1700828038171_1900s.png?alt=media',
    status: true,
    listCandidate: null,
    user_id: 3,
  },
]

export const ListJob = () => {
  return (
    <Box backgroundColor={'#e9f3f5'} p={30} overflow='hidden'>
      <Text mb={10} fontSize={30} fontWeight={'bold'}>
        Manage JobPosts
      </Text>
      <HStack>
        <Box overflow={'auto'} h={900} p={4} borderRadius={20} w={'30%'} backgroundColor={'#ffffff'}>
          <Text fontSize={18} fontWeight={'bold'}>
            Các bài tuyển dụng trước đó
          </Text>
          <VStack w={'100%'}>
            {/* item */}
            {data.map((item) => (
              <Box mt={2} borderWidth={1} p={2} borderRadius={10} w={'100%'}>
                <HStack>
                  <Image w={100} h={100} borderRadius={10} objectFit='cover' src={item.image} alt='JD' />
                  <VStack p={2} w={'100%'}>
                    <Text fontWeight={'black'} w={'100%'}>
                      {item.name}
                    </Text>
                    <Text w={'100%'} p={1} borderRadius={10} backgroundColor={'#f0fbff'}>
                      {item.salary}
                    </Text>
                    <Text w={'100%'} p={1} borderRadius={10} backgroundColor={'#a0faee'}>
                      {item.status ? 'True' : 'False'}
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            ))}

            {/* end item */}
          </VStack>
        </Box>

        {/* form */}
        <Box h={900} p={4} borderRadius={20} w={'70%'} backgroundColor={'#ffffff'}>
          <Text fontSize={18} fontWeight={'bold'}>
            Đăng tuyển dụng
          </Text>
          <VStack m={5} w={'90%'}>

            <VStack w={'100%'} p={2}>
              <Text w={'100%'} fontWeight={'black'}>
                Name:
              </Text>
              <Input placeholder='Basic usage' />
            </VStack>

            <VStack w={'100%'} p={2}>
              <Text w={'100%'} fontWeight={'black'}>
                Địc chỉ làm việc:
              </Text>
              <Input placeholder='Basic usage' />
            </VStack>

            <VStack w={'100%'}>
              <HStack w={"100%"}>
                <VStack w={'100%'} p={2}>
                  <Text w={'100%'} fontWeight={'black'}>
                    Mức lương:
                  </Text>
                  <Input placeholder='Basic usage' />
                </VStack>
                <VStack w={'100%'} p={2}>
                  <Text w={'100%'} fontWeight={'black'}>
                    Hình thức làm việc:
                  </Text>
                  <Input placeholder='Basic usage' />
                </VStack>
              </HStack>
            </VStack>

            <VStack w={'100%'}>
              <HStack w={"100%"}>
                <VStack w={'100%'} p={2}>
                  <Text w={'100%'} fontWeight={'black'}>
                    Giới tính:
                  </Text>
                  <Input placeholder='Basic usage' />
                </VStack>
                <VStack w={'100%'} p={2}>
                  <Text w={'100%'} fontWeight={'black'}>
                    Số lượng:
                  </Text>
                  <Input placeholder='Basic usage' />
                </VStack>
              </HStack>
            </VStack>

            <VStack w={'100%'}>
              <HStack w={"100%"}>
                <VStack w={'100%'} p={2}>
                  <Text w={'100%'} fontWeight={'black'}>
                    Vị trí:
                  </Text>
                  <Input placeholder='Basic usage' />
                </VStack>
                <VStack w={'100%'} p={2}>
                  <Text w={'100%'} fontWeight={'black'}>
                    Kinh nghiệm:
                  </Text>
                  <Input placeholder='Basic usage' />
                </VStack>
              </HStack>
            </VStack>

            <VStack w={'100%'} p={2}>
              <Text w={'100%'} fontWeight={'black'}>
                Mô tả:
              </Text>
              <Input type='text' placeholder='Basic usage' />
            </VStack>

            <VStack w={'100%'} p={2}>
              <Text w={'100%'} fontWeight={'black'}>
                Yêu cầu:
              </Text>
              <Input placeholder='Basic usage' />
            </VStack>

            <VStack w={'100%'} p={2}>
              <Text w={'100%'} fontWeight={'black'}>
                Quyền lợi:
              </Text>
              <Input placeholder='Basic usage' />
            </VStack>

            <VStack w={'100%'} p={2}>
              <Button>Đăng</Button>
            </VStack>



          </VStack>
        </Box>
        {/* end form */}
      </HStack>
    </Box>
  )
}
