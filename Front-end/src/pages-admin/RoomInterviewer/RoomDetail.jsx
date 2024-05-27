import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Box ,Badge,Image} from '@chakra-ui/react'
import "./style2.css";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import { loadJob } from '../../redux/Job-posting/Action';
import uuid from "react-uuid";
import { Link} from "react-router-dom";
import {useParams} from "react-router-dom"
import { Text} from "@chakra-ui/react";
import { loadRoom, loadRoomIdJob } from '../../redux/Room/Action';
import { loadJobDetail } from '../../redux/JobDetail/Action';
import { loadInterviewer } from '../../redux/Interviewer/Action';
import { Header } from '../../Components-admin';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';
import { employeesData, candidateGrid } from '../../data/dummy';
import { StarIcon } from "@chakra-ui/icons";
import { hostName } from "../../global"; 
const RoomDetail = () => {
  const accessToken = JSON.parse(localStorage.getItem("data")).access_token;
 
    const params = useParams()
  
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(loadRoom());
      console.log("da call")
  }, []);
   

    const roomList = useSelector((store) => store.room.data);
    console.log("roomList",roomList)

    let thisRoom=[]
    roomList.map(i => {
      if(i.id==params.idRoom)
        {
          thisRoom.push(i)
        }
    })
    console.log("this room",thisRoom)

    const listCandidate= thisRoom.at(0).listCandidate;
    console.log("interviewer",listCandidate)


    const property = {
      imageUrl: 'https://bit.ly/2Z4KKcF',
      imageAlt: 'Rear view of modern home with pool',
      beds: 3,
      baths: 2,
      title: 'Modern home in city center in the heart of historic Los Angeles',
      formattedPrice: '$1,900.00',
      reviewCount: 34,
      rating: 4,
    }
   
 
  
  return (
    <div style={{margin:"20px"}}>
     {listCandidate.map(candidate => {
    return (
 
      <Link to={`/CandidateInfo/${candidate.candidateId}`}>
      <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <Image src={candidate.avatar} alt={property.imageAlt} />
  
        <Box p='6'>
          <Box display='flex' alignItems='baseline'>
            <Badge borderRadius='full' px='2' colorScheme='teal'>
            {candidate.status}
            </Badge>
          
          </Box>
  
          <Box
            mt='1'
            fontWeight='semibold'
            as='h4'
            lineHeight='tight'
            noOfLines={1}
          >
            {candidate.email}
          </Box>
  
          <Box>
           Tên: {candidate.name}
     
          </Box>
  
          <Box display='flex' mt='2' alignItems='center'>
            {Array(5)
              .fill('')
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < property.rating ? 'teal.500' : 'gray.300'}
                />
              ))}
            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
              {property.reviewCount} reviews
            </Box>
          </Box>
        </Box>
      </Box>
      </Link>
    );
   
  })
  }
  
    </div>
  );
};

export default RoomDetail;
