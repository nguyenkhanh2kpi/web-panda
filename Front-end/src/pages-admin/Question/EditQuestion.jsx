import React, { useEffect, useState } from 'react'
import { Header } from '../../Components-admin'
import { MultiSelect, useMultiSelect } from 'chakra-multiselect'
import { Box, Button, Input, Select, Stack, Textarea } from '@chakra-ui/react'
import './style.css'
import { useNavigate, useParams } from 'react-router-dom'
import { skillPositionService } from '../../Service/skillPosition.service'
import { ToastContainer, toast } from 'react-toastify'
import { questionService } from '../../Service/question.service'

const ComponentMultiselect = ({ items, title, onChange, name, defaultValue }) => {
  const {
    value,
    options,
    onChange: onInternalChange,
  } = useMultiSelect({
    value: defaultValue,
    options: items,
  })

  useEffect(() => {
    if (onChange) {
      onChange(value, name)
    }
  }, [value])

  return (
    <MultiSelect
      selectedListProps={{
        maxH: 50,
        overflow: 'auto',
      }}
      options={options}
      value={value}
      label={title}
      onChange={onInternalChange}
    />
  )
}

export const EditQuestion = () => {
  const params = useParams()
  const naigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [positions, setPosition] = useState([])
  const [skills, setSkill] = useState([])
  const [form, setForm] = useState({
    id: 0,
    question: '',
    answer: '',
    positionIds: [],
    skillIds: [],
    fieldEnum: '',
  })
  const handleOnChange = (e) => {
    const { name, value } = e.target
    setForm((form) => ({ ...form, [name]: value }))
  }

  const handleOnChangeMultiSkill = (newValue, name) => {
    setForm({
      ...form,
      [name]: newValue.map((v) => parseInt(v.value, 10)),
    })
  }

  const handleSubmit = () => {
    console.log(JSON.stringify(form))
    questionService
      .putQuestion(accessToken, form)
      .then((res) => toast.info(res.message))
      .catch((er) => toast.error("something went wrong"))
  }

  useEffect(() => {
    skillPositionService
      .getSkill(accessToken)
      .then((res) => setSkill(res))
      .catch((er) => toast.error("something went wrong"))
    skillPositionService
      .getPosition(accessToken)
      .then((res) => setPosition(res))
      .catch((er) => toast.error("something went wrong"))
    questionService
      .getQuestionByID(accessToken, params.id)
      .then((response) => {
        setForm(response)
      })
      .catch((error) => toast.error("something went wrong"))
  }, [])

  // console.log(JSON.stringify(form));
  return (
    <>
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
      <div
        style={{ fontFamily: 'Montserrat' }}
        className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
        <Header title='Edit Question' />
        <div className='container' style={{ display: 'flex' }}>
          <Box w='50%'>
            <Stack spacing={5}>
              <label>Question :</label>

              <Textarea
                name='question'
                placeholder='Question ?'
                value={form.question}
                onChange={handleOnChange}
              />
              <label>Answer :</label>
              <Textarea
                name='answer'
                placeholder='Answer'
                value={form.answer}
                onChange={handleOnChange}
              />
              <label>Field :</label>
              <Select name='fieldEnum' onChange={handleOnChange} value={form.fieldEnum}>
                <option value='SoftSkill'>Soft Skill</option>
                <option value='TechSkill'>Teachnical</option>
                <option value='Language'>English</option>
                <option value=''>---</option>
              </Select>

              <br />
            </Stack>
          </Box>
          {skills.length > 0 && form.id != 0 && (
            <>
              <Stack spacing={5} className='right-input'>
                <ComponentMultiselect
                  defaultValue={form.skillIds.map((id) => {
                    return {
                      label: skills.find((p) => p.id === id).skillName,
                      value: id.toString(),
                    }
                  })}
                  name='skillIds'
                  items={skills.map((skill) => ({
                    label: skill.skillName,
                    value: skill.id.toString(),
                  }))}
                  title='Choose Skill'
                  onChange={handleOnChangeMultiSkill}
                />
              </Stack>
            </>
          )}
          {positions.length > 0 && form.id != 0 && (
            <>
              <Stack spacing={5} className='right-input'>
                <ComponentMultiselect
                  defaultValue={form.positionIds.map((id) => {
                    return {
                      label: positions.find((p) => p.id === id).positionName,
                      value: id.toString(),
                    }
                  })}
                  name='positionIds'
                  items={positions.map((position) => ({
                    label: position.positionName,
                    value: position.id.toString(),
                  }))}
                  title='Choose Position'
                  onChange={handleOnChangeMultiSkill}
                />
              </Stack>
            </>
          )}
        </div>
        <Button
          ml={6}
          className='back-button'
          color='white'
          bgColor='#97a4a6'
          text='Xem chi tiết'
          borderRadius='10px'
          onClick={() => naigate('/question')}>
          Back
        </Button>
        <Button
          color='white'
          bgColor='#03C9D7'
          text='Xem chi tiết'
          borderRadius='10px'
          onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </>
  )
}
