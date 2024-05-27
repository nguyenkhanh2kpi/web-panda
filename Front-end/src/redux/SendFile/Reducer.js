import {
    SENDFILE_REQUERST,
    SENDFILE_SUCCESS,
    SENDFILE_ERROR

} from './ActionType'

const initialState = {
    requesting: false,
    status:null,
    message:null,
    data:[]
  };

  
export const FileReducer=(state=initialState,action)=>{
    const {type,payload} = action;
    switch(type){
        case  SENDFILE_REQUERST:
            return  {...state , requesting : true};
        case  SENDFILE_SUCCESS:
            return {...state , requesting : false , data : payload};
        case   SENDFILE_ERROR:
            return {...state , requesting : false};
        default : return state;
    }
  }