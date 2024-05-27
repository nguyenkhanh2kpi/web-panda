import {
    JOB_REQUERST,
    JOB_SUCCESS,
    JOB_ERROR
} from './ActionType'

const initialState = {
    requesting: false,
    status:null,
    message:null,
    data:[]
  };

  
export const JobReducer=(state=initialState,action)=>{
    const {type,payload} = action;
    switch(type){
        case JOB_REQUERST:
            return  {...state , requesting : true};
        case JOB_SUCCESS:
            return {...state , requesting : false , data : payload};
        case JOB_ERROR:
            return {...state , requesting : false};
        default : return state;
    }
  }