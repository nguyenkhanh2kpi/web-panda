import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Companies from '../Components/Companies/Companies'
import CompanyProfile from '../Components/Companies/CompanyProfile'
import CreateCompany from '../Components/Companies/CreateCompany'
import HomePage from '../Components/Homepage/HomePage'
import JobDetail from '../Components/Jobs/JobDetail'
import JobPage from '../Components/Jobs/JobPage'
import Login from '../Components/Login/Login'
import MainHomepage from '../Components/MainHome/MainHomepage'
import ServicesPage from '../Components/Services/ServicesPage'
import Signup from '../Components/Signup/Signup'
import Verify from '../Components/Signup/verify'
import Logout from '../Components/Logout/Logout'
import UserInfo from '../Components/UserInfo/UserInfo'
import { Events } from '../Components/Events/Event'
import { EventDetailHome } from '../Components/Events/EventDetailHome'
import { CurriculumVitae } from '../Components/CVBuild/CurriculumVitae'
import ResetPassword from '../Components/ResetPassword/ResetPassword'
import VerifyPassword from '../Components/ResetPassword/verify'
import ChangePassword from '../Components/ResetPassword/ChangePassword'
import Message from '../Components/Message/Message'
import { ResumeProfile } from '../Components/ResumeProfile/ResumeProfile'
import { TestMain } from '../Components/Test/TestMain'
import { TestList } from '../Components/Test/TestList'
import UserInfo1 from '../Components/UserInfo/UserInfo1'
import { ChangeUsePassword } from '../Components/UserInfo/ChangeUsePassword'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/userInfo/' element={<UserInfo />} />
      <Route path='/userInfo1/' element={<UserInfo1 />} />
      <Route path='/change-password' element={<ChangeUsePassword />} />
      <Route path='/verify/:email/' element={<Verify />} />
      <Route path='/verifyResetPW/:email/' element={<VerifyPassword />} />
      <Route path='/changePassword/:id/:otp/' element={<ChangePassword />} />
      <Route path='/jobDetail/:id' element={<JobDetail />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/' element={<HomePage />} />
      <Route path='/companies' element={<Companies />} />
      <Route path='/companies/:id' element={<CompanyProfile />} />
      <Route path='/create' element={<CreateCompany />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/resetPassword' element={<ResetPassword />} />
      <Route path='/mainhome' element={<MainHomepage />} />
      <Route path='/jobpage' element={<JobPage />} />
      <Route path='/jobpage-search/:keyword/:location/:experience/:salary' element={<JobPage />} />
      <Route path='/jobpage-search/:location/:experience/:salary' element={<JobPage />} />
      <Route path='/jobpage/:jobId' element={<JobDetail />} />
      <Route path='/services' element={<ServicesPage />} />
      <Route path='/events' element={<Events />} />
      <Route path='/event/:id' element={<EventDetailHome />} />
      <Route path='/cv-build' element={<CurriculumVitae />} />
      <Route path='/messages' element={<Message />} />
      <Route path='/resume' element={<ResumeProfile />} />
      <Route path='/test' element={<TestList />} />
      <Route path='/test-record/:id' element={<TestMain />} />
    </Routes>
  )
}

export default AllRoutes
