import {
    USER_MANAGE_REQUERST,
    USER_MANAGE_SUCCESS,
    USER_MANAGE_ERROR
} from './ActionType'

const initialState = {
    requesting: false,
    status:null,
    message:null,
    data:[],
    error:false
  };

  
export const UserManageReducer=(state=initialState,action)=>{
    const {type,payload} = action;
    switch(type){
        case USER_MANAGE_REQUERST:
            return  {...state , requesting : true};
        case USER_MANAGE_SUCCESS:
            return {...state , requesting : false ,error : false, data : payload};
        case USER_MANAGE_ERROR:
            return {...state , error : true ,requesting : false};
        default : return state;
    }
  }