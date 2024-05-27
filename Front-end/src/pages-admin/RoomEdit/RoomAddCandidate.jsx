import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style3.css";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { loadJob } from '../../redux/Job-posting/Action';
import uuid from "react-uuid";
import { Link} from "react-router-dom";
import {useParams} from "react-router-dom"
import { Text} from "@chakra-ui/react";
import { loadRoom } from '../../redux/Room/Action';
import { loadJobDetail } from '../../redux/JobDetail/Action';
import { loadInterviewer } from '../../redux/Interviewer/Action';
import { hostName, webHost } from "../../global";
const RoomAddCandidate = () => {


    const params = useParams()
  
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadJobDetail(params.id));
      },[params.id]);

    useEffect(() => {
        dispatch(loadRoom());
        console.log("da call")
    }, []);


    useEffect(() => {
      dispatch(loadInterviewer());
      console.log("da call")
  }, []);
  
  
    const data = useSelector((store) => store.jobDetail.data);
  console.log(data.listCandidate)

    const roomList = useSelector((store) => store.room.data);
    console.log("roomList",roomList)
    
    const interviewrList = useSelector((store) => store.interviewer.data);
    console.log("roomList",roomList)
   


  let thisRoom=[]
  roomList.map(i => {
    if(i.id==params.idRoom)
      {
        thisRoom.push(i)
      }
  })
  console.log("this room",thisRoom)

  const [roomName, setRoomName] = useState(thisRoom.at(0).roomName);
  const [roomSkill, setRoomSkill] = useState(thisRoom.at(0).roomSkill);
  const [roomDescription, setRoomDescription] = useState(thisRoom.at(0).roomDescription);
  const [startDate, setStartDate] = useState(thisRoom.at(0).startDate);
  const [endDate, setEndDate] = useState(thisRoom.at(0).endDate);
  const [linkMeet, setLinkMeet] = useState(thisRoom.at(0).linkMeet);
  // =============================================================================================================

  const [emailInterviewer, setEmailInterviewer] = useState(roomList.at(0).status);

    // =============================================================================================================
  const accessToken = JSON.parse(localStorage.getItem("data")).access_token;
  const [id, setId] = useState("");
  const handleSubmitEditRoom = async (e) => {
    e.preventDefault();
    try {
      let data = JSON.stringify(
          {
            "roomId": params.idRoom,
            "roomName": roomName,
            "skill":roomSkill,
            "description": roomDescription,
            "startDate": startDate,
            "endDate": endDate,
            "linkMeet":linkMeet
            }
      );

      let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${hostName}/interview`,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${accessToken}`
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log("haha");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Update Room Failed", {
          position: "top-center",
        });
      });

      toast.success("Update Room Successfuly", {
        position: "top-center",
      });
      window.location.replace(`${webHost}/roomList`);
    } catch (error) {
     
    }
  }

    // =============================================================================================================
  const handleSubmitCandidate = async (e) => {
    e.preventDefault();
   
      try {
        let data = JSON.stringify(
            {
                "candidateId": id,
                "interviewId": params.idRoom,
                "date": "string",
                "time": "string",
                "description": "string"
              }
        );
  
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${hostName}/interview/candidateAssign`,
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${accessToken}`
          },
          data : data
        };
        
        axios.request(config)
        .then((response) => {
          console.log("haha");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Upload Candidate Failed", {
            position: "top-center",
          });
        });
  
        toast.success("Upload Candidate Successfuly", {
          position: "top-center",
        });
        window.location.replace(`${webHost}/roomList`);
      } catch (error) {
       
      }
    }



    // =============================================================================================================
  const handleSubmitInterviewer = async (e) => {
    e.preventDefault();
   
      try {
        let data = JSON.stringify(
            {
              "interviewerEmail": emailInterviewer,
              "roomId": params.idRoom
              }
        );
  
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${hostName}/interview/interviewerAssign`,
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${accessToken}`
          },
          data : data
        };
        
        axios.request(config)
        .then((response) => {
          console.log("haha");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Upload Interviewer Failed", {
            position: "top-center",
          });
        });
  
        toast.success("Upload Interviewer Successfuly", {
          position: "top-center",
        });
        window.location.replace(`${webHost}/roomList`);
      } catch (error) {
       
      }
    }
  


  return (
    <>
      <session>
        <div className="main">
        
          <div className="form_data1" style={{height:'300px  !important'}}>
            <div className="form_heading">
              <h2
                style={{
                  color: "#000000",
                  fontSize: "30px",
                }}
              >
               Thêm ứng viên
              </h2>
            </div>

            
            <form>
            
              <div className="form_input ">
                  <label htmlFor="name" style={{display:"block"}}>Tên công việc</label>
                  <Text  ml='10px'> {data.name}</Text>
                  
              </div>
              
              <div className="form_input">
                <label htmlFor="name" style={{display:"block"}}>Tên ứng viên</label>

                {data.listCandidate===null?
                <div>
                    <option></option>
                </div>:
                <select style={{marginTop:"10px",marginBottom:"10px"}} onChange={(e) => 
                 { console.log(e.target.value)
                    setId(e.target.value)}}
                  >
                  {data.listCandidate?.map((i)=>{
                    return <option style={{width:"100px"}} value={i.userId}>{i.userId}{i.fullName}</option>
                  })
                  }
                    <option></option>
                </select>
                }
              </div>
              <button onClick={handleSubmitCandidate} className="btn3">
                Thêm ứng viên
              </button>
            </form>

            <hr  style={{
                color: '#000000',
                backgroundColor: '#000000',
                height: .5,
                borderColor : '#000000',
                margin:"40px"
            }}/>
            
            <div className="form_heading">
              <h2
                style={{
                  color: "#000000",
                  fontSize: "30px",
                }}
              >
               Thêm người phỏng vấn
              </h2>
            </div>



            
            <form>
            
            
              <div className="form_input">
                <label htmlFor="name" style={{display:"block"}}>Người phỏng vấn</label>

                {interviewrList===null?
                <div>
                    <option></option>
                </div>:
                <select style={{marginTop:"10px",marginBottom:"10px"}} onChange={(e) => 
                 { console.log(e.target.value)
                    setEmailInterviewer(e.target.value)}}
                  >
                  {interviewrList?.map((i)=>{
                    return <option style={{width:"100px"}} value={i.email}>{i.fullName}</option>
                  })
                  }
                    <option></option>
                </select>
                }
              </div>
              <button onClick={handleSubmitInterviewer} style={{width:"250px"}}className="btn3">
                Thêm Người phỏng vấn
              </button>
            </form>



            <hr  style={{
                color: '#000000',
                backgroundColor: '#000000',
                height: .5,
                borderColor : '#000000',
                margin:"40px"
            }}/>

            <div className="form_heading">
              <h2
                style={{
                  color: "#000000",
                  fontSize: "30px",
                }}
              >
             Chính sửa phòng
              </h2>
            </div>


            <form>
            <div className="form_input">
                <label htmlFor="position">Tên phòng họp</label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  name="position"
                  id="position"
                />
              </div>
              <div className="form_input">
                <label htmlFor="position">Kỹ năng phòng</label>
                <input
                  type="text"
                  value={roomSkill}
                  onChange={(e) => setRoomSkill(e.target.value)}
                  name="position"
                  id="position"
                />
              </div>

              <div className="form_input">
                <label htmlFor="position">Mô tả phòng</label>
                <input
                  type="text"
                  value={roomDescription}
                  onChange={(e) => setRoomDescription(e.target.value)}
                  name="position"
                  id="position"
                />
              </div>


              <div className="form_input">
                <label htmlFor="position">Ngày bắt đầu </label>
                <input
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  name="position"
                  id="position"
                />
              </div>

              

      

              <div className="form_input">
                <label htmlFor="position">Ngày kết thúc</label>
                <input
                  type="text"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  name="position"
                  id="position"
                />
              </div>

            

              <div className="form_input">
                <label htmlFor="position">Link Meet phòng</label>
                <input
                  type="text"
                  value={linkMeet}
                  onChange={(e) => setLinkMeet(e.target.value)}
                  name="position"
                  id="position"
                />
              </div>
             
              <button onClick={handleSubmitEditRoom} className="btn3">
                Chỉnh sửa
              </button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </session>
    </>
  );
};

export default RoomAddCandidate;
