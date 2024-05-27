import {
    ROOM_REQUERST,
    ROOM_SUCCESS,
    ROOM_ERROR,


    ROOM_IDJOB_REQUERST,
    ROOM_IDJOB_SUCCESS,
    ROOM_IDJOB_ERROR
} from './ActionType'

const initialState = {
    requesting: false,
    status:null,
    message:null,
    data:[]
  };

  
export const RoomReducer=(state=initialState,action)=>{
    const {type,payload} = action;
    switch(type){
        case ROOM_REQUERST:
            return  {...state , requesting : true};
        case ROOM_SUCCESS:
            return {...state , requesting : false , data : payload};
        case ROOM_ERROR:
            return {...state , requesting : false};
        default : return state;
    }
  }



  export const RoomIdJobReducer=(state=initialState,action)=>{
    const {type,payload} = action;
    switch(type){
        case ROOM_IDJOB_REQUERST:
            return  {...state , requesting : true};
        case ROOM_IDJOB_SUCCESS:
            return {...state , requesting : false , data : payload};
        case ROOM_IDJOB_ERROR:
            return {...state , requesting : false};
        default : return state;
    }
  }