import {
    SENDFILE_REQUERST,
    SENDFILE_SUCCESS,
    SENDFILE_ERROR,


} from './ActionType';
import axios from "axios";
import { hostName } from '../../global';

export const sendFile=(file)=>async (dispatch)=>{

    const accessToken= JSON.parse(localStorage.getItem("data")).access_token;
    dispatch({type:  SENDFILE_REQUERST});
       
        try {

              let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${hostName}/file/uploadw`,
                headers: { 
                  'Content-Type': 'application/json', 
                  'Authorization': `Bearer ${accessToken}`
                },
                data : file
              };
              axios.request(config)
              .then((response) => {
                dispatch({type:  SENDFILE_SUCCESS,payload : response.data.data});
              
              })
              .catch((error) => {
                console.log(error);
              });
         
           
      
        } catch (error) {
            // console.log("in the logi func catch");
            console.log("sai roi ");
            dispatch({type:   SENDFILE_ERROR,payload : error.message});
        }
}


