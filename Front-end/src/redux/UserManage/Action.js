import { hostName } from '../../global';
import {
    USER_MANAGE_REQUERST,
    USER_MANAGE_SUCCESS,
    USER_MANAGE_ERROR
} from './ActionType';
import axios from "axios";


export const loadUserManage=(id)=>async (dispatch)=>{

    const accessToken= JSON.parse(localStorage.getItem("data")).access_token;
    dispatch({type:USER_MANAGE_REQUERST});
       
        try {
            let data = '';

            let config = {
              method: 'get',
              maxBodyLength: Infinity,
              url: `${hostName}/user`,
              headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${accessToken}`
              },
              data : data
            };
            axios.request(config)
            .then((response) => {
                dispatch({type: USER_MANAGE_SUCCESS,payload : response.data.data});
             
              })
              .catch((error) => {
                console.log(error);
              });
          
      
        } catch (error) {
            // console.log("in the logi func catch");
            dispatch({type:USER_MANAGE_ERROR,payload : error.message});
        }
}