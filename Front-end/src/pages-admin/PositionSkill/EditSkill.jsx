import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { skillPositionService } from '../../Service/skillPosition.service'
import { ToastContainer, toast } from 'react-toastify'
import { Header } from '../../Components-admin'
import { Button, Img, Input, Stack } from '@chakra-ui/react'

export const EditSkill = () => {
  const params = useParams()
  const [skill, setSkill] = useState({
    id: 0,
    skillName: 'name',
  })
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const navigate = useNavigate()

  const handleOnChange = (event) => {
    const { name, value } = event.target
    setSkill({ ...skill, [name]: value })
  }

  const handleOnUpdate = () => {
    skillPositionService
      .updateSkill(accessToken, skill, params.id)
      .then((res) => toast.info(res.message))
      .catch((err) => toast.error('something went wrong'))
  }

  useEffect(() => {
    skillPositionService
      .getSkillById(accessToken, params.id)
      .then((res) => {
        setSkill(res)
      })
      .catch((er) => toast.error('something went wrong'))
  }, [])

  return (
    <>
      <ToastContainer position='bottom-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />
      <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
        <Header category='Edit Skill' title='Skill' />

        <Stack spacing={5}>
          <Input name='title' value={skill.id} variant='outline' placeholder='id' disabled={true} />

          <Input name='skillName' variant='outline' value={skill.skillName} placeholder='skill name' onChange={handleOnChange} />

          <br />
        </Stack>
        <br />

        <br />

        <div className='mt-24'>
          <div className='flex flex-wrap lg:flex-nowrap justify-center '>
            <div className='mt-6'>
              <Button height='50px' color='white' bgColor='#97a4a6' text='Xem chi tiết' borderRadius='10px' onClick={() => navigate('/skill-position')}>
                Cancel
              </Button>
              <Button height='50px' color='white' bgColor='#03C9D7' text='Xem chi tiết' borderRadius='10px' onClick={handleOnUpdate}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
