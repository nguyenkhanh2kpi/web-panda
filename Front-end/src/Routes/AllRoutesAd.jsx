import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AdLogout, Ecommerce, Orders, Calendar, Interviewer, Stacked, Pyramid, Customers, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor, RoomList } from '../pages-admin'
import RoomAdd from '../pages-admin/RoomEdit/RoomAdd'
import RoomAddCandidate from '../pages-admin/RoomEdit/RoomAddCandidate'
import { K_Event } from '../pages-admin/K_Event/K_Event'
import { EventEdit } from '../pages-admin/K_Event/EventEdit'
import { EventAdd } from '../pages-admin/K_Event/EventAdd'
import JobPosting from '../Components-admin/Job-recruiter/Job-Posting'
import AllJob from '../Components-admin/Job-recruiter/AllJob'
import JobDetailRecruiter from '../Components-admin/Job-recruiter/JobDetail'
import UserInfo from '../Components-admin/UserInfo/UserInfo'
import { PositionSkill } from '../pages-admin/PositionSkill/PositionSkill'
import { EditSkill } from '../pages-admin/PositionSkill/EditSkill'
import { AddSkill } from '../pages-admin/PositionSkill/AddSkill'
import { AddPosition } from '../pages-admin/PositionSkill/AddPosition'
import { EditPosition } from '../pages-admin/PositionSkill/EditPosition'
import { Question } from '../pages-admin/Question/Question'
import RoomListInterviewer from '../pages-admin/RoomInterviewer/RoomListInterviewer'
import RoomDetail from '../pages-admin/RoomInterviewer/RoomDetail'
import { AddQuestion } from '../pages-admin/Question/AddQuestion'
import { EditQuestion } from '../pages-admin/Question/EditQuestion'
import { Interview } from '../pages-admin/Interview/Interview'
import CandidateInfo from '../pages-admin/CandidateInfo/CandidateInfo'
import { RoomEditInfomation } from '../pages-admin/RoomEdit/RoomEditInfomation'
import { AdminCalendar } from '../pages-admin/GoogleCalendar/AdminCalendar'
import { MarkCandidate } from '../pages-admin/MarkCandidate/MarkCandidate'
import InterviewerListRoom from '../pages-admin/MarkCandidate/InterviewerListRoom'
import { MyCompany } from '../pages-admin/MyCompany/MyCompany'
import { ManageInterviewer } from '../pages-admin/ManageInterviewer/ManageInterviewer'
import { ListJob } from '../pages-admin/Job-recruiter/ListJob'
import { Companies } from '../pages-admin/Companies/Companies'
import { InterviewResult } from '../pages-admin/ResultInterview/InterviewResult'
import Screening from '../pages-admin/Screening/Screening'
import TestAddForm from '../pages-admin/Screening/TestAddForm'
import Process from '../pages-admin/Process/Process'
import { ProcessItem } from '../pages-admin/Process/ProcessItem'
import { SceningProcess } from '../pages-admin/Process/SceningProcess'
import { Vip } from '../pages-admin/Vip/Vip'
import { VipCart } from '../pages-admin/Vip/VipCart'
import { MyBills } from '../pages-admin/Vip/MyBills'
import { LoadingComponent } from '../Components-admin/LoadingComponent'
import Message from '../Components/Message/Message'
import MessageAdmin from '../pages-admin/MessageAdmin/MessageList'
import UserInfo1 from '../Components/UserInfo/UserInfo1'
import { SearchCandidate } from '../pages-admin/SearchCandidate/SearchCandidate'

