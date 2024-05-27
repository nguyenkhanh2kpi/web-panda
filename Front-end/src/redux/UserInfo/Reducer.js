import {
    USER_INFO_REQUERST,
    USER_INFO_SUCCESS,
    USER_INFO_ERROR
} from './ActionType'

const initialState = {
    requesting: false,
    status:null,
    message:null,
    data:[],
    error:false
  };

  
export const UserInfoReducer=(state=initialState,action)=>{
    const {type,payload} = action;
    switch(type){
        case USER_INFO_REQUERST:
            return  {...state , requesting : true};
        case USER_INFO_SUCCESS:
            return {...state , requesting : false ,error : false, data : payload};
        case USER_INFO_ERROR:
            return {...state , error : true ,requesting : false};
        default : return state;
    }
  }