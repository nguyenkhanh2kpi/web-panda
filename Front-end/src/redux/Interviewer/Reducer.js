import {
    INTERVIEWER_REQUERST,
    INTERVIEWER_SUCCESS,
    INTERVIEWER_ERROR
} from './ActionType'

const initialState = {
    requesting: false,
    status:null,
    message:null,
    data:[]
  };

  
export const InterviewerReducer=(state=initialState,action)=>{
    const {type,payload} = action;
    switch(type){
        case INTERVIEWER_REQUERST:
            return  {...state , requesting : true};
        case INTERVIEWER_SUCCESS:
            return {...state , requesting : false , data : payload};
        case INTERVIEWER_ERROR:
            return {...state , requesting : false};
        default : return state;
    }
  }