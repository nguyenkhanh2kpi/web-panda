import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { Box, Flex, Text, Image } from '@chakra-ui/react'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import './Both.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadJob } from '../../redux/Job-posting/Action.js'
import uuid from 'react-uuid'
import { Link } from 'react-router-dom'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebase.js'
import { v4 } from 'uuid'
import { hostName } from '../../global.js'
const JobPosting = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    // getData(typeOfProduct).then((res) => setProductArr(res));
    dispatch(loadJob())
  }, [])

  const data = useSelector((store) => store.job.data)
  console.log(data.length)
  const jobList = data.slice(data.length - 3, data.length)
  const [passShow, setPassShow] = useState(false)
  const [cpassShow, setCPassShow] = useState(false)
  const navigate = useNavigate()

  // =============================================================================================================

  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [language, setLanguage] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')
  const [number, setNumber] = useState('')
  const [workingForm, setWorkingForm] = useState('')
  const [sex, setSex] = useState('')
  const [experience, setExperience] = useState('')
  const [detailLocation, setDetailLocation] = useState('')
  const [detailJob, setDetailJob] = useState('')
  const [requirements, setRequirements] = useState('')
  const [interest, setInterest] = useState('')
  const [image, setImage] = useState('')

  const handleUpload = (e) => {
    const storageRef = ref(storage, `/files/${e.target.files[0].name + v4()}`)
    uploadBytes(storageRef, e.target.files[0]).then((data) => {
      console.log(data)
      getDownloadURL(data.ref).then((url) => {
        setImage(url)
        console.log('image', url)
      })
    })
  }

  const HandleSubmit = async (e) => {
    e.preventDefault()
    if (name === '') {
      toast.warning('name is required!', {
        position: 'top-center',
      })
    } else if (position === '') {
      toast.error('position is required!', {
        position: 'top-center',
      })
    } else if (salary === '') {
      toast.error('salary is required!', {
        position: 'top-center',
      })
    } else if (workingForm === '') {
      toast.error('workingForm is required!', {
        position: 'top-center',
      })
    } else if (location === '') {
      toast.error('location is required!', {
        position: 'top-center',
      })
    } else if (language === '') {
      toast.error('language is required!', {
        position: 'top-center',
      })
    } else if (sex === '') {
      toast.error('sex is required!', {
        position: 'top-center',
      })
    } else if (number === '') {
      toast.error('number is required!', {
        position: 'top-center',
      })
    } else if (detailLocation === '') {
      toast.error('detailLocation is required!', {
        position: 'top-center',
      })
    } else if (experience === '') {
      toast.error('experience is required!', {
        position: 'top-center',
      })
    } else if (detailJob === '') {
      toast.error('detailJob is required!', {
        position: 'top-center',
      })
    } else if (requirements === '') {
      toast.error('requirements is required!', {
        position: 'top-center',
      })
    } else if (interest === '') {
      toast.error('interest is required!', {
        position: 'top-center',
      })
    } else if (image === null) {
      toast.error('image is required!', {
        position: 'top-center',
      })
    } else {
      try {
        console.log('image', image)
        const formData = new FormData()
        formData.append('file', image)

        const imageResponse = await axios.post(`${hostName}/file/upload`, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        const imageData = imageResponse.data.data

        console.log('hình anh tren firebase', imageResponse)
        let data = JSON.stringify({
          name,
          position,
          language,
          location,
          salary,
          number,
          workingForm,
          sex,
          experience,
          detailLocation,
          detailJob,
          requirements,
          interest,
          image: imageData,
        })

        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${hostName}/job-posting`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          data: data,
        }

        axios
          .request(config)
          .then((response) => {
            console.log('haha')
          })
          .catch((error) => {
            console.log(error)
            toast.error('Upload Job Failed', {
              position: 'top-center',
            })
          })

        toast.success('Upload Job Successfuly', {
          position: 'top-center',
        })
        window.location.replace(`/job-posting`)
      } catch (error) {}
    }
  }

  return (
    <>
      <session>
        <div className='main'>
          <div className='left_session'></div>
          <div className='form_data1'>
            <div className='form_heading'>
              <h2
                style={{
                  color: '#000000',
                  fontSize: '30px',
                }}>
                Đăng tin tuyển dụng
              </h2>
            </div>

            <form>
              <div className='form_input'>
                <label htmlFor='name'>Tên công việc</label>
                <input
                  type='text'
                  // value={email}
                  onChange={(e) => setName(e.target.value)}
                  name='name'
                  id='Name'
                />
              </div>

              <div className='form_input'>
                <label htmlFor='position'> Vị trí tuyển dụng</label>
                <input
                  type='position'
                  // value={username}
                  onChange={(e) => setPosition(e.target.value)}
                  name='position'
                  id='position'
                />
              </div>
              <div class='flex-container'>
                <div className='form_input flex'>
                  <label htmlFor='salary'>Mức lương</label>

                  <input
                    // value={password}
                    onChange={(e) => setSalary(e.target.value)}
                    type='text'
                    name='salary'
                    id='salary'
                  />
                </div>
                <div className='form_input flex'>
                  <label htmlFor='workingForm'>Hình thức làm việc</label>

                  <input
                    // value={password}
                    onChange={(e) => setWorkingForm(e.target.value)}
                    type='text'
                    name='workingForm'
                    id='workingForm'
                  />
                </div>
              </div>

              <div class='flex-container'>
                <div className='form_input flex'>
                  <label htmlFor='location'>Địa điểm</label>

                  <input
                    // value={password}
                    onChange={(e) => setLocation(e.target.value)}
                    type='text'
                    name='location'
                    id='location'
                  />
                </div>
                <div className='form_input flex'>
                  <label htmlFor='language'>Ngôn ngữ</label>

                  <input
                    // value={password}
                    onChange={(e) => setLanguage(e.target.value)}
                    type='text'
                    name='language'
                    id='language'
                  />
                </div>
              </div>

              <div class='flex-container'>
                <div className='form_input flex'>
                  <label htmlFor='sex'>Giới tính</label>

                  <input
                    // value={password}
                    onChange={(e) => setSex(e.target.value)}
                    type='text'
                    name='sex'
                    id='sex'
                  />
                </div>
                <div className='form_input flex'>
                  <label htmlFor='number'>Số lượng ứng tuyển</label>

                  <input
                    // value={password}
                    onChange={(e) => setNumber(e.target.value)}
                    type='text'
                    name='number'
                    id='number'
                  />
                </div>
              </div>

              <div class='flex-container'>
                <div className='form_input flex'>
                  <label htmlFor='detailLocation'>Địa chỉ làm việc </label>

                  <input
                    // value={password}
                    onChange={(e) => setDetailLocation(e.target.value)}
                    type='text'
                    name='detailLocation'
                    id='detailLocation'
                  />
                </div>
                <div className='form_input flex'>
                  <label htmlFor='experience'>Kinh nghiệm</label>

                  <input
                    // value={password}
                    onChange={(e) => setExperience(e.target.value)}
                    type='text'
                    name='experience'
                    id='experience'
                  />
                </div>
              </div>

              <div className='form_input'>
                <label htmlFor='detailJob'>Mô tả công việc</label>
                <div className='two'>
                  <textarea
                    style={{ width: '100%' }}
                    // value={confirmpassword}
                    onChange={(e) => setDetailJob(e.target.value)}
                    type='text'
                    name='detailJob'
                    id='detailJob'
                  />
                </div>
              </div>

              <div className='form_input'>
                <label htmlFor='requirements'>Yêu cầu ứng viên</label>
                <div className='two'>
                  <textarea
                    style={{ width: '100%' }}
                    // value={confirmpassword}
                    onChange={(e) => setRequirements(e.target.value)}
                    type='text'
                    name='requirements'
                    id='requirements'
                  />
                </div>
              </div>

              <div className='form_input'>
                <label htmlFor='interest'>Quyền lợi</label>
                <div className='two'>
                  <textarea
                    style={{ width: '100%' }}
                    // value={confirmpassword}
                    onChange={(e) => setInterest(e.target.value)}
                    type='text'
                    name='interest'
                    id='interest'
                  />
                </div>
              </div>

              <div className='form_input'>
                <label htmlFor='image'>Thêm hình ảnh</label>
                <input
                  type='file'
                  // value={email}
                  onChange={(e) => setImage(e.target.files[0])}
                  name='image'
                  id='image'
                />
              </div>

              <button onClick={HandleSubmit} className='btn3'>
                Đăng tin
              </button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </session>
    </>
  )
}

export default JobPosting