const AllRoutesAd = () => {
  return (
    <Routes>
      {/* dashboard  */}
      <Route path='/userInfo/' element={<UserInfo />} />
      <Route path='/userInfo1/' element={<UserInfo1 />} />
      <Route path='/allJob_Recruiter/jobDetail_Recruiter/:id' element={<JobDetailRecruiter />} />
      <Route path='/allJob_Recruiter/' element={<AllJob />} />
      <Route path='/allJob_Recruiter/job-posting/' element={<JobPosting />} />
      <Route path='/list-job/' element={<ListJob />} />

      <Route path='/user-account/' element={<Customers />} />

      <Route path='/' element={<Ecommerce />} />
      <Route path='/AdLogout' element={<AdLogout />} />

      <Route path='/ecommerce' element={<Ecommerce />} />
      <Route path='/roomAdd' element={<RoomAdd />} />
      <Route path='/roomList' element={<RoomList />} />
      <Route path='/roomListInterviewer' element={<RoomListInterviewer />} />
      <Route path='/RoomDetailInterviewer/:id/:idRoom' element={<RoomDetail />} />
      <Route path='/candidateInfo/:id' element={<CandidateInfo />} />

      {/* pages  */}
      <Route path='/orders' element={<Orders />} />
      <Route path='/interviewer' element={<Interviewer />} />
      <Route path='/companies' element={<Companies />} />

      {/* apps  */}
      <Route path='/kanban' element={<Kanban />} />
      <Route path='/editor' element={<Editor />} />
      <Route path='/calendar' element={<Calendar />} />
      <Route path='/color-picker' element={<ColorPicker />} />

      {/* charts  */}
      <Route path='/line' element={<Line />} />
      <Route path='/area' element={<Area />} />
      <Route path='/bar' element={<Bar />} />
      <Route path='/pie' element={<Pie />} />
      <Route path='/financial' element={<Financial />} />
      <Route path='/color-mapping' element={<ColorMapping />} />
      <Route path='/pyramid' element={<Pyramid />} />
      <Route path='/stacked' element={<Stacked />} />

      {/* khanh */}
      <Route path='/event' element={<K_Event />} />
      <Route path='/event/add' element={<EventAdd />} />
      <Route path='/event/edit/:id' element={<EventEdit />} />
      <Route path='/skill-position' element={<PositionSkill />} />
      <Route path='/edit-skill/:id' element={<EditSkill />} />
      <Route path='/add-skill' element={<AddSkill />} />
      <Route path='/add-position' element={<AddPosition />} />
      <Route path='/edit-position/:id' element={<EditPosition />} />
      <Route path='/question' element={<Question />} />
      <Route path='/question/add' element={<AddQuestion />} />
      <Route path='/question/edit/:id' element={<EditQuestion />} />
      <Route path='/interview' element={<Interview />} />
      {/* khanh */}
      <Route path='/addCandidate/:id/:idRoom' element={<RoomEditInfomation />} />
      <Route path='/calendar-admin' element={<AdminCalendar />} />
      <Route path='/mark-candidate/:roomId' element={<MarkCandidate />} />
      <Route path='/interviewer-list-room' element={<InterviewerListRoom />} />
      <Route path='/my-company' element={<MyCompany />} />
      <Route path='/my-company/:tab' element={<MyCompany />} />
      <Route path='/manage-interviewer' element={<ManageInterviewer />} />

      <Route path='/result' element={<InterviewResult />} />
      {/* <Route path='/screening' element={<Screening />} />
      <Route path='/screening-test/:id' element={<TestAddForm />} /> */}
      {/* process */}
      <Route path='/process' element={<Process />} />
      <Route path='/process/item/:jobId' element={<ProcessItem />} />
      <Route path='/process/item/:jobId/:tab' element={<ProcessItem />} />
      <Route path='/process/step/screening-resume/:jobId' element={<SceningProcess />} />
      <Route path='/process/screening/:jobId' element={<Screening />} />
      <Route path='/process/screening-test/:id' element={<TestAddForm />} />
      <Route path='/vip' element={<Vip />} />
      <Route path='/vip/my-bills' element={<MyBills />} />
      <Route path='/vip/cart/:packId' element={<VipCart />} />
      <Route path='/loading' element={<LoadingComponent />} />

      <Route path='/messages' element={<MessageAdmin />} />
      <Route path='/search-candidate' element={<SearchCandidate />} />
    </Routes>
  )
}

export default AllRoutesAd
