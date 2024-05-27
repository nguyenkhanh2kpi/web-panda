import { Box, Text } from '@chakra-ui/react'
import React from 'react'

export const ResumeHelp = () => {
  return (
    <Box>
      Hướng dẫn
      <Text>
        - Các trường thông tin có dấu (*) là trường thông tin quan trọng bắt buộc, giúp Nhà tuyển
        dụng đánh giá ứng viên.
      </Text>
      <Text>
        - Chỉ điền vào thông tin bạn muốn hiển thị trong hồ sơ của bạn (trừ các trường bắt buộc),
        các trường để trống sẽ không được hiển thị trên CV.
      </Text>
      <Text>
        - Các mục: Thông tin cá nhân, Giới thiệu bản thân, Kinh nghiệm làm việc, Kỹ năng lập trình
        và Học vấn là 05 mục mặc định, không được tùy chỉnh thứ tự hiển thị trên CV. Các mục ở phần
        Thông tin khác có thể tùy chỉnh thứ tự và chọn Thêm/ Xóa.
      </Text>
      <Text>
        - Chọn Xem trước để xem các mẫu CV của bạn, chọn Mẫu và Lưu CV. Bạn cũng có thể tải xuống CV
        dưới dạng PDF.
      </Text>
    </Box>
  )
}
