import { Box, Button, Flex, HStack, Icon, Stack, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineAlert, AiOutlineGithub, AiFillBank, AiFillApple, AiFillCodeSandboxCircle, AiFillCrown, AiFillExperiment, AiFillFileText, AiFillFire, AiFillGift, AiFillHome, AiFillSafetyCertificate } from 'react-icons/ai'

const industries = [
  { name: 'IT - Phần mềm', color: 'blue', icon: AiFillCodeSandboxCircle },
  { name: 'Kế toán / Kiểm toán', color: 'green', icon: AiFillFileText },
  { name: 'Luật', color: 'red', icon: AiFillSafetyCertificate },
  { name: 'Bảo hiểm', color: 'purple', icon: AiFillCrown },
  { name: 'Bất động sản', color: 'teal', icon: AiFillHome },
  { name: 'Dược phẩm / Y tế / Công nghệ sinh học', color: 'cyan', icon: AiFillExperiment },
  { name: 'Internet / Online', color: 'pink', icon: AiOutlineGithub },
  { name: 'Marketing / Truyền thông / Quảng cáo', color: 'yellow', icon: AiFillGift },
  { name: 'Nhà hàng / Khách sạn', color: 'orange', icon: AiFillApple },
  { name: 'In ấn / Xuất bản', color: 'blue', icon: AiOutlineGithub },
  { name: 'Bán lẻ - Hàng tiêu dùng - FMCG', color: 'green', icon: AiFillFire },
  { name: 'Sản xuất', color: 'red', icon: AiOutlineGithub },
  { name: 'Chứng khoán', color: 'purple', icon: AiFillBank },
  { name: 'Xây dựng', color: 'teal', icon: AiOutlineGithub },
  { name: 'Ngân hàng', color: 'cyan', icon: AiFillBank },
  { name: 'Nhân sự', color: 'pink', icon: AiOutlineGithub },
  { name: 'Thiết kế / Kiến trúc', color: 'yellow', icon: AiOutlineGithub },
  { name: 'Môi trường', color: 'orange', icon: AiOutlineGithub },
  { name: 'Xuất nhập khẩu', color: 'blue', icon: AiOutlineGithub },
  { name: 'Bảo trì / Sửa chữa', color: 'green', icon: AiOutlineGithub },
  { name: 'Điện tử / Điện lạnh', color: 'red', icon: AiOutlineGithub },
  { name: 'Thời trang', color: 'purple', icon: AiOutlineGithub },
  { name: 'Cơ khí', color: 'teal', icon: AiOutlineGithub },
  { name: 'Tư vấn', color: 'cyan', icon: AiOutlineGithub },
  { name: 'Viễn thông', color: 'pink', icon: AiOutlineGithub },
  { name: 'Giáo dục / Đào tạo', color: 'yellow', icon: AiOutlineGithub },
  { name: 'Thương mại điện tử', color: 'orange', icon: AiOutlineGithub },
  { name: 'Logistics - Vận tải', color: 'blue', icon: AiOutlineGithub },
  { name: 'Tổ chức phi lợi nhuận', color: 'green', icon: AiOutlineGithub },
  { name: 'Cơ quan nhà nước', color: 'red', icon: AiOutlineGithub },
  { name: 'Du lịch', color: 'purple', icon: AiOutlineGithub },
  { name: 'Tự động hóa', color: 'teal', icon: AiOutlineGithub },
  { name: 'Agency (Design/Development)', color: 'cyan', icon: AiOutlineGithub },
  { name: 'Agency (Marketing/Advertising)', color: 'pink', icon: AiOutlineGithub },
  { name: 'Năng lượng', color: 'yellow', icon: AiOutlineGithub },
  { name: 'Giải trí', color: 'orange', icon: AiOutlineGithub },
  { name: 'IT - Phần cứng', color: 'blue', icon: AiOutlineGithub },
  { name: 'Nông Lâm Ngư nghiệp', color: 'green', icon: AiOutlineGithub },
  { name: 'Tài chính', color: 'red', icon: AiOutlineGithub },
  { name: 'Khác', color: 'purple', icon: AiOutlineGithub },
]
export default function ListIndustry() {
  return (
    <VStack fontFamily={'Montserrat'} w={'80hv'}>
      <Box borderRadius={10} overflow={'hidden'} position='relative' w='80%' bgColor={'white'}>
        <HStack alignItems='center' spacing={4} p={4}>
          <Icon as={AiOutlineAlert} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
          <Text fontWeight={'bold'} m={0} fontSize='2xl'>
            Ngành nghề
          </Text>
        </HStack>
        <Wrap spacing={4} p={4}>
          {industries.map((industry, index) => (
            <WrapItem key={index}>
              <Button leftIcon={<Icon as={industry.icon} />} colorScheme={industry.color} variant='solid'>
                {industry.name}
              </Button>
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </VStack>
  )
}
