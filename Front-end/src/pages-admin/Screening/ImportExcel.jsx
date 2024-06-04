import React, { useCallback, useState } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Box, HStack, Text, Button, Table, Thead, Tr, Tbody, Th, Td } from '@chakra-ui/react'
import { AiOutlineDownload, AiOutlineUpload } from 'react-icons/ai'
import { useDropzone } from 'react-dropzone'
import { read, utils as XLSXUtils } from 'xlsx'
import { testService } from '../../Service/test.service'
import { ToastContainer, toast } from 'react-toastify'

export const ImportExcel = ({ testID, setLoad, load }) => {
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [excelData, setExcelData] = useState([])
  const [dropped, setDropped] = useState(false)

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result)
      try {
        const workbook = read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const excelData = XLSXUtils.sheet_to_json(worksheet, { header: 1 })

        setExcelData(excelData)
        setDropped(true)
      } catch (error) {
        console.error('File is not in Excel format:', error)
      }
    }

    reader.readAsArrayBuffer(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const convertData = ({ data, testId }) => {
    const formattedData = data.slice(1).map((row) => {
      const questionText = row[0]
      const options = [
        { optionText: row[1], answer: row[5] === 'option1' },
        { optionText: row[2], answer: row[5] === 'option2' },
        { optionText: row[3], answer: row[5] === 'option3' },
        { optionText: row[4], answer: row[5] === 'option4' },
      ]

      return {
        questionText,
        testId,
        options,
      }
    })

    return formattedData
  }

  const handleUpload = () => {
    convertData({ data: excelData, testId: testID }).map((item) => {
      handleSave({ form: item })
    })
  }

  const handleSave = ({ form }) => {
    testService
      .addQuestion(accessToken, form)
      .then((response) => {
        // toast.success(response.message)
        setLoad(!load)
      })
      .catch((er) => {
        console.log(er)
        toast.error('Something went wrong')
      })
  }

  const handleClick = () => {
    const fileUrl = 'https://docs.google.com/spreadsheets/d/1K4qGkhniOseT8z_k_74m0FujGSsEDLnO/edit#gid=1635696316'
    const link = document.createElement('a')
    link.href = fileUrl
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <Box
        backgroundColor={'#ffffff'}
        onClick={onOpen}
        borderRadius={5}
        pl={4}
        alignContent='center'
        h={50}
        overflow='hidden'
        fontWeight='bold'
        fontSize={14}
        boxShadow='lg'
        _hover={{
          backgroundColor: 'gray.200',
          cursor: 'pointer',
        }}
        w={'100%'}>
        <HStack pt={3} alignItems={'baseline'}>
          <AiOutlineUpload />
          <Text>Spreadsheet</Text>
        </HStack>
      </Box>

      <Modal size={'4xl'} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent fontFamily={'Montserrat'}>
          <ModalHeader>Nhập câu hỏi từ bảng tính</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box style={{ borderCollapse: 'collapse' }} overflow={'auto'} {...getRootProps()} borderRadius={0} h={500} borderWidth={1} w={'100%'}>
              {dropped ? (
                <Table fontSize={13} w={'100%'}>
                  <Thead>
                    <Tr>
                      {excelData[0].map((header, index) => (
                        <Th key={index}>{header}</Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {excelData.slice(1).map((row, rowIndex) => (
                      <Tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <Td key={cellIndex}>{cell}</Td>
                        ))}
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              ) : (
                <>
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <Text ml={30} fontSize={20}>
                      Thả tập tin vào đây...
                    </Text>
                  ) : (
                    <Text ml={180} mt={240} fontSize={20}>
                      Thả một số file vào đây, hoặc click để chọn file
                    </Text>
                  )}
                </>
              )}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleClick} color={'white'} backgroundColor={'#24e0a5'}>
              Tệp mẫu <AiOutlineDownload />
            </Button>
            <Button ml={5} onClick={onClose}>
              Đóng
            </Button>
            <Button ml={5} color={'white'} backgroundColor='rgb(3, 201, 215)' onClick={handleUpload}>
              Lưu
            </Button>
          </ModalFooter>
          <ToastContainer position='bottom-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />
        </ModalContent>
      </Modal>
    </>
  )
}
