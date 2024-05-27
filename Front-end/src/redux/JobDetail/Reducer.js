import {
    JOB_DETAIL_REQUERST,
    JOB_DETAIL_SUCCESS,
    JOB_DETAIL_ERROR
} from './ActionType'

const initialState = {
    requesting: false,
    status:null,
    message:null,
    data:[],
    error:false
  };

  
export const JobDetailReducer=(state=initialState,action)=>{
    const {type,payload} = action;
    switch(type){
        case JOB_DETAIL_REQUERST:
            return  {...state , requesting : true};
        case JOB_DETAIL_SUCCESS:
            return {...state , requesting : false ,error : false, data : payload};
        case JOB_DETAIL_ERROR:
            return {...state , error : true ,requesting : false};
        default : return state;
    }
  }