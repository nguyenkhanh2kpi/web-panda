import { hostName } from '../../global';
import {
    INTERVIEWER_REQUERST,
    INTERVIEWER_SUCCESS,
    INTERVIEWER_ERROR
} from './ActionType';
import axios from "axios";


export const loadInterviewer=()=>async (dispatch)=>{

    const accessToken= JSON.parse(localStorage.getItem("data")).access_token;
    dispatch({type: INTERVIEWER_REQUERST});
       
        try {

          let data = '';

              let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${hostName}/interview/interviewers`,
                headers: { 
                  'Content-Type': 'application/json', 
                  'Authorization': `Bearer ${accessToken}`
                },
                data : data
              };
              axios.request(config)
              .then((response) => {
                console.log("haha");
                dispatch({type: INTERVIEWER_SUCCESS,payload : response.data.data});
                console.log("in the logi func try",response.data.data);
              })
              .catch((error) => {
                console.log(error);
              });
         
           
      
        } catch (error) {
            // console.log("in the logi func catch");
            console.log("sai roi ");
            dispatch({type: INTERVIEWER_ERROR,payload : error.message});
        }
}